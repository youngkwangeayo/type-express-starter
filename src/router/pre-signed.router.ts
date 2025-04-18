import { NextFunction, Request, Response, Router } from "express";
import logger from "../config/logger/logger";

const preSignedRouter = Router();



preSignedRouter.get('/', async(req : Request, res : Response, next : NextFunction)=>{
    // console.log(req,res,next);
    // res.json({test: 'good'});
    res.send({test:'test'})
    // logger.debug(req,res,next)
});

export default preSignedRouter;