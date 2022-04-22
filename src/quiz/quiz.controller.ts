import { Request, Response, NextFunction } from "express";
import { list, create, incrementVotes, removeQuiz } from "./quiz.service";

export async function listQuizes(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await list();

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

export async function createQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title } = req.body;

    const result = await create(title);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

export async function vote(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await incrementVotes(id);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

export async function deleteQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await removeQuiz(id);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}