import { prop, Typegoose } from "@hasezoey/typegoose";
import { getModel } from "../core/getModel";

export class NewsSchema extends Typegoose {
  @prop({ unique: true, required: true })
  title: string;

  @prop()
  description?: string;

  @prop()
  createdAt: Date;
}

export const QuizModel = getModel(new NewsSchema(), "News");
