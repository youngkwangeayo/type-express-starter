import { NextFunction, Request, Response, Router } from "express";
import logger from "../config/logger.config";
import { preSignedService } from "../service/pre-signed.service";
import redis from "../config/redis.config";

const preSignedRouter = Router();
// constroller


preSignedRouter.get('/mqtt', async(req : Request, res : Response, next : NextFunction)=>{
  
    const result = await preSignedService.getMqttUrl();
    res.send(result);
});

preSignedRouter.get('/test',(req, res, next)=>{

    // redis.get('testKEY_ONE');
    res.send("good");
})

export default preSignedRouter;