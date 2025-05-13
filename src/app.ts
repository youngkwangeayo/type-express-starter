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

app.get('/', (req, res) => {
  res.send('Hello, TypeScript + Express!');
});

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.debug(`Server is running on http://localhost:${PORT}`);
  redis.connect();
  // // logger.info("test");
  // // logger.debug("det")
  // redis.get('testKEY_ONE');
});
