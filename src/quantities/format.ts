import { Qty, isQty } from './constructor.js';
import { PREFIX_VALUES, OUTPUT_MAP, UNITY_ARRAY } from './definitions.js';
import { compareArray, isNumber, isString, round } from './utils.js';
import NestedMap from './nested-map.js';
import { Source } from './types.js';

export type Formatter = typeof defaultFormatter;

/**
 * Default formatter
 *
 * @param {number} scalar - scalar value
 * @param {string} units - units as string
 *
 * @returns {string} formatted result
 */
export function defaultFormatter(scalar: number, units: string): string {
    return (scalar + ' ' + units).trim();
}

// returns the 'unit' part of the Unit object without the scalar
export function getUnits(this: Qty): string {
    if (this._units !== undefined) {
        return this._units;
    }

    const numIsUnity = compareArray(this.numerator, UNITY_ARRAY);
    const denIsUnity = compareArray(this.denominator, UNITY_ARRAY);
    if (numIsUnity && denIsUnity) {
        this._units = '';
        return this._units;
    }

    const numUnits = stringifyUnits(this.numerator);
    const denUnits = stringifyUnits(this.denominator);
    this._units = numUnits + (denIsUnity ? '' : '/' + denUnits);
    return this._units;
}

/**
 * Stringifies the quantity
 * Deprecation notice: only units parameter is supported.
 *
 * @param {(number|string|Qty)} targetUnitsOrMaxDecimalsOrPrec -
 *                              target units if string,
 *                              max number of decimals if number,
 *                              passed to #toPrec before converting if Qty
 *
 * @param {number=} maxDecimals - Maximum number of decimals of
 *                                formatted output
 *
 * @returns {string} reparseable quantity as string
 */
export function toString(this: Qty, maxDecimals: number): string;
export function toString(this: Qty, precQty: Qty, maxDecimals: number): string;
export function toString(
    this: Qty,
    targetUnits: string,
    maxDecimals?: number
): string;
export function toString(
    this: Qty,
    targetUnitsOrMaxDecimalsOrPrec: Source,
    maxDecimals?: number
): string {
    let targetUnits;
    if (isNumber(targetUnitsOrMaxDecimalsOrPrec)) {
        targetUnits = this.units();
        maxDecimals = targetUnitsOrMaxDecimalsOrPrec;
    } else if (isString(targetUnitsOrMaxDecimalsOrPrec)) {
        targetUnits = targetUnitsOrMaxDecimalsOrPrec;
    } else if (isQty(targetUnitsOrMaxDecimalsOrPrec)) {
        return this.toPrec(targetUnitsOrMaxDecimalsOrPrec).toString(
            maxDecimals
        );
    }

    const outQty = this.to(targetUnits);
    let out: string;

    const outScalar =
        maxDecimals !== undefined
            ? round(outQty.scalar, maxDecimals)
            : outQty.scalar;
    out = (outScalar + ' ' + outQty.units()).trim();
    return out;
}

/**
 * Format the quantity according to optional passed target units
 * and formatter
 *
 * @param {string} [targetUnits=current units] -
 *                 optional units to convert to before formatting
 *
 * @param {function} [formatter=Qty.formatter] -
 *                   delegates formatting to formatter callback.
 *                   formatter is called back with two parameters (scalar, units)
 *                   and should return formatted result.
 *                   If unspecified, formatting is delegated to default formatter
 *                   set to Qty.formatter
 *
 * @example
 * var roundingAndLocalizingFormatter = function(scalar, units) {
 *   // localize or limit scalar to n max decimals for instance
 *   // return formatted result
 * };
 * var qty = Qty('1.1234 m');
 * qty.format(); // same units, default formatter => "1.234 m"
 * qty.format("cm"); // converted to "cm", default formatter => "123.45 cm"
 * qty.format(roundingAndLocalizingFormatter); // same units, custom formatter => "1,2 m"
 * qty.format("cm", roundingAndLocalizingFormatter); // convert to "cm", custom formatter => "123,4 cm"
 *
 * @returns {string} quantity as string
 */
export function format(
    this: Qty,
    targetUnits?: string,
    formatter?: Formatter
): string;
export function format(this: Qty, formatter?: Formatter): string;
export function format(
    this: Qty,
    targetUnitsOrFormatter?: string | Formatter,
    formatter?: Formatter
): string {
    if (typeof targetUnitsOrFormatter === 'function') {
        return this.format(undefined, targetUnitsOrFormatter);
    }

    formatter = formatter || Qty.formatter;
    const targetQty = this.to(targetUnitsOrFormatter);
    return formatter.call(this, targetQty.scalar, targetQty.units());
}

const stringifiedUnitsCache = new NestedMap();
/**
 * Returns a string representing a normalized unit array
 *
 * @param {string[]} units Normalized unit array
 * @returns {string} String representing passed normalized unit array and
 *   suitable for output
 *
 */
function stringifyUnits(units) {
    let stringified = stringifiedUnitsCache.get(units);
    if (stringified) {
        return stringified;
    }

    const isUnity = compareArray(units, UNITY_ARRAY);
    if (isUnity) {
        stringified = '1';
    } else {
        stringified = simplify(getOutputNames(units)).join('*');
    }

    // Cache result
    stringifiedUnitsCache.set(units, stringified);

    return stringified;
}

function getOutputNames(units) {
    const unitNames = [];
    let token;
    let tokenNext;
    for (let i = 0; i < units.length; i++) {
        token = units[i];
        tokenNext = units[i + 1];
        if (PREFIX_VALUES[token]) {
            unitNames.push(OUTPUT_MAP[token] + OUTPUT_MAP[tokenNext]);
            i++;
        } else {
            unitNames.push(OUTPUT_MAP[token]);
        }
    }
    return unitNames;
}

function simplify(units) {
    // this turns ['s','m','s'] into ['s2','m']

    const unitCounts = units.reduce((acc, unit) => {
        let unitCounter = acc[unit];
        if (!unitCounter) {
            acc.push((unitCounter = acc[unit] = [unit, 0]));
        }

        unitCounter[1]++;

        return acc;
    }, []);

    return unitCounts.map(unitCount => {
        return unitCount[0] + (unitCount[1] > 1 ? unitCount[1] : '');
    });
}
