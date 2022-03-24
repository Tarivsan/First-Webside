import { Model } from "mongoose";
import { Typegoose } from "@hasezoey/typegoose";

const models: { [key: string]: Model<any> } = {};

export const getModel = (schema: Typegoose, collection: string): Model<any> => {
  if (!models[collection]) {
    models[collection] = schema.getModelForClass(schema, {
      schemaOptions: { collection },
    });
  }

  return models[collection];
};
