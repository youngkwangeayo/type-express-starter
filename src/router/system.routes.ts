
import { log } from "console";
import { NextFunction, Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";

const systemRouter = Router();


systemRouter.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = uuidv4();
  res.locals.requestId = requestId;

  const startTime = Date.now();

  log(`[INFO] [${requestId}] ${req.headers['x-forwarded-for'] || req.ip} : ${req.headers['user-agent']} -- ${req.method.toUpperCase()} / ${req.hostname + req.url} / ${JSON.stringify(req.body)}`);

  // 원본 res.json과 res.send 메서드 저장
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = function (data) {
    res.locals.responseBody = data;
    return originalJson(data);
  };

  // res.send 오버라이드
  res.send = function (data) {
    res.locals.responseBody = data;
    return originalSend(data);
  };

  res.on('finish', () => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);


    let responseBody = res.locals.responseBody;
    
    if (responseBody && typeof res.locals.responseBody === "object") {
      responseBody = res.locals.responseBody
        ? JSON.stringify(res.locals.responseBody).substring(0, 1000) // 최대 1000자까지만
        : 'N/A';
    };

    // log(`[DEBUG] [${requestId}] Response completed -`, req.method, req.url, "Status:", res.statusCode, `Duration: ${duration}ms`);
    log(`[INFO] [${requestId}] Status : ${res.statusCode}  / Duration : ${duration}s ${responseBody}`);
  });

  next();
});


systemRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send();
});

systemRouter.head('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send();
});

systemRouter.get('/healthz', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send();
});

systemRouter.get('/ping', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("PONG");
});



export default systemRouter;