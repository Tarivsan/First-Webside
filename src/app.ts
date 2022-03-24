import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { createQuizRouter } from "./quiz/quiz.router";
import { ErrorHandler } from "./core/error.handler";

export const createExpressApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/quiz", createQuizRouter());
  //   app.use('/news', createNewsRouter());

  app.use(ErrorHandler);

  return app;
};
