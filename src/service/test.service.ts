import logger from "../config/logger.config";
import { APIResopnse } from "../model/apiresponse.model";

async function getTestOneProess() {
    
    logger.debug('test service');

    const apiresponse : APIResopnse<any> = {
        code : 0,
        state : 200,
        payLoad : { test :  'good'}
    };
    return apiresponse;
};



export const testService = { getTestOneProess };