import { BOT_API_URLS, BotApiUrls } from '../constants/apiUrls';
import NodeCache from 'node-cache';
import { updateFormatOfEventDate } from '../utils';

const cache = new NodeCache({ stdTTL: 3600 });

export const fetchEventsFromApi = async (source: keyof BotApiUrls) => {
  const cacheKey = `events_${source}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData; 
  }

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${BOT_API_URLS[source].API_KEY}`,
    },
  };

  try {
    const res = await fetch(
      `${BOT_API_URLS[source].URL}/${BOT_API_URLS[source].MAIN_PAGE_SCRAPER_ID}/tasks/${BOT_API_URLS[source].MAIN_PAGE_SCRAPER_TASK_KEY}`,
      options
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    const currentDate = new Date();

    const filteredAndSortedEvents = data.result.capturedLists.Events
      .map((event: any) => {
        const formattedEventDate = updateFormatOfEventDate(event.eventDate);
        return { ...event, eventDate: formattedEventDate };
      })
      .filter((event: any) => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= currentDate;
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(a.eventDate);
        const dateB = new Date(b.eventDate);
        return dateA.getTime() - dateB.getTime();
      });

    cache.set(cacheKey, filteredAndSortedEvents);

    return filteredAndSortedEvents;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error fetching data';
  }
};
