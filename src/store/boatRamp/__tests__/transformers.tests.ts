import { denormalize, normalize } from '../transformers';
import {
  BoatRampFeature,
  BoatRampFetchResponse,
  BoatRampProperties,
} from '../types';

const mockResponse: BoatRampFetchResponse = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'test1',
      properties: {} as BoatRampProperties,
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [1, 1, 1, 1],
              [1, 1, 1, 1],
              [1, 1, 1, 1],
              [1, 1, 1, 1],
            ],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      id: 'test2',
      properties: {} as BoatRampProperties,
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [2, 2, 2, 2],
              [2, 2, 2, 2],
              [2, 2, 2, 2],
              [2, 2, 2, 2],
            ],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      id: 'test3',
      properties: {} as BoatRampProperties,
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [3, 3, 3, 3],
              [3, 3, 3, 3],
              [3, 3, 3, 3],
              [3, 3, 3, 3],
            ],
          ],
        ],
      },
    },
  ],
};

const mockIds = ['test1', 'test2', 'test3', 'test4'];
const mockEntities: Record<string, BoatRampFeature> = {
  test1: {
    id: 'test1',
  } as BoatRampFeature,
  test2: {
    id: 'test2',
  } as BoatRampFeature,
  test3: {
    id: 'test3',
  } as BoatRampFeature,
  test4: {
    id: 'test4',
  } as BoatRampFeature,
};

describe('boatRamp transformer', () => {
  describe('normalize', () => {
    describe('with data', () => {
      const expectedIds = ['test1', 'test2', 'test3'];
      const { ids, entities } = normalize(mockResponse);
      it('should transform a BoatRampFetchResponse into normalized ids', () => {
        expect(ids).toEqual(expectedIds);
      });

      it('should create an entity for each feature', () => {
        for (const key of expectedIds) {
          expect(entities[key]).not.toBeNull();
          expect(entities[key].type).toEqual('Feature');
          expect(entities[key].id).toEqual(key);
        }
      });

      it('should create an id property for each feature', () => {
        for (const key of expectedIds) {
          expect(entities[key].properties.id).toEqual(key);
        }
      });

      it('should convert each MultiPolygon geometry into a Point', () => {
        for (let i = 0; i < expectedIds.length; i++) {
          const key = expectedIds[i];
          expect(entities[key].geometry).toEqual({
            type: 'Point',
            coordinates: [i + 1, i + 1],
          });
        }
      });
    });
    describe('empty data', () => {
      it('should return an empty array and empty object', () => {
        const { ids, entities } = normalize({
          type: 'FeatureCollection',
          features: [],
        } as BoatRampFetchResponse);
        expect(ids).toEqual([]);
        expect(entities).toEqual({});
      });
    });
  });

  describe('denormalize', () => {
    it('should transform a list of ids into full objects', () => {
      const result = denormalize(mockIds, mockEntities);

      expect(result).toEqual([
        {
          id: 'test1',
        },
        {
          id: 'test2',
        },
        {
          id: 'test3',
        },
        {
          id: 'test4',
        },
      ]);
    });
    it('should handle empty mockIds with mockEntities', () => {
      const result = denormalize([], mockEntities);
      expect(result).toEqual([]);
    });
    it('should handle mockIds with empty mockEntities', () => {
      const result = denormalize(mockIds, {});
      expect(result).toEqual([undefined, undefined, undefined, undefined]);
    });
  });
});
