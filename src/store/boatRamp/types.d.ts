import { Feature, FeatureCollection, MultiPolygon, Point } from 'geojson';
import { LayerProps } from 'react-map-gl';

import { FetchedDataState } from '@libs/redux/templates/fetched';
import { NormalizedDataState } from '@libs/redux/templates/normalized';

export interface BoatRampState
  extends FetchedDataState,
    NormalizedDataState<Feature<Point, BoatRampProperties>> {
  filter: LayerProps['filter'] | null;
}

export type BoatRampFetchResponse = FeatureCollection<
  MultiPolygon,
  BoatRampProperties
>;

export interface BoatRampProperties {
  add_improv: unknown | null;
  area_: number | null;
  asset_numb: string | null;
  comments: string | null;
  condition: number | null;
  constructi: unknown | null;
  createdate: unknown | null;
  createuser: unknown | null;
  disposal_d: unknown | null;
  documents: string | null;
  drawing_nu: unknown | null;
  file_numbe: unknown | null;
  folder_num: unknown | null;
  funding_ba: string | null;
  historic_c: number | null;
  id: string | null;
  inspection: string | null;
  inspectors: unknown | null;
  last_updat: unknown | null;
  level_accu: unknown | null;
  material: string | null;
  mi_prinx: number | null;
  mi_symbolo: string | null;
  number_lan: number | null;
  owner: string | null;
  positional: string | null;
  project_nu: string | null;
  rec_id: number | null;
  record_cre: string | null;
  shape_area: number | null;
  shape_leng: number | null;
  status: string | null;
  survey_num: unknown | null;
  toe_rl: number | null;
  top_rl: number | null;
  type: string | null;
  update_dat: string | null;
  updatedate: unknown | null;
  updateuser: unknown | null;
}
