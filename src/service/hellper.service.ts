
import { APIError, APIResopnse } from "../model/apiresponse.model";



async function getTestProcess(): Promise<object> {

    let obj = await process1();
    obj = process2();


    return obj;
};



async function process1(): Promise<object> {

    const age: number = 27;


    const tmp: {
        age: number;
        name: string;
        특기: string[];
    } = {
        age: age,
        name: "good",
        특기: ["코딩", "축구", "사업"]
    };



    return tmp;
};

function process2(): object {

    interface TmpType {
        age: number;
        name: string;
        특기: string[];
    };

    const age: number = 27;

    const tmp: TmpType = {
        age: age,
        name: "good",
        특기: ["코딩", "축구", "사업"]
    };

    return tmp;
};



export const hellperService = { getTestProcess };