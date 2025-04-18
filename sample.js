// const aws = require('aws-sdk');
// const crypto = require('crypto');

// function getPresignedUrl({
//   accessKeyId,
//   secretAccessKey,
//   sessionToken, // optional
//   region = 'ap-northeast-2',
//   endpoint = 'ac9hu6rgxhrxm-ats.iot.ap-northeast-2.amazonaws.com',
//   expires = 15 // in minutes
// }) {
//   const now = new Date();
//   const amzdate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
//   const datestamp = amzdate.slice(0, 8);

//   const service = 'iotdevicegateway';
//   const algorithm = 'AWS4-HMAC-SHA256';
//   const method = 'GET';
//   const protocol = 'wss';
//   const canonicalUri = '/mqtt';
//   const host = endpoint;

//   const credentialScope = `${datestamp}/${region}/${service}/aws4_request`;
//   const credential = `${accessKeyId}/${credentialScope}`;
  
//   const queryParams = {
//     'X-Amz-Algorithm': algorithm,
//     'X-Amz-Credential': encodeURIComponent(credential),
//     'X-Amz-Date': amzdate,
//     'X-Amz-SignedHeaders': 'host',
//     'X-Amz-Expires': (expires * 60).toString()
//   };
//   if (sessionToken) {
//     queryParams['X-Amz-Security-Token'] = encodeURIComponent(sessionToken);
//   }

//   const canonicalQuerystring = Object.entries(queryParams)
//     .map(([k, v]) => `${k}=${v}`)
//     .sort()
//     .join('&');

//   const canonicalHeaders = `host:${host}\n`;
//   const signedHeaders = 'host';
//   const payloadHash = crypto.createHash('sha256').update('').digest('hex');

//   const canonicalRequest = [
//     method,
//     canonicalUri,
//     canonicalQuerystring,
//     canonicalHeaders,
//     signedHeaders,
//     payloadHash
//   ].join('\n');

//   const stringToSign = [
//     algorithm,
//     amzdate,
//     credentialScope,
//     crypto.createHash('sha256').update(canonicalRequest).digest('hex')
//   ].join('\n');

//   const kDate = hmac(`AWS4${secretAccessKey}`, datestamp);
//   const kRegion = hmac(kDate, region);
//   const kService = hmac(kRegion, service);
//   const kSigning = hmac(kService, 'aws4_request');
//   const signature = hmac(kSigning, stringToSign, 'hex');

//   const finalQuery = `${canonicalQuerystring}&X-Amz-Signature=${signature}`;
//   const url = `${protocol}://${host}${canonicalUri}?${finalQuery}`;

//   return url;
// }

// function hmac(key, str, encoding) {
//   return crypto.createHmac('sha256', key).update(str).digest(encoding);
// }

// // 테스트용 실행
// const url = getPresignedUrl({
//   accessKeyId: 'AKIAXXXXXXXX',
//   secretAccessKey: 'abc/abc+xyz...secret',
//   region: 'ap-northeast-2',
//   endpoint: 'ac9hu6rgxhrxm-ats.iot.ap-northeast-2.amazonaws.com'
// });

// console.log('✅ 프리사인드 URL:', url);













//


// const { sigV4ASignBasic } = require('./sigv4a_sign')
// const https = require('https');

// var method = 'GET';
// var endpoint = 'https://<MRAP_alias>.accesspoint.s3-global.amazonaws.com/<s3-object-key>';
// var service = 's3';

// // function from ./sigv4a_sign.js
// var headers = sigV4ASignBasic(method, endpoint, service);

// const options = {
//     hostname: headers.get('host'),
//     path: new URL(endpoint).pathname,
//     method: 'GET',
//     headers: headers._flatten()
// }

// const req = https.request(options, res => {
//     res.on('data', d => {
//         process.stdout.write(d);
//     })
// }).on('error', error => {
//     console.error(error)
// }).end()


//

// import { SignatureV4 } from '@aws-sdk/signature-v4';
// import { Sha256 } from '@aws-crypto/sha256-js';
// import { HttpRequest } from '@aws-sdk/protocol-http';

// const region = process.env.AWS_REGION!;
// const endpoint = process.env.AWS_IOT_ENDPOINT!;

// export async function getSignedMqttUrl(): Promise<string> {
//   const signer = new SignatureV4({
//     service: 'iotdevicegateway',
//     region,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//     },
//     sha256: Sha256,
//   });

//   const request = new HttpRequest({
//     protocol: 'wss:',
//     hostname: endpoint,
//     method: 'GET',
//     path: '/mqtt',
//     headers: {
//       host: endpoint,
//     },
//   });

//   const signed = await signer.presign(request, {
//     expiresIn: 60 * 10,
//   });

//   return signed.href;
// }
