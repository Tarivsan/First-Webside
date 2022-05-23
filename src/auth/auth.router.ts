import { Router } from "express";
import { register, login, reqResetPassword, resetPassword } from "./auth.controller";


export function createAuthRouter() {
  const router = Router();

  router.post('/register', register);
  router.post('/login', login);

  router.post('/request-reset-password', reqResetPassword);
  router.post('/reset-password', resetPassword);


  return router;
}
