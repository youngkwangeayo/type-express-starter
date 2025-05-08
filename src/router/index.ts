import { Request, Response, Router } from "express";
import preSignedRouter from "./pre-signed.router";
import logger from "../config/logger.config";


const router = Router();

router.use('/pres-signed', preSignedRouter);


export default router;