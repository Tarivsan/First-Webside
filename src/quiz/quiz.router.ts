import { authorize } from "../auth/_helpers/auth.middleware";
import { Router } from "express";
import { listQuizes, createQuiz, vote, deleteQuiz,  } from "./quiz.controller";

export function createQuizRouter() {
  const router = Router();

  router.patch("/:id", vote);
  router.post("/", authorize(), createQuiz);
  router.get("/", listQuizes);
  router.delete("/:id", authorize(), deleteQuiz );

  return router;
}
