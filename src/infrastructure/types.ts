import { NextFunction, Request, Response } from 'express';
import * as RT from 'fp-ts/ReaderTask';

export type Handler<R, A> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => RT.ReaderTask<R, A | void>;
