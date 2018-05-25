import { Request, Response, NextFunction } from "express";

export const roots = (rootFiles: Array<string>) =>
    (request: Request, response: Response, next: NextFunction): void => {
        const rootFile = rootFiles.find((name) => request.originalUrl.includes(name));

        rootFile
            ? response.sendFile(`${process.cwd()}/web/${rootFile}`)
            : next();
    };
