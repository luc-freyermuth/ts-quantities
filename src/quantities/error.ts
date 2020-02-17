/**
 * Custom error type definition
 * @constructor
 */
export default class QtyError extends Error {
    constructor(error: string) {
        super();
        let err;
        if (!this) {
            err = Object.create(QtyError.prototype);
            QtyError.apply(err, error);
            return err;
        }
        err = Error.apply(this, error);
        this.name = 'QtyError';
        this.message = err.message;
        this.stack = err.stack;
    }
}

/*
 * Throws incompatible units error
 * @param {string} left - units
 * @param {string} right - units incompatible with first argument
 * @throws "Incompatible units" error
 */
export function throwIncompatibleUnits(left, right) {
    throw new QtyError('Incompatible units: ' + left + ' and ' + right);
}
