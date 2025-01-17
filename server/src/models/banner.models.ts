import { prop, getModelForClass } from "@typegoose/typegoose";

export class Banners {
  @prop()
  title: string; 

  @prop() 
  description: string;

  @prop() 
  img: string;
}

export const BannerModel = getModelForClass(Banners);
