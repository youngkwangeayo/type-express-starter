

import { debug } from "console";
import { createClient, RedisClientType } from "redis";
import logger from "./logger.config";


// redis-cli 접속 로컬호스트 6379 

// set keyName "keyValue"
// get keyName

// LPUSH arrayKeyName "value1" "value2"     #왼쪽부터 삽입
// RPUSH arrayKeyName "value1" "value2"     #오른쪽부터 삽입
// LRANGE mylist 0 -1                       # 전체 리스트 조회
// LPOP mylist                              # 왼쪽 요소 제거 및 반환
// RPOP mylist                              # 오른쪽 요소 제거 및 반환

// EXPIRE mykey 30                      #저장 후 추후에 타임걸기
// TTL mykey

// SET mykey "some value" EX 3600       #한번에걸기

type ExtendRedisClient = RedisClientType & {
    setExpireValue : (key : any, value : any, exired : any)=> Promise<void>;
};

const redis = createClient({
    socket: {
      port: 6379,
      host: '127.0.0.1'
    },
}) as ExtendRedisClient;


redis.on("error", (error)=>{
    console.log("error",error);
    logger.debug('error');
});

redis.on("connect", ()=>{
    debug('connect');
    logger.debug('connect');
});

redis.setExpireValue = async ( key : any, value : any, exired : any)=>{

    await redis.set(key, value);
    await redis.expire(key, exired);
};


export default redis;