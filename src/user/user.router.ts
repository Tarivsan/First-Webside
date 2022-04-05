import { Router } from "express";
import { getUserById } from "./user.controller";

export function createUserRouter() {
  const router = Router();

  router.get("/:id", getUserById);

  return router;
}
