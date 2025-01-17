import { Request, Response, NextFunction } from 'express';
import { EventModel } from '../models/event.models';
import { fetchEventsFromApi } from '../services/browserAiService';
import { serializeEvents } from '../utils/serializeEvents';
import { filterByEventPage } from '../utils';
import { BOT_API_URLS, BotApiUrls } from '../constants/apiUrls';

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allEvents = await EventModel.find().sort({ event_date: 1 });

    res.status(200).json(allEvents);
  } catch (error) {
    next(error);
  }
};

export const getDataFromBrowserAi = async (req?: Request, res?: Response, next?: NextFunction): Promise<void> => {
  try {
    const [ironitEvents, mishkanEvents, mevalimEvents] = await Promise.all([
      fetchEventsFromApi('ironit'),
      fetchEventsFromApi('mishkanAshdod'),
      fetchEventsFromApi('mevalim'),
    ]);

    const combinedEvents = [...ironitEvents, ...mishkanEvents, ...mevalimEvents];

    const serializedEventsCollection = serializeEvents(combinedEvents);

    for (const event of serializedEventsCollection) {
      const existingEvent = await EventModel.findOne({
        event_title: event.event_title,
        event_date: event.event_date,
        event_time: event.event_time,
      });

      if (!existingEvent) {
        const newEvent = new EventModel({
          event_title: event.event_title,
          event_date: event.event_date,
          event_time: event.event_time,
          event_page: event.event_page,
          location: event.location,
          event_type: event.event_type,
          approved: true,
        });

        try {
          await newEvent.save();
        } catch (saveError) {
          console.error('Error saving event:', saveError);
        }
      }
    }

    if (res) {
      res.status(200).json(serializedEventsCollection);
    }

  } catch (error) {
    if (next) {
      next(error);
    } else {
      console.error('Error in updating events:', error);
    }
  }
};


export const getSingleEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;

  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};


export const getAdditionalEventData = async (req: Request, res: Response, next: NextFunction) => {
  const { site_donor, event_page } = req.body;
  
  
  if (!site_donor || !(site_donor in BOT_API_URLS)) {
    return res.status(400).json({ message: "Invalid siteDonor" });
  }

  const donorKey = site_donor as keyof BotApiUrls;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BOT_API_URLS[donorKey].API_KEY}`,
    },
  };

  let allItems: any[] = [];
  let currentPage = 1;
  let hasMoreData = true;
  
  try {
    while (hasMoreData) {
      const response = await fetch(
        `${BOT_API_URLS[donorKey].URL}/${BOT_API_URLS[donorKey].ADDITIONAL_DATA_SCRAPER_ID}/tasks?page=${currentPage}&pageSize=10`,
        options
      );
      if (!response.ok) {
        return res.status(response.status).json({ message: `Error fetching data: ${response.status}` });
      }
      
      const data = await response.json();
      const items = data.result.robotTasks.items;
      allItems = allItems.concat(items);
      
      if (items.length < 10) {
        hasMoreData = false;
      } else {
        currentPage++;
      }
    }
    
    const filteredItems = filterByEventPage(allItems, event_page);
    
    return res.status(200).json({ data: filteredItems });
  } catch (error) {
    console.error("Error fetching additional event data:", error);
    return res.status(500).json({ message: "Error fetching additional event data", error: (error as Error).message });
  }
};


export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEventData: any = { ...req.body };

    // Проверка на наличие изображения в base64
    if (newEventData.event_image_blob) {
      // Здесь изображение уже в base64, так что дополнительной обработки не требуется
      console.log("Base64 image received:", newEventData.event_image_blob);
    }

    // Создаем и сохраняем событие
    const newEvent = new EventModel(newEventData);
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    
    if (error instanceof Error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error", details: "Unknown error" });
    }
  }
};



export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await EventModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};


export const approveEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      { approved: true },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event approved successfully', event: updatedEvent });
  } catch (error) {
    next(error);
  }
};


