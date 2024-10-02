export class ApiError extends Error {
    success:boolean;
    constructor (
        public statusCode: number,
        public message: string = 'Somthing went wrong...',
        public error: any = [],
        stack: string = ''
    ){
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}