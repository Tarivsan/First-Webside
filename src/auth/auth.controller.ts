import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  authenticate,
  sendEmailToResetPassword,
  resetPasswordValues,
} from "./auth.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await registerUser(req.body);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const result = await authenticate(email, password);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

export const reqResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;

    try {
      await sendEmailToResetPassword(email);
      return res.status(200).json({ status: "Email has been send" });
    } catch (err) {}
    return res.status(200).send({ status: "Email has been send" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code, newPassword } = req.body;

    await resetPasswordValues(email, code, newPassword);

    return res.status(200).send({ status: "success" });
  } catch (err) {
    next(err);
  }
};
