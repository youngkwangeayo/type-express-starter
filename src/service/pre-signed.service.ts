import { SignatureV4, SignatureV4CryptoInit } from "@smithy/signature-v4";
import { HttpRequest } from '@smithy/protocol-http'
import logger from "../config/logger.config";

import { defaultProvider } from '@aws-sdk/credential-provider-node';

import { Sha256 } from '@aws-crypto/sha256-js';
import { debug } from "console";
import { APIError, APIResopnse } from "../model/apiresponse.model";
import redis from "../config/redis.config";


const CACHE_MQTT_URL_KEY ='SignedMqttUrl';  // mqtt url reids key
const CACHE_MQTT_URL_EXPIRE_TIME = 3600;    // mqtt url reids exprie Time


async function getMqttUrl() : Promise<APIResopnse> {
    
    const cacheResult = await redis.exists( CACHE_MQTT_URL_KEY );

    let path : string | null;

    if (cacheResult == 0)  path = await createSignatureV4Url();
    else path =  await redis.get(CACHE_MQTT_URL_KEY);

    if ( path == null) throw new APIError(-1, 500, '','');

    const apiresponse = new APIResopnse( {SignedUrl :  path} );
    return apiresponse;
};



async function createSignatureV4Url() {

    const request = new HttpRequest({
        method: "GET",
        protocol: "wss:",
        path: "/mqtt",
        hostname: process.env.MQTT_ENDPOINT, //endpoint
        
        query: {
            "X-Amz-Date": new Date().toISOString(),
        },
        headers:  { host: process.env.MQTT_ENDPOINT as string, }
    });

    const signer = new SignatureV4({
        service: 'iotdevicegateway',
        region: 'ap-northeast-2',
        credentials: defaultProvider(),
        sha256: Sha256
    });
    const signed = await signer.presign(request);

    
    const queryParams = new URLSearchParams();
    for (const key in signed.query) {
        const value = signed.query[key];
        if (typeof value == 'string') queryParams.append(key, value);
    };

    
    const signedFullURL: string = `${signed.protocol}//${signed.hostname}${signed.path}?${queryParams.toString()}`;
    
    await redis.setExpireValue(CACHE_MQTT_URL_KEY, signedFullURL, CACHE_MQTT_URL_EXPIRE_TIME);

    logger.debug(signedFullURL);
    debug(signedFullURL);
    return signedFullURL;
};

export const preSignedService = { getMqttUrl };