
export interface IAPIResopnse {
    code: number;
    state: number;
    msg: string;
    payLoad: any;
};

export class APIResopnse implements IAPIResopnse {

    code: number = 0;
    state: number = 200;
    msg: string = 'success';
    payLoad: any;

    constructor(payLoad?: any) {
        this.payLoad = payLoad;
    }

    static build(): APIResopnse {
        return new APIResopnse();
    }

    setMsg(value: string): this { this.msg = value; return this; }
    setCode(value: number): this { this.code = value; return this; }
    setState(value: number): this { this.state = value; return this; }
    setPayLoad(value: any): this { this.payLoad = value; return this; }
};

export interface IAPIErrorREsopnse {
    code : number;
    state : number;
    message : string | null;
    reason : string | null;

};



export class APIError extends Error implements IAPIErrorREsopnse{

    code : number = -1;
    state : number = 500;
    message : string = 'error';
    reason : string = '';
    private errorStack?: string;

    constructor(code?: number, state?: number, message?: string, reason?: string) {
        super(message ?? 'error');
        if (code !== undefined) this.code = code;
        if (state !== undefined) this.state = state;
        if (message !== undefined) this.message = message;
        if (reason !== undefined) this.reason = reason;
        
        this.errorStack = this.stack;
    }

    static build(): APIError {
        return new APIError();
    }

    setCode(value: number): this { this.code = value; return this; }
    setState(value: number): this { this.state = value; return this; }
    setMessage(value: string): this { this.message = value; return this; }
    setReason(value: string): this { this.reason = value; return this; }

    getStack(): string | undefined {
        return this.errorStack;
    }

    toJSON() {
        return {
            code: this.code,
            state: this.state,
            message: this.message,
            reason: this.reason
        };
    }
};


