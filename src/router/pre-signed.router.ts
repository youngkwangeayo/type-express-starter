import { NextFunction, Request, Response, Router } from "express";
import logger from "../config/logger.config";
import { preSignedService } from "../service/pre-signed.service";

const preSignedRouter = Router();
// constroller



preSignedRouter.get('/mqtt', async(req : Request, res : Response, next : NextFunction)=>{
  
    const test = await preSignedService.getMqttUrl();
    res.send({test:test});
    // logger.debug(req,res,next)
});

export default preSignedRouter;