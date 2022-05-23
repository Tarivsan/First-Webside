import { authorize } from "../auth/_helpers/auth.middleware";
import { Router } from "express";
import { listNews, createNews, deleteNews } from "./news.controller";

export function createNewsRouter() {
  const router = Router();

  router.post("/", authorize(), createNews);
  router.get("/", listNews);
  router.delete("/:id", authorize(), deleteNews );

  return router;
}
