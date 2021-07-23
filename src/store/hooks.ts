import { useDispatch as untypedUseDispatch } from 'react-redux';

import { Dispatch } from './types';

export const useDispatch = (): Dispatch => untypedUseDispatch<Dispatch>();
