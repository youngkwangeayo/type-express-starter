import { SignatureV4, SignatureV4CryptoInit } from "@smithy/signature-v4";
import { HttpRequest } from '@smithy/protocol-http'
import logger from "../config/logger.config";

import { defaultProvider } from '@aws-sdk/credential-provider-node';
// AwsCredentialIdentity
import { Sha256 } from '@aws-crypto/sha256-js';
import { debug } from "console";
import { APIResopnse } from "../model/apiresponse.model";

async function getMqttUrl() {
    
    const path = await createSignatureV4Url();

    const apiresponse : APIResopnse<any> = {
        code : 0,
        state : 200,
        payLoad : {SignedUrl :  path}
    };
    return apiresponse;
};


async function createSignatureV4Url() {

    const request = new HttpRequest({
        method: "GET",
        protocol: "wss:",
        path: "/mqtt",
        hostname: "ac9hu6rgxhrxm-ats.iot.ap-northeast-2.amazonaws.com", //endpoint
        
        query: {
            "X-Amz-Date": new Date().toISOString(),
        },
        headers:  { host: "ac9hu6rgxhrxm-ats.iot.ap-northeast-2.amazonaws.com", }
    })

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
    
    logger.debug(signedFullURL);
    debug(signedFullURL);
    return signedFullURL;
};

export const preSignedService = { getMqttUrl };