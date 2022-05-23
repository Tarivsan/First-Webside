import { Request, Response, NextFunction } from "express";
import { getOneById } from "./user.service";
import { getOneByEmail, updateAcc, removeU, serviceOfList } from "./user.service";
import { StatusError } from "../core/error.handler";



export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = (req as any).user;
    if (user.role !== "admin") {
      throw new StatusError(403, "FORBIDDEN");
    }
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
    const user = (req as any).user;
    if (user.role !== "admin") {
      throw new StatusError(403, "FORBIDDEN");
    }
    const { mail } = req.params
    console.log(`getUserByEmail ${mail}`)
    const result = await getOneByEmail(mail);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}


export async function listOfUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = (req as any).user;
    if (user.role !== "admin") {
      throw new StatusError(403, "FORBIDDEN");
    }
    const result = await serviceOfList();

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}


export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (user.role !== "admin") {
      throw new StatusError(403, "FORBIDDEN");
    }
    const { id } = req.params;

    const result = await removeU({ _id: id });

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (user.role !== "admin") {
      throw new StatusError(403, "FORBIDDEN");
    }

    const { id } = req.params;

    const result = await updateAcc({ _id: id }, req.body);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};