import { Router } from "express";
import { getUserById } from "./user.controller";
import { getUserByEmail } from "./user.controller";

export function createUserRouter() {
  const router = Router();

  router.get("/:id", getUserById);


  return router;
}

export function createUserRouterByEmail() {
  const router = Router();

  router.get("/:mail", getUserByEmail);


  return router;
}
