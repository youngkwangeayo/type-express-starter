import { Request, Response, Router } from "express";
import preSignedRouter from "./pre-signed.router";
import logger from "../config/logger.config";
import redis from "../config/redis.config";


const router = Router();

router.use('/pres-signed', preSignedRouter);

export default router;