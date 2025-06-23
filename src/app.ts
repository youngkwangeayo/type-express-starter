import express, { Request } from 'express';
import dotenv from 'dotenv';
import logger from './config/logger.config';
import router from './router';
import errorHandler from './config/error.config';
import redis from './config/redis.config';
import cors from 'cors';
import { log } from 'console';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// cors
// cors
app.use(cors());


app.use(express.urlencoded({ limit: "300mb", extended: false }));
app.use(express.json({ limit: "300mb" }));
// app.use('/vol', express.static(process.env.storagePath));

app.use( (req,_,next)=>{
  // log(" [DEBUG] ", "origin: ",req.originalUrl, "pass : ",req.host,req.url,  "IP : ",req.ip);
  log(" [DEBUG] ", req.method ,req.host,req.url,  "IP : ",req.ip);
  next();
})

app.use('/ping', (_,res,_n)=>{
  res.send('pong');
});

app.head('/',(req : Request,res,next)=>{
    logger.debug(req.headers['user-agent']);
    res.send();
})

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
  redis.connect();
  logger.debug(`Server is running on http://localhost:${PORT}`);
});
