import { prop, Typegoose } from "@hasezoey/typegoose";
import { getModel } from "../core/getModel";

export class NewsSchema extends Typegoose {
  @prop({ unique: true, required: true })
  title: string;

  @prop({ required: true, default: "" })
  description: string;

  @prop()
  createdAt: Date;
}

export const NewsModel = getModel(new NewsSchema(), "News");
