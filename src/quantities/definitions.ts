import { isNumber } from './utils.js';
import QtyError from './error.js';
import { RegularObject, ScalarAndUnit, UnitDefinition } from './types.js';

export const UNITS: RegularObject<UnitDefinition> = {
    '<googol>': { aliases: ['googol'], equivalentUnitRepresentation: null, scalar: 1e100, unitType: 'prefix' },
    '<kibi>': { aliases: ['Ki', 'Kibi', 'kibi'], equivalentUnitRepresentation: null, scalar: 1024, unitType: 'prefix' },
    '<mebi>': { aliases: ['Mi', 'Mebi', 'mebi'], equivalentUnitRepresentation: null, scalar: 1048576, unitType: 'prefix' },
    '<gibi>': { aliases: ['Gi', 'Gibi', 'gibi'], equivalentUnitRepresentation: null, scalar: 1073741824, unitType: 'prefix' },
    '<tebi>': { aliases: ['Ti', 'Tebi', 'tebi'], equivalentUnitRepresentation: null, scalar: 1099511627776, unitType: 'prefix' },
    '<pebi>': { aliases: ['Pi', 'Pebi', 'pebi'], equivalentUnitRepresentation: null, scalar: 1125899906842624, unitType: 'prefix' },
    '<exi>': { aliases: ['Ei', 'Exi', 'exi'], equivalentUnitRepresentation: null, scalar: 1152921504606847000, unitType: 'prefix' },
    '<zebi>': { aliases: ['Zi', 'Zebi', 'zebi'], equivalentUnitRepresentation: null, scalar: 1.1805916207174113e21, unitType: 'prefix' },
    '<yebi>': { aliases: ['Yi', 'Yebi', 'yebi'], equivalentUnitRepresentation: null, scalar: 1.2089258196146292e24, unitType: 'prefix' },
    '<yotta>': { aliases: ['Y', 'Yotta', 'yotta'], equivalentUnitRepresentation: null, scalar: 1e24, unitType: 'prefix' },
    '<zetta>': { aliases: ['Z', 'Zetta', 'zetta'], equivalentUnitRepresentation: null, scalar: 1e21, unitType: 'prefix' },
    '<exa>': { aliases: ['E', 'Exa', 'exa'], equivalentUnitRepresentation: null, scalar: 1000000000000000000, unitType: 'prefix' },
    '<peta>': { aliases: ['P', 'Peta', 'peta'], equivalentUnitRepresentation: null, scalar: 1000000000000000, unitType: 'prefix' },
    '<tera>': { aliases: ['T', 'Tera', 'tera'], equivalentUnitRepresentation: null, scalar: 1000000000000, unitType: 'prefix' },
    '<giga>': { aliases: ['G', 'Giga', 'giga'], equivalentUnitRepresentation: null, scalar: 1000000000, unitType: 'prefix' },
    '<mega>': { aliases: ['M', 'Mega', 'mega'], equivalentUnitRepresentation: null, scalar: 1000000, unitType: 'prefix' },
    '<kilo>': { aliases: ['k', 'kilo'], equivalentUnitRepresentation: null, scalar: 1000, unitType: 'prefix' },
    '<hecto>': { aliases: ['h', 'Hecto', 'hecto'], equivalentUnitRepresentation: null, scalar: 100, unitType: 'prefix' },
    '<deca>': { aliases: ['da', 'Deca', 'deca', 'deka'], equivalentUnitRepresentation: null, scalar: 10, unitType: 'prefix' },
    '<deci>': { aliases: ['d', 'Deci', 'deci'], equivalentUnitRepresentation: null, scalar: 0.1, unitType: 'prefix' },
    '<centi>': { aliases: ['c', 'Centi', 'centi'], equivalentUnitRepresentation: null, scalar: 0.01, unitType: 'prefix' },
    '<milli>': { aliases: ['m', 'Milli', 'milli'], equivalentUnitRepresentation: null, scalar: 0.001, unitType: 'prefix' },
    '<micro>': { aliases: ['u', 'μ', 'µ', 'Micro', 'mc', 'micro'], equivalentUnitRepresentation: null, scalar: 0.000001, unitType: 'prefix' },
    '<nano>': { aliases: ['n', 'Nano', 'nano'], equivalentUnitRepresentation: null, scalar: 1e-9, unitType: 'prefix' },
    '<pico>': { aliases: ['p', 'Pico', 'pico'], equivalentUnitRepresentation: null, scalar: 1e-12, unitType: 'prefix' },
    '<femto>': { aliases: ['f', 'Femto', 'femto'], equivalentUnitRepresentation: null, scalar: 1e-15, unitType: 'prefix' },
    '<atto>': { aliases: ['a', 'Atto', 'atto'], equivalentUnitRepresentation: null, scalar: 1e-18, unitType: 'prefix' },
    '<zepto>': { aliases: ['z', 'Zepto', 'zepto'], equivalentUnitRepresentation: null, scalar: 1e-21, unitType: 'prefix' },
    '<yocto>': { aliases: ['y', 'Yocto', 'yocto'], equivalentUnitRepresentation: null, scalar: 1e-24, unitType: 'prefix' },
    '<1>': { aliases: ['1', '<1>'], equivalentUnitRepresentation: null, scalar: 1, unitType: '' },
    '<meter>': {
        aliases: ['m', 'meter', 'meters', 'metre', 'metres'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'length'
    },
    '<inch>': {
        aliases: ['in', 'inch', 'inches', '"'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 0.0254,
        unitType: 'length'
    },
    '<foot>': {
        aliases: ['ft', 'foot', 'feet', "'"],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 0.3048,
        unitType: 'length'
    },
    '<yard>': {
        aliases: ['yd', 'yard', 'yards'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 0.9144,
        unitType: 'length'
    },
    '<mile>': {
        aliases: ['mi', 'mile', 'miles'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 1609.344,
        unitType: 'length'
    },
    '<naut-mile>': {
        aliases: ['nmi', 'naut-mile'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 1852,
        unitType: 'length'
    },
    '<league>': {
        aliases: ['league', 'leagues'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 4828,
        unitType: 'length'
    },
    '<furlong>': {
        aliases: ['furlong', 'furlongs'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 201.2,
        unitType: 'length'
    },
    '<rod>': {
        aliases: ['rd', 'rod', 'rods'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 5.029,
        unitType: 'length'
    },
    '<mil>': {
        aliases: ['mil', 'mils'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 0.0000254,
        unitType: 'length'
    },
    '<angstrom>': {
        aliases: ['ang', 'angstrom', 'angstroms'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 1e-10,
        unitType: 'length'
    },
    '<fathom>': {
        aliases: ['fathom', 'fathoms'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 1.829,
        unitType: 'length'
    },
    '<pica>': {
        aliases: ['pica', 'picas'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 0.00423333333,
        unitType: 'length'
    },
    '<point>': {
        aliases: ['pt', 'point', 'points'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 0.000352777778,
        unitType: 'length'
    },
    '<redshift>': {
        aliases: ['z', 'red-shift', 'redshift'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 1.302773e26,
        unitType: 'length'
    },
    '<AU>': {
        aliases: ['AU', 'astronomical-unit'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 149597900000,
        unitType: 'length'
    },
    '<light-second>': {
        aliases: ['ls', 'light-second'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 299792500,
        unitType: 'length'
    },
    '<light-minute>': {
        aliases: ['lmin', 'light-minute'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 17987550000,
        unitType: 'length'
    },
    '<light-year>': {
        aliases: ['ly', 'light-year'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 9460528000000000,
        unitType: 'length'
    },
    '<parsec>': {
        aliases: ['pc', 'parsec', 'parsecs'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 30856780000000000,
        unitType: 'length'
    },
    '<datamile>': {
        aliases: ['DM', 'datamile'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<1>'] },
        scalar: 1828.8,
        unitType: 'length'
    },
    '<kilogram>': {
        aliases: ['kg', 'kilogram', 'kilograms'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'mass'
    },
    '<AMU>': {
        aliases: ['u', 'AMU', 'amu'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 1.660538921e-27,
        unitType: 'mass'
    },
    '<dalton>': {
        aliases: ['Da', 'Dalton', 'Daltons', 'dalton', 'daltons'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 1.660538921e-27,
        unitType: 'mass'
    },
    '<slug>': {
        aliases: ['slug', 'slugs'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 14.5939029,
        unitType: 'mass'
    },
    '<short-ton>': {
        aliases: ['tn', 'ton', 'short-ton'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 907.18474,
        unitType: 'mass'
    },
    '<metric-ton>': {
        aliases: ['tonne', 'metric-ton'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 1000,
        unitType: 'mass'
    },
    '<carat>': {
        aliases: ['ct', 'carat', 'carats'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 0.0002,
        unitType: 'mass'
    },
    '<pound>': {
        aliases: ['lbs', 'lb', 'pound', 'pounds', '#'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 0.45359237,
        unitType: 'mass'
    },
    '<ounce>': {
        aliases: ['oz', 'ounce', 'ounces'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 0.0283495231,
        unitType: 'mass'
    },
    '<gram>': {
        aliases: ['g', 'gram', 'grams', 'gramme', 'grammes'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 0.001,
        unitType: 'mass'
    },
    '<grain>': {
        aliases: ['grain', 'grains', 'gr'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 0.00006479891,
        unitType: 'mass'
    },
    '<dram>': {
        aliases: ['dram', 'drams', 'dr'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 0.0017718452,
        unitType: 'mass'
    },
    '<stone>': {
        aliases: ['stone', 'stones', 'st'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<1>'] },
        scalar: 6.35029318,
        unitType: 'mass'
    },
    '<hectare>': {
        aliases: ['hectare'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 10000,
        unitType: 'area'
    },
    '<acre>': {
        aliases: ['acre', 'acres'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 4046.85642,
        unitType: 'area'
    },
    '<sqft>': { aliases: ['sqft'], equivalentUnitRepresentation: { numerator: ['<foot>', '<foot>'], denominator: ['<1>'] }, scalar: 1, unitType: 'area' },
    '<liter>': {
        aliases: ['l', 'L', 'liter', 'liters', 'litre', 'litres'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.001,
        unitType: 'volume'
    },
    '<gallon>': {
        aliases: ['gal', 'gallon', 'gallons'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.0037854118,
        unitType: 'volume'
    },
    '<gallon-imp>': {
        aliases: ['galimp', 'gallon-imp', 'gallons-imp'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.00454609,
        unitType: 'volume'
    },
    '<quart>': {
        aliases: ['qt', 'quart', 'quarts'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.00094635295,
        unitType: 'volume'
    },
    '<pint>': {
        aliases: ['pt', 'pint', 'pints'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.000473176475,
        unitType: 'volume'
    },
    '<pint-imp>': {
        aliases: ['ptimp', 'pint-imp', 'pints-imp'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.00056826125,
        unitType: 'volume'
    },
    '<cup>': {
        aliases: ['cu', 'cup', 'cups'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.000236588238,
        unitType: 'volume'
    },
    '<fluid-ounce>': {
        aliases: ['floz', 'fluid-ounce', 'fluid-ounces'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.0000295735297,
        unitType: 'volume'
    },
    '<fluid-ounce-imp>': {
        aliases: ['flozimp', 'floz-imp', 'fluid-ounce-imp', 'fluid-ounces-imp'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.0000284130625,
        unitType: 'volume'
    },
    '<tablespoon>': {
        aliases: ['tb', 'tbsp', 'tbs', 'tablespoon', 'tablespoons'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.0000147867648,
        unitType: 'volume'
    },
    '<teaspoon>': {
        aliases: ['tsp', 'teaspoon', 'teaspoons'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.00000492892161,
        unitType: 'volume'
    },
    '<bushel>': {
        aliases: ['bu', 'bsh', 'bushel', 'bushels'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.035239072,
        unitType: 'volume'
    },
    '<oilbarrel>': {
        aliases: ['bbl', 'oil-barrel', 'oil-barrels'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.158987294928,
        unitType: 'volume'
    },
    '<beerbarrel>': {
        aliases: ['bl', 'bl-us', 'beer-barrel', 'beer-barrels'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.1173477658,
        unitType: 'volume'
    },
    '<beerbarrel-imp>': {
        aliases: ['blimp', 'bl-imp', 'beer-barrel-imp', 'beer-barrels-imp'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<meter>'], denominator: ['<1>'] },
        scalar: 0.16365924,
        unitType: 'volume'
    },
    '<kph>': {
        aliases: ['kph'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<second>'] },
        scalar: 0.277777778,
        unitType: 'speed'
    },
    '<mph>': { aliases: ['mph'], equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<second>'] }, scalar: 0.44704, unitType: 'speed' },
    '<knot>': {
        aliases: ['kt', 'kn', 'kts', 'knot', 'knots'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<second>'] },
        scalar: 0.514444444,
        unitType: 'speed'
    },
    '<fps>': { aliases: ['fps'], equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<second>'] }, scalar: 0.3048, unitType: 'speed' },
    '<gee>': {
        aliases: ['gee'],
        equivalentUnitRepresentation: { numerator: ['<meter>'], denominator: ['<second>', '<second>'] },
        scalar: 9.80665,
        unitType: 'acceleration'
    },
    '<kelvin>': {
        aliases: ['degK', 'kelvin'],
        equivalentUnitRepresentation: { numerator: ['<kelvin>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'temperature'
    },
    '<celsius>': {
        aliases: ['degC', 'celsius', 'celsius', 'centigrade'],
        equivalentUnitRepresentation: { numerator: ['<kelvin>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'temperature'
    },
    '<fahrenheit>': {
        aliases: ['degF', 'fahrenheit'],
        equivalentUnitRepresentation: { numerator: ['<kelvin>'], denominator: ['<1>'] },
        scalar: 0.5555555555555556,
        unitType: 'temperature'
    },
    '<rankine>': {
        aliases: ['degR', 'rankine'],
        equivalentUnitRepresentation: { numerator: ['<kelvin>'], denominator: ['<1>'] },
        scalar: 0.5555555555555556,
        unitType: 'temperature'
    },
    '<temp-K>': {
        aliases: ['tempK', 'temp-K'],
        equivalentUnitRepresentation: { numerator: ['<temp-K>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'temperature'
    },
    '<temp-C>': {
        aliases: ['tempC', 'temp-C'],
        equivalentUnitRepresentation: { numerator: ['<temp-K>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'temperature'
    },
    '<temp-F>': {
        aliases: ['tempF', 'temp-F'],
        equivalentUnitRepresentation: { numerator: ['<temp-K>'], denominator: ['<1>'] },
        scalar: 0.5555555555555556,
        unitType: 'temperature'
    },
    '<temp-R>': {
        aliases: ['tempR', 'temp-R'],
        equivalentUnitRepresentation: { numerator: ['<temp-K>'], denominator: ['<1>'] },
        scalar: 0.5555555555555556,
        unitType: 'temperature'
    },
    '<second>': {
        aliases: ['s', 'sec', 'secs', 'second', 'seconds'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'time'
    },
    '<minute>': {
        aliases: ['min', 'mins', 'minute', 'minutes'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 60,
        unitType: 'time'
    },
    '<hour>': {
        aliases: ['h', 'hr', 'hrs', 'hour', 'hours'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 3600,
        unitType: 'time'
    },
    '<day>': {
        aliases: ['d', 'day', 'days'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 86400,
        unitType: 'time'
    },
    '<week>': {
        aliases: ['wk', 'week', 'weeks'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 604800,
        unitType: 'time'
    },
    '<fortnight>': {
        aliases: ['fortnight', 'fortnights'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 1209600,
        unitType: 'time'
    },
    '<year>': {
        aliases: ['y', 'yr', 'year', 'years', 'annum'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 31556926,
        unitType: 'time'
    },
    '<decade>': {
        aliases: ['decade', 'decades'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 315569260,
        unitType: 'time'
    },
    '<century>': {
        aliases: ['century', 'centuries'],
        equivalentUnitRepresentation: { numerator: ['<second>'], denominator: ['<1>'] },
        scalar: 3155692600,
        unitType: 'time'
    },
    '<pascal>': {
        aliases: ['Pa', 'pascal', 'Pascal'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 1,
        unitType: 'pressure'
    },
    '<bar>': {
        aliases: ['bar', 'bars'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 100000,
        unitType: 'pressure'
    },
    '<mmHg>': {
        aliases: ['mmHg'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 133.322368,
        unitType: 'pressure'
    },
    '<inHg>': {
        aliases: ['inHg'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 3386.3881472,
        unitType: 'pressure'
    },
    '<torr>': {
        aliases: ['torr'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 133.322368,
        unitType: 'pressure'
    },
    '<atm>': {
        aliases: ['atm', 'ATM', 'atmosphere', 'atmospheres'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 101325,
        unitType: 'pressure'
    },
    '<psi>': {
        aliases: ['psi'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 6894.76,
        unitType: 'pressure'
    },
    '<cmh2o>': {
        aliases: ['cmH2O', 'cmh2o'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 98.0638,
        unitType: 'pressure'
    },
    '<inh2o>': {
        aliases: ['inH2O', 'inh2o'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>', '<second>'] },
        scalar: 249.082052,
        unitType: 'pressure'
    },
    '<poise>': {
        aliases: ['P', 'poise'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<second>'] },
        scalar: 0.1,
        unitType: 'viscosity'
    },
    '<stokes>': {
        aliases: ['St', 'stokes'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>'], denominator: ['<second>'] },
        scalar: 0.0001,
        unitType: 'viscosity'
    },
    '<mole>': { aliases: ['mol', 'mole'], equivalentUnitRepresentation: { numerator: ['<mole>'], denominator: ['<1>'] }, scalar: 1, unitType: 'substance' },
    '<molar>': {
        aliases: ['M', 'molar'],
        equivalentUnitRepresentation: { numerator: ['<mole>'], denominator: ['<meter>', '<meter>', '<meter>'] },
        scalar: 1000,
        unitType: 'concentration'
    },
    '<wtpercent>': {
        aliases: ['wt%', 'wtpercent'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<meter>', '<meter>', '<meter>'] },
        scalar: 10,
        unitType: 'concentration'
    },
    '<katal>': {
        aliases: ['kat', 'katal', 'Katal'],
        equivalentUnitRepresentation: { numerator: ['<mole>'], denominator: ['<second>'] },
        scalar: 1,
        unitType: 'activity'
    },
    '<unit>': {
        aliases: ['U', 'enzUnit', 'unit'],
        equivalentUnitRepresentation: { numerator: ['<mole>'], denominator: ['<second>'] },
        scalar: 1.6667e-15,
        unitType: 'activity'
    },
    '<farad>': {
        aliases: ['F', 'farad', 'Farad'],
        equivalentUnitRepresentation: {
            numerator: ['<second>', '<second>', '<second>', '<second>', '<ampere>', '<ampere>'],
            denominator: ['<meter>', '<meter>', '<kilogram>']
        },
        scalar: 1,
        unitType: 'capacitance'
    },
    '<coulomb>': {
        aliases: ['C', 'coulomb', 'Coulomb'],
        equivalentUnitRepresentation: { numerator: ['<ampere>', '<second>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'charge'
    },
    '<Ah>': {
        aliases: ['Ah'],
        equivalentUnitRepresentation: { numerator: ['<ampere>', '<second>'], denominator: ['<1>'] },
        scalar: 3600,
        unitType: 'charge'
    },
    '<ampere>': {
        aliases: ['A', 'Ampere', 'ampere', 'amp', 'amps'],
        equivalentUnitRepresentation: { numerator: ['<ampere>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'current'
    },
    '<siemens>': {
        aliases: ['S', 'Siemens', 'siemens'],
        equivalentUnitRepresentation: { numerator: ['<second>', '<second>', '<second>', '<ampere>', '<ampere>'], denominator: ['<kilogram>', '<meter>', '<meter>'] },
        scalar: 1,
        unitType: 'conductance'
    },
    '<henry>': {
        aliases: ['H', 'Henry', 'henry'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>', '<ampere>', '<ampere>'] },
        scalar: 1,
        unitType: 'inductance'
    },
    '<volt>': {
        aliases: ['V', 'Volt', 'volt', 'volts'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>', '<second>', '<ampere>'] },
        scalar: 1,
        unitType: 'potential'
    },
    '<ohm>': {
        aliases: ['Ohm', 'ohm', 'Ω', 'Ω'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>', '<second>', '<ampere>', '<ampere>'] },
        scalar: 1,
        unitType: 'resistance'
    },
    '<weber>': {
        aliases: ['Wb', 'weber', 'webers'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>', '<ampere>'] },
        scalar: 1,
        unitType: 'magnetism'
    },
    '<tesla>': {
        aliases: ['T', 'tesla', 'teslas'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<second>', '<second>', '<ampere>'] },
        scalar: 1,
        unitType: 'magnetism'
    },
    '<gauss>': {
        aliases: ['G', 'gauss'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>'], denominator: ['<second>', '<second>', '<ampere>'] },
        scalar: 0.0001,
        unitType: 'magnetism'
    },
    '<maxwell>': {
        aliases: ['Mx', 'maxwell', 'maxwells'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>', '<ampere>'] },
        scalar: 1e-8,
        unitType: 'magnetism'
    },
    '<oersted>': {
        aliases: ['Oe', 'oersted', 'oersteds'],
        equivalentUnitRepresentation: { numerator: ['<ampere>'], denominator: ['<meter>'] },
        scalar: 79.57747154594767,
        unitType: 'magnetism'
    },
    '<joule>': {
        aliases: ['J', 'joule', 'Joule', 'joules'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>'] },
        scalar: 1,
        unitType: 'energy'
    },
    '<erg>': {
        aliases: ['erg', 'ergs'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>'] },
        scalar: 1e-7,
        unitType: 'energy'
    },
    '<btu>': {
        aliases: ['BTU', 'btu', 'BTUs'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>'] },
        scalar: 1055.056,
        unitType: 'energy'
    },
    '<calorie>': {
        aliases: ['cal', 'calorie', 'calories'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>'] },
        scalar: 4.184,
        unitType: 'energy'
    },
    '<Calorie>': {
        aliases: ['Cal', 'Calorie', 'Calories'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>'] },
        scalar: 4184,
        unitType: 'energy'
    },
    '<therm-US>': {
        aliases: ['th', 'therm', 'therms', 'Therm', 'therm-US'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>'] },
        scalar: 105480400,
        unitType: 'energy'
    },
    '<Wh>': {
        aliases: ['Wh'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>', '<kilogram>'], denominator: ['<second>', '<second>'] },
        scalar: 3600,
        unitType: 'energy'
    },
    '<newton>': {
        aliases: ['N', 'Newton', 'newton'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>', '<meter>'], denominator: ['<second>', '<second>'] },
        scalar: 1,
        unitType: 'force'
    },
    '<dyne>': {
        aliases: ['dyn', 'dyne'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>', '<meter>'], denominator: ['<second>', '<second>'] },
        scalar: 0.00001,
        unitType: 'force'
    },
    '<pound-force>': {
        aliases: ['lbf', 'pound-force'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>', '<meter>'], denominator: ['<second>', '<second>'] },
        scalar: 4.448222,
        unitType: 'force'
    },
    '<hertz>': {
        aliases: ['Hz', 'hertz', 'Hertz'],
        equivalentUnitRepresentation: { numerator: ['<1>'], denominator: ['<second>'] },
        scalar: 1,
        unitType: 'frequency'
    },
    '<radian>': {
        aliases: ['rad', 'radian', 'radians'],
        equivalentUnitRepresentation: { numerator: ['<radian>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'angle'
    },
    '<degree>': {
        aliases: ['deg', 'degree', 'degrees'],
        equivalentUnitRepresentation: { numerator: ['<radian>'], denominator: ['<1>'] },
        scalar: 0.017453292519943295,
        unitType: 'angle'
    },
    '<gradian>': {
        aliases: ['gon', 'grad', 'gradian', 'grads'],
        equivalentUnitRepresentation: { numerator: ['<radian>'], denominator: ['<1>'] },
        scalar: 0.015707963267948967,
        unitType: 'angle'
    },
    '<steradian>': {
        aliases: ['sr', 'steradian', 'steradians'],
        equivalentUnitRepresentation: { numerator: ['<steradian>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'solid_angle'
    },
    '<rotation>': {
        aliases: ['rotation'],
        equivalentUnitRepresentation: { numerator: ['<radian>'], denominator: ['<1>'] },
        scalar: 6.283185307179586,
        unitType: 'angle'
    },
    '<rpm>': {
        aliases: ['rpm'],
        equivalentUnitRepresentation: { numerator: ['<radian>'], denominator: ['<second>'] },
        scalar: 0.10471975511965977,
        unitType: 'angular_velocity'
    },
    '<byte>': {
        aliases: ['B', 'byte', 'bytes'],
        equivalentUnitRepresentation: { numerator: ['<byte>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'information'
    },
    '<bit>': {
        aliases: ['b', 'bit', 'bits'],
        equivalentUnitRepresentation: { numerator: ['<byte>'], denominator: ['<1>'] },
        scalar: 0.125,
        unitType: 'information'
    },
    '<Bps>': {
        aliases: ['Bps'],
        equivalentUnitRepresentation: { numerator: ['<byte>'], denominator: ['<second>'] },
        scalar: 1,
        unitType: 'information_rate'
    },
    '<bps>': {
        aliases: ['bps'],
        equivalentUnitRepresentation: { numerator: ['<byte>'], denominator: ['<second>'] },
        scalar: 0.125,
        unitType: 'information_rate'
    },
    '<dollar>': {
        aliases: ['USD', 'dollar'],
        equivalentUnitRepresentation: { numerator: ['<dollar>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'currency'
    },
    '<cents>': { aliases: ['cents'], equivalentUnitRepresentation: { numerator: ['<dollar>'], denominator: ['<1>'] }, scalar: 0.01, unitType: 'currency' },
    '<candela>': {
        aliases: ['cd', 'candela'],
        equivalentUnitRepresentation: { numerator: ['<candela>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'luminosity'
    },
    '<lumen>': {
        aliases: ['lm', 'lumen'],
        equivalentUnitRepresentation: { numerator: ['<candela>', '<steradian>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'luminous_power'
    },
    '<lux>': {
        aliases: ['lux'],
        equivalentUnitRepresentation: { numerator: ['<candela>', '<steradian>'], denominator: ['<meter>', '<meter>'] },
        scalar: 1,
        unitType: 'illuminance'
    },
    '<watt>': {
        aliases: ['W', 'watt', 'watts'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>', '<meter>', '<meter>'], denominator: ['<second>', '<second>', '<second>'] },
        scalar: 1,
        unitType: 'power'
    },
    '<volt-ampere>': {
        aliases: ['VA', 'volt-ampere'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>', '<meter>', '<meter>'], denominator: ['<second>', '<second>', '<second>'] },
        scalar: 1,
        unitType: 'power'
    },
    '<volt-ampere-reactive>': {
        aliases: ['var', 'Var', 'VAr', 'VAR', 'volt-ampere-reactive'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>', '<meter>', '<meter>'], denominator: ['<second>', '<second>', '<second>'] },
        scalar: 1,
        unitType: 'power'
    },
    '<horsepower>': {
        aliases: ['hp', 'horsepower'],
        equivalentUnitRepresentation: { numerator: ['<kilogram>', '<meter>', '<meter>'], denominator: ['<second>', '<second>', '<second>'] },
        scalar: 745.699872,
        unitType: 'power'
    },
    '<gray>': {
        aliases: ['Gy', 'gray', 'grays'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>'], denominator: ['<second>', '<second>'] },
        scalar: 1,
        unitType: 'radiation'
    },
    '<roentgen>': {
        aliases: ['R', 'roentgen'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>'], denominator: ['<second>', '<second>'] },
        scalar: 0.00933,
        unitType: 'radiation'
    },
    '<sievert>': {
        aliases: ['Sv', 'sievert', 'sieverts'],
        equivalentUnitRepresentation: { numerator: ['<meter>', '<meter>'], denominator: ['<second>', '<second>'] },
        scalar: 1,
        unitType: 'radiation'
    },
    '<becquerel>': {
        aliases: ['Bq', 'becquerel', 'becquerels'],
        equivalentUnitRepresentation: { numerator: ['<1>'], denominator: ['<second>'] },
        scalar: 1,
        unitType: 'radiation'
    },
    '<curie>': {
        aliases: ['Ci', 'curie', 'curies'],
        equivalentUnitRepresentation: { numerator: ['<1>'], denominator: ['<second>'] },
        scalar: 37000000000,
        unitType: 'radiation'
    },
    '<cpm>': {
        aliases: ['cpm'],
        equivalentUnitRepresentation: { numerator: ['<count>'], denominator: ['<second>'] },
        scalar: 0.016666666666666666,
        unitType: 'rate'
    },
    '<dpm>': {
        aliases: ['dpm'],
        equivalentUnitRepresentation: { numerator: ['<count>'], denominator: ['<second>'] },
        scalar: 0.016666666666666666,
        unitType: 'rate'
    },
    '<bpm>': {
        aliases: ['bpm'],
        equivalentUnitRepresentation: { numerator: ['<count>'], denominator: ['<second>'] },
        scalar: 0.016666666666666666,
        unitType: 'rate'
    },
    '<dot>': { aliases: ['dot', 'dots'], equivalentUnitRepresentation: { numerator: ['<each>'], denominator: ['<1>'] }, scalar: 1, unitType: 'resolution' },
    '<pixel>': {
        aliases: ['pixel', 'px'],
        equivalentUnitRepresentation: { numerator: ['<each>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'resolution'
    },
    '<ppi>': { aliases: ['ppi'], equivalentUnitRepresentation: { numerator: ['<pixel>'], denominator: ['<inch>'] }, scalar: 1, unitType: 'resolution' },
    '<dpi>': { aliases: ['dpi'], equivalentUnitRepresentation: { numerator: ['<dot>'], denominator: ['<inch>'] }, scalar: 1, unitType: 'typography' },
    '<cell>': {
        aliases: ['cells', 'cell'],
        equivalentUnitRepresentation: { numerator: ['<each>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'counting'
    },
    '<each>': { aliases: ['each'], equivalentUnitRepresentation: { numerator: ['<each>'], denominator: ['<1>'] }, scalar: 1, unitType: 'counting' },
    '<count>': { aliases: ['count'], equivalentUnitRepresentation: { numerator: ['<each>'], denominator: ['<1>'] }, scalar: 1, unitType: 'counting' },
    '<base-pair>': {
        aliases: ['bp', 'base-pair'],
        equivalentUnitRepresentation: { numerator: ['<each>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'counting'
    },
    '<nucleotide>': {
        aliases: ['nt', 'nucleotide'],
        equivalentUnitRepresentation: { numerator: ['<each>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'counting'
    },
    '<molecule>': {
        aliases: ['molecule', 'molecules'],
        equivalentUnitRepresentation: { numerator: ['<1>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'counting'
    },
    '<dozen>': {
        aliases: ['doz', 'dz', 'dozen'],
        equivalentUnitRepresentation: { numerator: ['<each>'], denominator: ['<1>'] },
        scalar: 12,
        unitType: 'prefix_only'
    },
    '<percent>': {
        aliases: ['%', 'percent'],
        equivalentUnitRepresentation: { numerator: ['<1>'], denominator: ['<1>'] },
        scalar: 0.01,
        unitType: 'prefix_only'
    },
    '<ppm>': { aliases: ['ppm'], equivalentUnitRepresentation: { numerator: ['<1>'], denominator: ['<1>'] }, scalar: 0.000001, unitType: 'prefix_only' },
    '<ppt>': { aliases: ['ppt'], equivalentUnitRepresentation: { numerator: ['<1>'], denominator: ['<1>'] }, scalar: 1e-9, unitType: 'prefix_only' },
    '<gross>': {
        aliases: ['gr', 'gross'],
        equivalentUnitRepresentation: { numerator: ['<dozen>', '<dozen>'], denominator: ['<1>'] },
        scalar: 144,
        unitType: 'prefix_only'
    },
    '<decibel>': {
        aliases: ['dB', 'decibel', 'decibels'],
        equivalentUnitRepresentation: { numerator: ['<decibel>'], denominator: ['<1>'] },
        scalar: 1,
        unitType: 'logarithmic'
    }
};

export const BASE_UNITS: string[] = [
    '<meter>',
    '<kilogram>',
    '<second>',
    '<mole>',
    '<ampere>',
    '<radian>',
    '<kelvin>',
    '<temp-K>',
    '<byte>',
    '<dollar>',
    '<candela>',
    '<each>',
    '<steradian>',
    '<decibel>'
];

export const UNITY = '<1>';
export const UNITY_ARRAY = [UNITY];

// Setup

/**
 * Asserts unit definition is valid
 *
 * @param {string} unitDef - Name of unit to test
 * @param {Object} definition - Definition of unit to test
 *
 * @returns {void}
 * @throws {QtyError} if unit definition is not valid
 */
function validateUnitDefinition(unitDef: string, definition: UnitDefinition) {
    const { scalar, equivalentUnitRepresentation } = definition;
    if (!isNumber(scalar)) {
        throw new QtyError(unitDef + ': Invalid unit definition. ' + "'scalar' must be a number");
    }

    if (!equivalentUnitRepresentation) return;

    equivalentUnitRepresentation.numerator.forEach(unit => {
        if (UNITS[unit] === undefined) {
            throw new QtyError(unitDef + ': Invalid unit definition. ' + 'Unit ' + unit + " in 'numerator' is not recognized");
        }
    });

    equivalentUnitRepresentation.denominator.forEach(unit => {
        if (UNITS[unit] === undefined) {
            throw new QtyError(unitDef + ': Invalid unit definition. ' + 'Unit ' + unit + " in 'denominator' is not recognized");
        }
    });
}

export const PREFIX_VALUES: RegularObject<number> = {};
export const PREFIX_MAP: RegularObject<string> = {};
export const UNIT_VALUES: RegularObject<ScalarAndUnit> = {};
export const UNIT_MAP: RegularObject<string> = {};
export const OUTPUT_MAP: RegularObject<string> = {};
for (const unitDef in UNITS) {
    if (UNITS.hasOwnProperty(unitDef)) {
        const definition = UNITS[unitDef];
        if (definition.unitType === 'prefix') {
            PREFIX_VALUES[unitDef] = definition.scalar;
            for (const prefixAlternative of definition.aliases) {
                PREFIX_MAP[prefixAlternative] = unitDef;
            }
        } else {
            validateUnitDefinition(unitDef, definition);
            UNIT_VALUES[unitDef] = {
                scalar: definition.scalar,
                numerator: definition.equivalentUnitRepresentation ? definition.equivalentUnitRepresentation.numerator : undefined,
                denominator: definition.equivalentUnitRepresentation ? definition.equivalentUnitRepresentation.denominator : undefined
            };
            for (const unitAlternative of definition.aliases) {
                UNIT_MAP[unitAlternative] = unitDef;
            }
        }
        OUTPUT_MAP[unitDef] = definition.aliases[0];
    }
}

/**
 * Returns a list of available units of kind
 *
 * @param {string} [kind] - kind of units
 * @returns {array} names of units
 * @throws {QtyError} if kind is unknown
 */
export function getUnits(kind?: string): string[] {
    const units = [];
    const unitKeys = Object.keys(UNITS);
    if (typeof kind === 'undefined') {
        for (const unitKey of unitKeys) {
            if (['', 'prefix'].indexOf(UNITS[unitKey].unitType) === -1) {
                units.push(unitKey.substr(1, unitKey.length - 2));
            }
        }
    } else if (this.getKinds().indexOf(kind) === -1) {
        throw new QtyError('Kind not recognized');
    } else {
        for (const unitKey of unitKeys) {
            if (UNITS[unitKey].unitType === kind) {
                units.push(unitKey.substr(1, unitKey.length - 2));
            }
        }
    }

    return units.sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
        }
        return 0;
    });
}

/**
 * Returns a list of alternative names for a unit
 *
 * @param {string} unitName - name of unit
 * @returns {string[]} aliases for unit
 * @throws {QtyError} if unit is unknown
 */
export function getAliases(unitName: string): string[] {
    if (!UNIT_MAP[unitName]) {
        throw new QtyError('Unit not recognized');
    }
    return UNITS[UNIT_MAP[unitName]].aliases;
}

/**
 * @param {string} unit
 * @returns {boolean} is unit a prefix
 */
export function isPrefix(unit: string): boolean {
    return !!PREFIX_VALUES[unit];
}
