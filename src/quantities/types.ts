import { Qty } from "..";

export interface RegularObject<T> {
    [key: string]: T;
};

export interface ScalarAndUnit {
    scalar: number;
    numerator: string[];
    denominator: string[];
}

export type UnitSource = Qty | string;
export type Source = UnitSource | number;