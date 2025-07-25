
export interface IAPIResopnse {
    code: number;
    state: number;
    payLoad: any;
};

export class APIResopnse implements IAPIResopnse {
    
    code: number = 0;
    state: number = 200;
    payLoad: any;

    constructor( payLoad : any ) {
        this.payLoad = payLoad;
    };
};

export interface IAPIErrorREsopnse {
    code : number;
    state : number;
    message : string | null;
    reason : string | null;

};



export class APIError extends Error implements IAPIErrorREsopnse{

    code : number = -1;
    state : number;
    message : string;
    reason : string;

    constructor( code : number, state : number, message : string, reason : string ){
        super();
        this.code = code;
        this.state = state;
        this.message = message ?? '';
        this.reason = reason ?? '';
    };
};


// export class APIError extends Error implements IAPIErrorREsopnse  {

//     code : number = -1;
//     state : number;
//     message: string;
//     reason : string;
//     constructor( code : number, state : number, message : string, reason : string ){
//         super(message ?? '');

//         this.code = code;
//         this.state = state;
//         this.message = message ?? 'error';
//         this.reason = reason ?? '';

        
//     };
// };