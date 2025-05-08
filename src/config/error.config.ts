
import { NextFunction, Request, Response, Router } from "express"
import logger from "./logger.config";


const errorHandler = (error : any, req : Request, res : Response, next : NextFunction)=>{
    logger.debug("ㅅ?");
    
    res.status(400).end();
};


export default errorHandler;