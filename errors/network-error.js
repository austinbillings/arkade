// network-error.js
export class NetworkError extends Error {
    constructor (statusCode, message, ...params) {
        super(message, ...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NetworkError);
        }

        this.name = 'NetworkError';
        this.statusCode = statusCode;
        this.contextData = `${message} (${statusCode})`;
        this.date = new Date();
    }
}
