import { NextFunction, Request, Response, Router } from "express";
import logger from "../config/logger.config";
import { testService } from "../service/test.service";

const testRouter = Router();
// constroller



testRouter.get('/one', async(req : Request, res : Response, next : NextFunction)=>{
  
    const result = await testService.getTestOneProess();
    res.send(result);
    // logger.debug(req,res,next)
});

export default testRouter;