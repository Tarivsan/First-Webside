import { prop, Typegoose } from "@hasezoey/typegoose";
import { getModel } from "../core/getModel";

export class QuizSchema extends Typegoose {
  @prop({ unique: true, required: true })
  title: string;

  @prop({ required: true, default: 0 })
  vote: number;
}

export const QuizModel = getModel(new QuizSchema(), "Quiz");
