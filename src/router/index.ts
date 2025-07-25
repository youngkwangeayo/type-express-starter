import { Request, Response, Router } from "express";
import logger from "../config/logger.config";
import redis from "../config/redis.config";
import helperRouter from "./helper.router";


const router = Router();

router.use("/helper", helperRouter);

export default router;