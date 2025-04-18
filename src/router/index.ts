import { Router } from "express";
import preSignedRouter from "./pre-signed.router";


const router = Router();

router.use('/pres-signed', preSignedRouter);
// AWS Signature Version 4(SigV4)


export default router;