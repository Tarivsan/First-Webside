import { Request, Response, NextFunction } from "express";

export class StatusError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const ErrorHandler = (
  err: StatusError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.status).json({ Error: err.message });
};
