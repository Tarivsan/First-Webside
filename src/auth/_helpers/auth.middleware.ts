import { Request, Response, RequestHandler, NextFunction } from "express";
import { clone } from "ramda";

import { collectTokenFromHeader, validateToken } from "../auth.service";
// import StatusError from "../core/error.handler";

export function authorize(optional: boolean = false): RequestHandler {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = collectTokenFromHeader(req.headers);
      const user = await validateToken(token);

      // @ts-ignore
      req.user = clone(user);

      return next();
    } catch (err) {
      if (optional) {
        return next();
      }
      console.log(err);
    }
  };
}
