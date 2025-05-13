import express from 'express';
import dotenv from 'dotenv';
import logger from './config/logger.config';
import router from './router';
import errorHandler from './config/error.config';
import redis from './config/redis.config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ limit: "300mb", extended: false }));
app.use(express.json({ limit: "300mb" }));
// app.use('/vol', express.static(process.env.storagePath));


app.use('/ping', (_,res,_n)=>{
  res.send('pong');
});

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
  redis.connect();
  logger.debug(`Server is running on http://localhost:${PORT}`);
});
