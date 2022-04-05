import { Request, Response, NextFunction } from "express";
import { registerUser, authenticate} from "./auth.service"

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

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const result = await authenticate(email, password);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

