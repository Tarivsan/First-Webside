import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { createQuizRouter } from "./quiz/quiz.router";
import { createUserRouter } from "./user/user.router"
import { createAuthRouter } from './auth/auth.router'
import { ErrorHandler } from "./core/error.handler";

export const createExpressApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/quiz", createQuizRouter());
  app.use('/user', createUserRouter());
  app.use('/auth', createAuthRouter());
  //   app.use('/news', createNewsRouter());

  app.use(ErrorHandler);

  return app;
};
