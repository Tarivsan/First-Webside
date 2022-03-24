import { Router } from "express";
import { listQuizes, createQuiz, vote } from "./quiz.controller";

export function createQuizRouter() {
  const router = Router();

  router.patch("/:id", vote);
  router.post("/", createQuiz);
  router.get("/", listQuizes);

  return router;
}
