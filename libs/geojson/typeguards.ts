import {
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';

export function isGeometryCollection(
  geometry: Geometry
): geometry is GeometryCollection {
  return geometry.type === 'GeometryCollection';
}

export function isPoint(geometry: Geometry): geometry is Point {
  return geometry.type === 'Point';
}

export function isMultiPoint(geometry: Geometry): geometry is MultiPoint {
  return geometry.type === 'MultiPoint';
}

export function isLineString(geometry: Geometry): geometry is LineString {
  return geometry.type === 'LineString';
}

export function isMultiLineString(
  geometry: Geometry
): geometry is MultiLineString {
  return geometry.type === 'MultiLineString';
}

export function isPolygon(geometry: Geometry): geometry is Polygon {
  return geometry.type === 'Polygon';
}

export function isMultiPolygon(geometry: Geometry): geometry is MultiPolygon {
  return geometry.type === 'MultiPolygon';
}
