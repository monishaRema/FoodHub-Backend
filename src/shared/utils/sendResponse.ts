import { Response } from "express";

export type Meta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPage: number;
};

type ResponseType<T> = {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Meta;
};

export const sendResponse = <T>({
  res,
  statusCode,
  message,
  data,
  meta,
}: ResponseType<T>) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    ...(data !== undefined ? { data } : {}),
    ...(meta !== undefined ? { meta } : {}),
  });
};
