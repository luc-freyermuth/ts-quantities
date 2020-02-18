import { UNITY_ARRAY } from './definitions';
import { unitSignature } from './signature';
import QtyError from './error';
import { compareArray, isNumber, isString } from './utils';

import * as comparators from './comparators';
import * as conversion from './conversion';
import * as temperature from './temperature';
import * as predicates from './predicates';
import * as operators from './operators';
import * as format from './format';
import * as kind from './kind';
import * as definitions from './definitions';
import * as parse from './parse';
import * as utils from './utils';
import { RegularObject } from './types';

/**
 * Tests if a value is a Qty instance
 *
 * @param {*} value - Value to test
 *
 * @returns {boolean} true if value is a Qty instance, false otherwise
 */
export function isQty(value) {
    return value instanceof Qty;
}

export class Qty {
    readonly numerator: string[] = UNITY_ARRAY;
    readonly denominator: string[] = UNITY_ARRAY;
    readonly scalar: number;
    readonly baseScalar: number;
    readonly initValue: string;

    protected signature = null;
    protected _conversionCache: RegularObject<Qty> = {};
    protected _units: any;
    protected _isBase: boolean;

    constructor(initValue, initUnits?) {
        assertValidConstructorArgs.apply(null, arguments);

        if (!isQty(this)) {
            return new Qty(initValue, initUnits);
        }

        if (isDefinitionObject(initValue)) {
            this.scalar = initValue.scalar;
            this.numerator =
                initValue.numerator && initValue.numerator.length !== 0
                    ? initValue.numerator
                    : UNITY_ARRAY;
            this.denominator =
                initValue.denominator && initValue.denominator.length !== 0
                    ? initValue.denominator
                    : UNITY_ARRAY;
        } else if (initUnits) {
            parse.default.call(this, initUnits);
            this.scalar = initValue;
        } else {
            parse.default.call(this, initValue);
        }

        // math with temperatures is very limited
        if (this.denominator.join('*').indexOf('temp') >= 0) {
            throw new QtyError('Cannot divide with temperatures');
        }
        if (this.numerator.join('*').indexOf('temp') >= 0) {
            if (this.numerator.length > 1) {
                throw new QtyError('Cannot multiply by temperatures');
            }
            if (!compareArray(this.denominator, UNITY_ARRAY)) {
                throw new QtyError('Cannot divide with temperatures');
            }
        }

        this.initValue = initValue;
        updateBaseScalar.call(this);

        if (this.isTemperature() && this.baseScalar < 0) {
            throw new QtyError(
                'Temperatures must not be less than absolute zero'
            );
        }
    }

    // Member functions declared in other files

    eq = comparators.eq;
    lt = comparators.lt;
    lte = comparators.lte;
    gt = comparators.gt;
    gte = comparators.gte;
    compareTo = comparators.compareTo;
    same = comparators.same;

    to = conversion.to;
    toBase = conversion.toBase;
    toFloat = conversion.toFloat;
    toPrec = conversion.toPrec;
    convertSingleUnit = conversion.convertSingleUnit;

    isDegrees = temperature.isDegrees;
    isTemperature = temperature.isTemperature;

    isUnitless = predicates.isUnitless;
    isBase = predicates.isBase;
    isInverse = predicates.isInverse;
    isCompatible = predicates.isCompatible;

    add = operators.add;
    sub = operators.sub;
    mul = operators.mul;
    div = operators.div;
    inverse = operators.inverse;

    units = format.getUnits;
    toString = format.toString;
    format = format.format;

    kind = kind.kind;

    // Global API as static functions

    static version: string;
    static getKinds = kind.getKinds;
    static getAliases = definitions.getAliases;
    static getUnits = definitions.getUnits;
    static parse = parse.globalParse;
    static mulSafe = utils.mulSafe;
    static divSafe = utils.divSafe;
    static swiftConverter = conversion.swiftConverter;
    static Error = QtyError;
    static formatter = format.defaultFormatter;
}

/**
 * Asserts constructor arguments are valid
 *
 * @param {*} value - Value to test
 * @param {string} [units] - Optional units when value is passed as a number
 *
 * @returns {void}
 * @throws {QtyError} if constructor arguments are invalid
 */
function assertValidConstructorArgs(value, units) {
    if (units) {
        if (!(isNumber(value) && isString(units))) {
            throw new QtyError(
                'Only number accepted as initialization value ' +
                    'when units are explicitly provided'
            );
        }
    } else {
        if (
            !(
                isString(value) ||
                isNumber(value) ||
                isQty(value) ||
                isDefinitionObject(value)
            )
        ) {
            throw new QtyError(
                'Only string, number or quantity accepted as ' +
                    'single initialization value'
            );
        }
    }
}

/**
 * Tests if a value is a Qty definition object
 *
 * @param {*} value - Value to test
 *
 * @returns {boolean} true if value is a definition object, false otherwise
 */
function isDefinitionObject(value) {
    return value && typeof value === 'object' && value.hasOwnProperty('scalar');
}

function updateBaseScalar() {
    if (this.baseScalar) {
        return this.baseScalar;
    }
    if (this.isBase()) {
        this.baseScalar = this.scalar;
        this.signature = unitSignature.call(this);
    } else {
        const base = this.toBase();
        this.baseScalar = base.scalar;
        this.signature = base.signature;
    }
}
