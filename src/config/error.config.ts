
import { NextFunction, Request, Response, Router } from "express"
import logger from "./logger.config";
import { IAPIErrorREsopnse } from "../model/apiresponse.model";


const errorHandler = (error : IAPIErrorREsopnse | any , req : Request, res : Response, next : NextFunction)=>{
    // logger.debug("@@@@@@@@@@@@@@@",error, res, req);
    
    res.status(error.state ?? 500).send(error);
};

export default errorHandler;