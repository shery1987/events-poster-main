import { prop, getModelForClass } from "@typegoose/typegoose";

export class Subscriptions {
  @prop()
  name: string; 

  @prop() 
  phone: string;

  @prop() 
  email: string;

  @prop({ default: true })
  agreement: boolean;


}

export const SubscribeModel = getModelForClass(Subscriptions);
