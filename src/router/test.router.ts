import { NextFunction, Request, Response, Router } from "express";
import { APIError, APIResopnse } from "../model/apiresponse.model";




const testRouter = Router();


testRouter.get('/ok', async(req :Request, res: Response, next : NextFunction)=>{
    const response = APIResopnse.build()
        .setMsg('GET request successful')
        .setPayLoad({
            query: req.query,
            params: req.params
        });

    res.status(200).json(response);
});

testRouter.get('/ok/:id', async(req :Request, res: Response, next : NextFunction)=>{
    const response = APIResopnse.build()
        .setMsg('GET request with path parameter successful')
        .setPayLoad({
            query: req.query,
            params: req.params
        });

    let f = req.query.basf as any;
    f.wze = 10;

    res.status(200).json(response);
});

testRouter.post("/ok", async (req :Request, res: Response, next : NextFunction)=>{
    const response = APIResopnse.build()
        .setMsg('POST request successful')
        .setPayLoad({
            query: req.query,
            params: req.params,
            body: req.body
        });

    res.status(200).json(response);
});

testRouter.post("/ok/:id", async (req :Request, res: Response, next : NextFunction)=>{
    const response = APIResopnse.build()
        .setMsg('POST request with path parameter successful')
        .setPayLoad({
            query: req.query,
            params: req.params,
            body: req.body
        });

    res.status(200).json(response);
});

testRouter.get('/error', async(req :Request, res: Response, next : NextFunction)=>{
    throw APIError.build()
        .setState(400)
        .setMessage('GET error request');
        
});

testRouter.get('/error/:id', async(req :Request, res: Response, next : NextFunction)=>{
    throw APIError.build().setState(404).setMessage('Resource not found');
});

testRouter.post("/error", async (req :Request, res: Response, next : NextFunction)=>{
    throw APIError.build()
        .setCode(-2)
        .setState(500)
        .setMessage('POST error request')
        .setReason('Internal server error occurred');
});

testRouter.post("/error/:id", async (req :Request, res: Response, next : NextFunction)=>{
    throw APIError.build()
        .setCode(-3)
        .setState(422)
        .setMessage('Unprocessable entity')
        .setReason(`Invalid data for resource ${req.params.id}`);
});



export default testRouter;