import { Router } from "express";
import { listQuizes, createQuiz, vote, deleteQuiz,  } from "./quiz.controller";

export function createQuizRouter() {
  const router = Router();

  router.patch("/:id", vote);
  router.post("/", createQuiz);
  router.get("/", listQuizes);
  router.delete("/:id", deleteQuiz );

  return router;
}
