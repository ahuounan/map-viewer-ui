import {
  CoordLinearRing,
  CoordLineString,
  CoordMultiPoint,
  CoordMultiPolygon,
  CoordPoint,
  CoordPolygon,
} from './coord';

export type Geometry =
  | GeometryPoint
  | GeometryMultiPoint
  | GeometryLineString
  | GeometryLinearRing
  | GeometryPolygon
  | GeometryMultiPolygon;

export interface GeometryPoint {
  type: 'Point';
  coordinates: CoordPoint;
}
export interface GeometryMultiPoint {
  type: 'MultiPoint';
  coordinates: CoordMultiPoint;
}
export interface GeometryLineString {
  type: 'LineString';
  coordinates: CoordLineString;
}
export interface GeometryLinearRing {
  type: 'LinearRing';
  coordinates: CoordLinearRing;
}
export interface GeometryPolygon {
  type: 'Polygon';
  coordinates: CoordPolygon;
}
export interface GeometryMultiPolygon {
  type: 'MultiPolygon';
  coordinates: CoordMultiPolygon;
}
