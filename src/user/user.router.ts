import { authorize } from "../auth/_helpers/auth.middleware";
import { Router } from "express";
import { getUserById } from "./user.controller";
import { getUserByEmail, removeUser, listOfUsers } from "./user.controller";


export function createUserRouter() {
  const router = Router();
  router.get("/list", authorize(), listOfUsers);
  router.get("/:id", authorize(), getUserById);
  router.delete("/:id", authorize(), removeUser);


  return router;
}

export function createUserRouterByEmail() {
  const router = Router();

  router.get("/:mail", authorize(), getUserByEmail);


  return router;
}
