
import { log } from "console";
import { NextFunction, Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";

const systemRouter = Router();


systemRouter.use( (req :Request, res: Response, next : NextFunction)=>{
  const requestId = uuidv4();
  res.locals.requestId = requestId;
  
  const startTime = Date.now();

  log(`[DEBUG] [${requestId}] `, req.method, req.host, req.url, "IP:", req.ip);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    log(`[DEBUG] [${requestId}] Response completed -`, req.method, req.url, "Status:", res.statusCode, `Duration: ${duration}ms`);
  });

  next();
});


systemRouter.get('/', (req :Request, res: Response, next : NextFunction)=>{
       res.status(200).send();
});

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