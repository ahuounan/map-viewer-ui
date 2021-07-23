import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from './store/types';


export function App(): JSX.Element {
  const dispatch = useDispatch();
  const state = useSelector<RootState, string>(state => 'test');

  return (
    <div className="text-lg">
      This is the app.
      {state}
      <button onClick={() => dispatch({ type: 'test', payload: 'test' })}>
        click
      </button>
    </div>
  );
}
