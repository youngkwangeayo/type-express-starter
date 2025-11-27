import { Request, Response, Router } from "express";
import logger from "../config/logger.config";
import redis from "../config/redis.config";
import helperRouter from "./helper.router";
import testRouter from "./test.router";


const router = Router();

router.use("/helper", helperRouter);
router.use("/test", testRouter);

export default router;