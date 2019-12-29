export class ValidationError extends Error {
    constructor (message, invalidGivenValue, ...params) {
        super(message, ...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }

        this.name = 'ValidationError';
        this.invalidGivenValue = invalidGivenValue;
        this.contextData = `${message} (Got "${invalidGivenValue}"" [${typeof invalidGivenValue}])`;
        this.date = new Date();
    }
}
