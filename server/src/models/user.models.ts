import { prop, getModelForClass } from "@typegoose/typegoose";

export class Users {
  @prop()
  first_name: string;

  @prop() 
  last_name: string;

  @prop() 
  email: string;

  @prop() 
  password: string;

  @prop({ default: false })
  isActive: boolean;

  // different user types (user, seller, super_admin)
  @prop({ default: 'user' }) // Default to 'user' role
  role: string;
}

export const UsersModel = getModelForClass(Users);
