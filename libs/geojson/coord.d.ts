import { FourOrMore, TwoOrMore } from './array';

export type Position = TwoOrMore<number>;

export type CoordPoint = Position;
export type CoordMultiPoint = Position[];
export type CoordLineString = TwoOrMore<Position>;

// Technically the first and last positions must be equivalent,
// but this is not representable with pure static typing
export type CoordLinearRing = FourOrMore<Position>;

export type CoordMultiLineString = CoordLineString[];
export type CoordPolygon = CoordLinearRing[];
export type CoordMultiPolygon = CoordPolygon[];
