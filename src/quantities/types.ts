import { Qty } from '..';

export interface RegularObject<T> {
    [key: string]: T;
}

export interface ScalarAndUnit {
    scalar: number;
    numerator: string[];
    denominator: string[];
}

export type UnitSource = Qty | string;
export type Source = UnitSource | number;

export interface UnitDefinition {
    aliases: string[];
    equivalentUnitRepresentation?: {
        numerator: string[];
        denominator: string[];
    };
    scalar: number,
    unitType: string;
}
