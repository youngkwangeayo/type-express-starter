
export interface APIResopnse<T = any> {
    code : number;
    state : 200;
    payLoad : T;
}