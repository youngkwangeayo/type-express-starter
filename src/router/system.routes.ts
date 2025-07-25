
import { log } from "console";
import { NextFunction, Request, Response, Router } from "express";

// constroller

// const helperRouter = Router();
const systemRouter = Router();


systemRouter.use( (req :Request, res: Response, next : NextFunction)=>{
  log(" [DEBUG] ", req.method ,req.host,req.url,  "IP : ",req.ip);
  next();
});

// systemRouter.get('/', (req :Request, res: Response, next : NextFunction)=>{
//        res.status(200).send();
// });

systemRouter.head('/',(req :Request, res: Response, next : NextFunction)=>{
    res.status(200).send();
});

systemRouter.get('/healthz',(req :Request, res: Response, next : NextFunction)=>{
    res.status(200).send();
});

systemRouter.get('/ping', (req :Request, res: Response, next : NextFunction)=>{
  res.status(200).send("PONG");
});



export default systemRouter;