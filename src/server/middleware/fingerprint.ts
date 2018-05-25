import { Request, Response, NextFunction } from "express";

export interface Meta {
    version: string;
    author: string;
    name: string;
}

export const fingerprint = (meta: Meta) => (request: Request, response: Response, next: NextFunction): void => {
    response.setHeader("X-Version", meta.version);
    response.setHeader("X-App", meta.name);
    response.setHeader("X-Powered-By", meta.author);

    next();
};
