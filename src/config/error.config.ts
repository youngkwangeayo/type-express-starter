
import { NextFunction, Request, Response, Router } from "express"
import logger from "./logger.config";
import { APIError, IAPIErrorREsopnse } from "../model/apiresponse.model";
import { log } from "console";


const errorHandler = (error: IAPIErrorREsopnse | any, req: Request, res: Response, next: NextFunction) => {

    log(`[DEBUG] [${res.locals.requestId}] ${JSON.stringify(error.stack)}`);

    if (error instanceof APIError) {
        res.status(error.state).send({ error: error });
        return;
    };


    const consistencyError: IAPIErrorREsopnse = {
        code: 0,
        state: 500,
        message: error.message as string | "Internal Server Error",
        reason: "test good"
    };

    res.status(consistencyError.state).send({ error: consistencyError });

};

export default errorHandler;