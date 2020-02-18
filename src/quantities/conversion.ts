import { Qty } from './constructor.js';
import { PREFIX_VALUES, UNIT_VALUES, UNITY_ARRAY } from './definitions.js';
import { toDegrees, toTemp, toTempK } from './temperature.js';
import { divSafe, identity, isNumber, isString, mulSafe, compareArray, findUnitWithPrefixInList } from './utils.js';
import QtyError, { throwIncompatibleUnits } from './error.js';
import { RegularObject, UnitSource, Source } from './types.js';

/**
 * Converts to other compatible units.
 * Instance's converted quantities are cached for faster subsequent calls.
 *
 * @param {(string|Qty)} other - Target units as string or retrieved from
 *                               other Qty instance (scalar is ignored)
 *
 * @returns {Qty} New converted Qty instance with target units
 *
 * @throws {QtyError} if target units are incompatible
 *
 * @example
 * var weight = Qty("25 kg");
 * weight.to("lb"); // => Qty("55.11556554621939 lbs");
 * weight.to(Qty("3 g")); // => Qty("25000 g"); // scalar of passed Qty is ignored
 */
export function to(this: Qty, other: UnitSource): Qty {
    let cached: Qty;
    let target: Qty;

    if (other === undefined || other === null) {
        return this;
    }

    if (other instanceof Qty) {
        return this.to(other.units());
    }

    cached = this._conversionCache[other];
    if (cached) {
        return cached;
    }

    // Instantiating target to normalize units
    target = new Qty(other);
    if (target.units() === this.units()) {
        return this;
    }

    if (!this.isCompatible(target)) {
        if (this.isInverse(target)) {
            target = this.inverse().to(other);
        } else {
            throwIncompatibleUnits(this.units(), target.units());
        }
    } else {
        if (target.isTemperature()) {
            target = toTemp(this, target);
        } else if (target.isDegrees()) {
            target = toDegrees(this, target);
        } else {
            const q = divSafe(this.baseScalar, target.baseScalar);
            target = new Qty({
                scalar: q,
                numerator: target.numerator,
                denominator: target.denominator
            });
        }
    }

    this._conversionCache[other] = target;
    return target;
}

// convert to base SI units
// results of the conversion are cached so subsequent calls to this will be fast
export function toBase(this: Qty): Qty {
    if (this.isBase()) {
        return this;
    }

    if (this.isTemperature()) {
        return toTempK(this);
    }

    let cached: Qty = baseUnitCache[this.units()];
    if (!cached) {
        cached = toBaseUnits(this.numerator, this.denominator);
        baseUnitCache[this.units()] = cached;
    }
    return cached.mul(this.scalar);
}

// Converts the unit back to a float if it is unitless.  Otherwise raises an exception
export function toFloat(this: Qty): number {
    if (this.isUnitless()) {
        return this.scalar;
    }
    throw new QtyError("Can't convert to Float unless unitless.  Use Unit#scalar");
}

export function convertSingleUnit(this: Qty, baseUnit: UnitSource, targetUnit: UnitSource): Qty {
    if (isString(baseUnit)) {
        return this.convertSingleUnit(new Qty(baseUnit), targetUnit);
    }
    if (isString(targetUnit)) {
        return this.convertSingleUnit(baseUnit, new Qty(targetUnit));
    }
    if (
        !compareArray(baseUnit.denominator, UNITY_ARRAY) ||
        !compareArray(targetUnit.denominator, UNITY_ARRAY)
    ) {
        throw new QtyError('Units should have no denominator for a single unit conversion');
    }
    // TODO Check if base and target are single units with (optionally) a prefix

    const conversionFactor = baseUnit.to(targetUnit).scalar;

    let scalar = this.scalar;
    const numerator = [...this.numerator];
    const denominator = [...this.denominator];

    let foundIndex;
    while ((foundIndex = findUnitWithPrefixInList(baseUnit.numerator, numerator)) > -1) {
        numerator.splice(foundIndex, baseUnit.numerator.length, ...targetUnit.numerator);
        scalar *= conversionFactor;
    }
    while ((foundIndex = findUnitWithPrefixInList(baseUnit.numerator, denominator)) > -1) {
        denominator.splice(foundIndex, baseUnit.numerator.length, ...targetUnit.numerator);
        scalar /= conversionFactor;
    }
    return new Qty({
        scalar,
        numerator,
        denominator
    });
}

/**
 * Returns the nearest multiple of quantity passed as
 * precision
 *
 * @param {(Qty|string|number)} precQuantity - Quantity, string formated
 *   quantity or number as expected precision
 *
 * @returns {Qty} Nearest multiple of precQuantity
 *
 * @example
 * Qty('5.5 ft').toPrec('2 ft'); // returns 6 ft
 * Qty('0.8 cu').toPrec('0.25 cu'); // returns 0.75 cu
 * Qty('6.3782 m').toPrec('cm'); // returns 6.38 m
 * Qty('1.146 MPa').toPrec('0.1 bar'); // returns 1.15 MPa
 *
 */
export function toPrec(this: Qty, precQuantity: Source): Qty {
    let precQty: Qty;
    if (isString(precQuantity)) {
        precQty = new Qty(precQuantity);
    } else if (isNumber(precQuantity)) {
        precQty = new Qty(precQuantity + ' ' + this.units());
    } else {
        precQty = precQuantity as Qty;
    }

    if (!this.isUnitless()) {
        precQty = precQty.to(this.units());
    } else if (!precQty.isUnitless()) {
        throwIncompatibleUnits(this.units(), precQty.units());
    }

    if (precQty.scalar === 0) {
        throw new QtyError('Divide by zero');
    }

    const precRoundedResult = mulSafe(Math.round(this.scalar / precQty.scalar), precQty.scalar);

    return new Qty(precRoundedResult + this.units());
}

/**
 * Configures and returns a fast function to convert
 * Number values from units to others.
 * Useful to efficiently convert large array of values
 * with same units into others with iterative methods.
 * Does not take care of rounding issues.
 *
 * @param {string} srcUnits Units of values to convert
 * @param {string} dstUnits Units to convert to
 *
 * @returns {Function} Converting function accepting Number value
 *   and returning converted value
 *
 * @throws "Incompatible units" if units are incompatible
 *
 * @example
 * // Converting large array of numbers with the same units
 * // into other units
 * var converter = Qty.swiftConverter("m/h", "ft/s");
 * var convertedSerie = largeSerie.map(converter);
 *
 */
export function swiftConverter(srcUnits: string, dstUnits: string) {
    const srcQty = new Qty(srcUnits);
    const dstQty = new Qty(dstUnits);

    if (srcQty.eq(dstQty)) {
        return identity;
    }

    let convert: (value: number) => number;
    if (!srcQty.isTemperature()) {
        convert = value => {
            return (value * srcQty.baseScalar) / dstQty.baseScalar;
        };
    } else {
        convert = value => {
            // TODO Not optimized
            return srcQty.mul(value).to(dstQty).scalar;
        };
    }

    function converter(value: number): number;
    function converter(value: number[]): number[];
    function converter(value: number | number[]) {
        if (!Array.isArray(value)) {
            return convert(value);
        } else {
            return value.map(convert);
        }
    }
    return converter;
}

const baseUnitCache: RegularObject<Qty> = {};

function toBaseUnits(numerator: string[], denominator: string[]): Qty {
    const num = [];
    const den = [];
    let q = 1;
    for (const unit of numerator) {
        if (PREFIX_VALUES[unit]) {
            // workaround to fix
            // 0.1 * 0.1 => 0.010000000000000002
            q = mulSafe(q, PREFIX_VALUES[unit]);
        } else {
            if (UNIT_VALUES[unit]) {
                q *= UNIT_VALUES[unit].scalar;

                if (UNIT_VALUES[unit].numerator) {
                    num.push(UNIT_VALUES[unit].numerator);
                }
                if (UNIT_VALUES[unit].denominator) {
                    den.push(UNIT_VALUES[unit].denominator);
                }
            }
        }
    }
    for (const unit of denominator) {
        if (PREFIX_VALUES[unit]) {
            q /= PREFIX_VALUES[unit];
        } else {
            if (UNIT_VALUES[unit]) {
                q /= UNIT_VALUES[unit].scalar;

                if (UNIT_VALUES[unit].numerator) {
                    den.push(UNIT_VALUES[unit].numerator);
                }
                if (UNIT_VALUES[unit].denominator) {
                    num.push(UNIT_VALUES[unit].denominator);
                }
            }
        }
    }

    const concat = (a, b) => {
        return a.concat(b);
    };

    return new Qty({
        scalar: q,
        numerator: num.reduce(concat, []),
        denominator: den.reduce(concat, [])
    });
}
