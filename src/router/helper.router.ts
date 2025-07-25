
// const preSignedRouter = Router();

import { NextFunction, Request, Response, Router } from "express";
import { APIError, APIResopnse } from "../model/apiresponse.model";
import { hellperService } from "../service/hellper.service";

// constroller

// const helperRouter = Router();
const helperRouter = Router();

helperRouter.get('/', async(req :Request, res: Response, next : NextFunction)=>{
    // throw new APIError( 0 , 500, "테스트", "-4");

    const obj = await hellperService.getTestProcess();
    const result = new APIResopnse( obj );
    res.send( obj );
});

helperRouter.post('/test1', async(req :Request, res: Response, next : NextFunction)=>{
    console.log(req.body)
    const result = new APIResopnse( {test : req.body} );
    // throw new Error("에러");

    // throw new APIError( 0 , 400, "테스트", "-4");
    res.json( result );
});


export default helperRouter;

// preSignedRouter.get('/test',(req, res, next)=>{

//     // redis.get('testKEY_ONE');
//     res.send("good");
// })

// export default preSignedRouter;