import { Qty, UnitSource, QtyObjects, Source } from './constructor.js';
import { PREFIX_VALUES, UNIT_VALUES } from './definitions.js';
import { toDegrees, toTemp, toTempK } from './temperature.js';
import { divSafe, identity, isNumber, isString, mulSafe } from './utils.js';
import QtyError, { throwIncompatibleUnits } from './error.js';

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
    var cached, target;

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
            var q = divSafe(this.baseScalar, target.baseScalar);
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
    throw new QtyError(
        "Can't convert to Float unless unitless.  Use Unit#scalar"
    );
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

    var precRoundedResult = mulSafe(
        Math.round(this.scalar / precQty.scalar),
        precQty.scalar
    );

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
    var srcQty = new Qty(srcUnits);
    var dstQty = new Qty(dstUnits);

    if (srcQty.eq(dstQty)) {
        return identity;
    }

    var convert: (value: number) => number;
    if (!srcQty.isTemperature()) {
        convert = function(value) {
            return (value * srcQty.baseScalar) / dstQty.baseScalar;
        };
    } else {
        convert = function(value) {
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

const baseUnitCache: QtyObjects = {};

function toBaseUnits(numerator: string[], denominator: string[]): Qty {
    var num = [];
    var den = [];
    var q = 1;
    var unit;
    for (var i = 0; i < numerator.length; i++) {
        unit = numerator[i];
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
    for (var j = 0; j < denominator.length; j++) {
        unit = denominator[j];
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

    // Flatten
    num = num.reduce(function(a, b) {
        return a.concat(b);
    }, []);
    den = den.reduce(function(a, b) {
        return a.concat(b);
    }, []);

    return new Qty({ scalar: q, numerator: num, denominator: den });
}
