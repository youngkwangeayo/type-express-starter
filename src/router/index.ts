import { Request, Response, Router } from "express";
import testRouter from "./test.router";
import logger from "../config/logger.config";


const router = Router();

router.use('/test', testRouter);


export default router;