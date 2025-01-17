export interface Event {
    Position?: string | number;
    eventTitle: string;
    location: string;
    eventType: string;
    eventDate: string;
    eventTime: string;
    eventPage: string;
    [key: string]: any; // allow any additional field
  }
  
export interface SerializedEvent {
    event_title: string;
    location: string;
    event_type: string;
    event_date: string;
    event_time: string;
    event_page: string;
    [key: string]: string; //all fields will be strings
  }
  
export function serializeEvents(events: Event[]): SerializedEvent[] {
    return events.map(event => {
      return Object.keys(event).reduce((output: SerializedEvent, key: string) => {
        
        // remove redundant filed Position
        if (key !== 'Position') { 
          // rebuild CamelCase into snake_case
          const newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

          output[newKey] = String(event[key] || '');
        }
        return output;
      }, {} as SerializedEvent);
    });
  }