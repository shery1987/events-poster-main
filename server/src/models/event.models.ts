import { prop, getModelForClass } from '@typegoose/typegoose';

class events {
  @prop()
  event_date: string;

  @prop()
  event_time: string;

  @prop()
  event_title: string;

  @prop()
  event_description: string;

  @prop()
  event_type: string;

  @prop()
  location: string;

  @prop()
  event_price: number;

  @prop()
  event_page: string;

  @prop()
  phone: string;

  @prop()
  email: string;

  @prop()
  event_image_url: string; 

  @prop({ maxlength: 1000000 })
  event_image_blob: string;

  @prop({ default: false })
  approved: boolean;
 
}

export const EventModel = getModelForClass(events);
