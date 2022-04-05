import { prop, Typegoose } from "@hasezoey/typegoose";
import { getModel } from "../core/getModel";

export class UserSchema extends Typegoose {
  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true })
  password: string;
}

export const UserModel = getModel(new UserSchema(), "Users");
