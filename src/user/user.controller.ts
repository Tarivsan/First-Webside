import { Request, Response, NextFunction } from "express";
import { getOneById } from "./user.service";
import { getOneByEmail } from "./user.service";

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params
    console.log(id)
    const result = await getOneById(id);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

export async function getUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { mail } = req.params
    console.log(`getUserByEmail ${mail}`)
    const result = await getOneByEmail(mail);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}


