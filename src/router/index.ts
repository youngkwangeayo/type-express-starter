import { Request, Response, Router } from "express";
import preSignedRouter from "./pre-signed.router";
import logger from "../config/logger.config";
import redis from "../config/redis.config";
import helperRouter from "./helper.router";


const router = Router();

router.use('/pres-signed', preSignedRouter);
router.use("/helper", helperRouter);

export default router;