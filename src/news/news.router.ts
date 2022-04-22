import { Router } from "express";
import { listNews, createNews, deleteNews } from "./news.controller";

export function createNewsRouter() {
  const router = Router();

  router.post("/", createNews);
  router.get("/", listNews);
  router.delete("/:id", deleteNews );

  return router;
}
