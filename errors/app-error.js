export class AppError extends Error {
    constructor (message, contextData, ...params) {
        super(message, ...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }

        this.name = 'AppError';
        this.contextData = contextData;
        this.date = new Date();
    }
}
