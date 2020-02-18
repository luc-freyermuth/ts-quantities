# ts-quantities

Originally a fork of [gentooboontoo/js-quantities](https://github.com/gentooboontoo/js-quantities) rewritten in typescript.

## Installing ts-quantities

### Node

#### Install it in your project

```
npm install --save ts-quantities
```

#### Import it !

```typescript
import { Qty } from 'ts-quantities'
```

## Using ts-quantities

### Qty

ts-quantities heavily relies on `Qty` objects. To create `Qty` objects, use its constructor using `new`.

```typescript
qty = new Qty('23 ft');
```

`Qty` constructor accepts strings, numbers and `Qty` instances as
initializing values.

If scalars and their respective units are available programmatically, the
two argument signature may be useful:

```typescript
qty = new Qty(124, 'cm'); // => 1.24 meter
```

```typescript
qty = new Qty('1m'); // => 1 meter
qty = new Qty('m'); // =>  1 meter (scalar defaults to 1)

qty = new Qty('1 N*m');
qty = new Qty('1 N m'); // * is optional

qty = new Qty('1 m/s');

qty = new Qty('1 m^2/s^2');
qty = new Qty('1 m^2 s^-2'); // negative powers
qty = new Qty('1 m2 s-2'); // ^ is optional

qty = new Qty('1 m^2 kg^2 J^2/s^2 A');

qty = new Qty('1.5'); // unitless quantity
qty = new Qty(1.5); // number as initializing value

qty = new Qty('1 attoparsec/microfortnight');

qtyCopy = new Qty(qty); // quantity could be copied when used as
                        // initializing value
```

### Parsing a quantity manually

`Qty.parse` utility method is also provided to parse and create
quantities from strings. Unlike the constructor, it will return `null`
instead of throwing an error when parsing an invalid quantity.

```typescript
static parse(value: string): Qty

Qty.parse('1 m'); // => 1 meter
Qty.parse('foo'); // => null
```

### Available well-known kinds

```typescript
static getKinds(): string[]

Qty.getKinds(); // => Array of names of every well-known kind of units
```

### Available units of a particular kind

```typescript
static getUnits(kind?: string): string[]

Qty.getUnits('currency'); // => [ 'dollar', 'cents' ]
Qty.getUnits(); // All units, alphebetically sorted => [ 'acre','Ah','ampere','AMU','angstrom', ...]
```

### Alternative names of a unit

```typescript
static getAliases(unitName: string): string[]

Qty.getAliases('m'); // => [ 'm', 'meter', 'meters', 'metre', 'metres' ]
```

### Quantity compatibility, kind and various queries

```typescript
public isCompatible(other: Qty | string): boolean
qty1.isCompatible(qty2); // => true or false

public kind(): string
qty.kind(); // => 'length', 'area', etc...

public isUnitless(): boolean
qty.isUnitless(); // => true or false

public isBase(): boolean
qty.isBase(); // => true if quantity is represented with base units
```

### Conversion

```typescript
public toBase(): Qty
qty.toBase(); // converts to SI units (10 cm => 0.1 m) (new instance)

public toFloat(): number
qty.toFloat(); // returns scalar of unitless quantity
               // (otherwise throws error)

public to(Qty | string): Qty
qty.to('m'); // converts quantity to meter if compatible
             // or throws an error (new instance)
qty1.to(qty2); // converts quantity to same unit of qty2 if compatible
               // or throws an error (new instance)

public inverse(): Qty
qty.inverse(); // converts quantity to its inverse
               // ('100 m/s' => '0.01 s/m')
// Inverses can be used, but there is no special checking to
// rename the units
new Qty('10ohm').inverse(); // '0.1/ohm'
                       // (not '0.1S', although they are equivalent)
// however, the 'to' command will convert between inverses also
new Qty('10ohm').to('S'); // '0.1S'

public convertSingleUnit(baseUnit: string, targetUnit: string): Qty
// Converts the selected baseUnit into the target unit. Others units remain untouched.
new Qty('0.14 USD/kWh').convertSingleUnit('kWh', 'MWh'); // 140 USD/MWh
new Qty('4000 m2').convertSingleUnit('m', 'km'); // 0.004 km2
```

### Mass conversion

`Qty.swiftConverter()` is a fast way to efficiently convert large array of
Number values. It configures a function accepting a value or an array of Number
values to convert.

```typescript
static swiftConverter(srcUnits: string, dstUnits: string): (value: number | number[]) => number | number[]

const convert = Qty.swiftConverter('m/h', 'ft/s'); // Configures converter

// Converting single value
const converted = convert(2500); // => 2.278..
// Converting large array of values
const convertedArray = convert([2500, 5000, ...]); // => [2.278.., 4.556.., ...]
```

The main drawback of this conversion method is that it does not take care of
rounding issues.

### Comparison

```typescript
public eq(other: Qty): boolean
qty1.eq(qty2); // => true if both quantities are equal (1m == 100cm => true)

public same(other: Qty): boolean
qty1.same(qty2); // => true if both quantities are same (1m == 100cm => false)

public lt(other: Qty): boolean
qty1.lt(qty2); // => true if qty1 is stricty less than qty2

public lte(other: Qty): boolean
qty1.lte(qty2); // => true if qty1 is less than or equal to qty2

public gt(other: Qty): boolean
qty1.gt(qty2); // => true if qty1 is stricty greater than qty2

public gte(other: Qty): boolean
qty1.gte(qty2); // => true if qty1 is greater than or equal to qty2

public compareTo(other: Qty): number
qty1.compareTo(qty2); // => -1 if qty1 < qty2,
                      // => 0 if qty1 == qty2,
                      // => 1 if qty1 > qty2
```

### Operators

```typescript
public add(other: Qty | string | number): Qty // other should be unit compatible.
public sub(other: Qty | string | number): Qty // other should be unit compatible.
public mul(other: Qty | string | number): Qty
public div(other: Qty | string | number): Qty
```

### Rounding

`Qty#toPrec(precision)` : returns the nearest multiple of quantity passed as
precision.

```typescript
public toPrec(precQuantity: Qty | string | number): Qty

const qty = new Qty('5.17 ft');
qty.toPrec('ft'); // => 5 ft
qty.toPrec('0.5 ft'); // => 5 ft
qty.toPrec('0.25 ft'); // => 5.25 ft
qty.toPrec('0.1 ft'); // => 5.2 ft
qty.toPrec('0.05 ft'); // => 5.15 ft
qty.toPrec('0.01 ft'); // => 5.17 ft
qty.toPrec('0.00001 ft'); // => 5.17 ft
qty.toPrec('2 ft'); // => 6 ft
qty.toPrec('2'); // => 6 ft

const qty = new Qty('6.3782 m');
qty.toPrec('dm'); // => 6.4 m
qty.toPrec('cm'); // => 6.38 m
qty.toPrec('mm'); // => 6.378 m
qty.toPrec('5 cm'); // => 6.4 m
qty.toPrec('10 m'); // => 10 m
qty.toPrec(0.1); // => 6.3 m

const qty = new Qty('1.146 MPa');
qty.toPrec('0.1 bar'); // => 1.15 MPa
```

### Formatting quantities

`Qty#toString` returns a string using the canonical form of the quantity (that
is it could be seamlessly reparsed by `Qty`).

```typescript
public toString(toUnits?: string): string

var qty = new Qty('1.146 MPa');
qty.toString(); // => '1.146 MPa'
```

As a shorthand, units could be passed to `Qty#toString` and is equivalent to
successively call `Qty#to` then `Qty#toString`.

```typescript
const qty = new Qty('1.146 MPa');
qty.toString('bar'); // => '11.46 bar'
qty.to('bar').toString(); // => '11.46 bar'
```

`Qty#toString` could also be used with any method from `Qty` to make some sort
of formatting. For instance, one could use `Qty#toPrec` to fix the maximum
number of decimals:

```typescript
const qty = new Qty('1.146 MPa');
qty.toPrec(0.1).toString(); // => '1.1 MPa'
qty.to('bar').toPrec(0.1).toString(); // => '11.5 bar'
```

For advanced formatting needs as localization, specific rounding or any other
custom customization, quantities can be transformed into strings through
`Qty#format` according to optional target units and formatter. If target units
are specified, the quantity is converted into them before formatting.

Such a string is not intended to be reparsed to construct a new instance of
`Qty` (unlike output of `Qty#toString`).

If no formatter is specified, quantities are formatted according to default
ts-quantities' formatter and is equivalent to `Qty#toString`.

```typescript
type Formatter = (scalar: number, units: string) => string;
public format(formatter?: Formatter): string;
public format(targetUnits?: string, formatter?: Formatter): string;
```

```typescript
var qty = new Qty('1.1234 m');
qty.format(); // same units, default formatter => '1.234 m'
qty.format('cm'); // converted to 'cm', default formatter => '123.45 cm'
```

`Qty#format` could delegates formatting to a custom formatter if required. A
formatter is a callback function accepting scalar and units as parameters and
returning a formatted string representing the quantity.

```typescript
const configurableRoundingFormatter = (maxDecimals: number): Formatter => {
  return (scalar: number, units: string): string => {
    const pow = Math.pow(10, maxDecimals);
    const rounded = Math.round(scalar * pow) / pow;
    return rounded + ' ' + units;
  };
};

const qty = new Qty('1.1234 m');

// same units, custom formatter => '1.12 m'
qty.format(configurableRoundingFormatter(2));

// convert to 'cm', custom formatter => '123.4 cm'
qty.format('cm', configurableRoundingFormatter(1));
```

Custom formatter can be configured globally by setting `Qty.formatter`.

```typescript
static formatter: Formatter;

Qty.formatter = configurableRoundingFormatter(2);
const qty = new Qty('1.1234 m');
qty.format(); // same units, current default formatter => '1.12 m'
```

### Temperatures

Like ruby-units, ts-quantities makes a distinction between a temperature (which
technically is a property) and degrees of temperature (which temperatures are
measured in).

Temperature units (i.e., 'tempK') can be converted back and forth, and will take
into account the differences in the zero points of the various scales.
Differential temperature (e.g., '100 degC') units behave like most other units.

```typescript
new Qty('37 tempC').to('tempF') // => 98.6 tempF
```

ts-quantities will throw an error if you attempt to create a temperature unit
that would fall below absolute zero.

Unit math on temperatures is fairly limited.

```typescript
new Qty('100 tempC').add('10 degC')  // 110 tempC
new Qty('100 tempC').sub('10 degC')  // 90 tempC
new Qty('100 tempC').add('50 tempC') // throws error
new Qty('100 tempC').sub('50 tempC') // 50 degC
new Qty('50 tempC').sub('100 tempC') // -50 degC
new Qty('100 tempC').mul(scalar)     // 100*scalar tempC
new Qty('100 tempC').div(scalar)     // 100/scalar tempC
new Qty('100 tempC').mul(qty)        // throws error
new Qty('100 tempC').div(qty)        // throws error
new Qty('100 tempC*unit')            // throws error
new Qty('100 tempC/unit')            // throws error
new Qty('100 unit/tempC')            // throws error
new Qty('100 tempC').inverse()       // throws error
```

```typescript
new Qty('100 tempC').to('degC') // => 100 degC
```

This conversion references the 0 point on the scale of the temperature unit

```typescript
new Qty('100 degC').to('tempC') // => -173.15 tempC
```

These conversions are always interpreted as being relative to absolute zero.
Conversions are probably better done like this...

```typescript
new Qty('0 tempC').add('100 degC') // => 100 tempC
```

### Errors

Every error thrown by ts-quantities is an instance of `Qty.Error`.

```typescript
try {
  // code triggering an error inside ts-quantities
}
catch(error) {
  if(error instanceof Qty.Error) {
    // ...
  }
  else {
    // ...
  }
}
```

## Tests

Tests are implemented with Jasmine (https://github.com/pivotal/jasmine).

To execute specs through `jasmine-node`, launch:

```
npm install -g jasmine-node
npm run test
```

## Contribute

Feedback and contributions are welcomed.

Pull requests must pass tests and linting. Please make sure that `npm run test`
and `npm run lint` return no errors before submitting.