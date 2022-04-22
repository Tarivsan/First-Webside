import { Request, Response, NextFunction } from "express";
import { list, create, removeNews } from "./news.service";

export async function listNews(
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

export async function createNews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, description } = req.body;

    const result = await create(title, description);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

export async function deleteNews(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);
      const result = await removeNews(id);
  
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }