import clsx from 'clsx';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from '@src/store/hooks';
import { sessionActions, sessionSelectors } from '@src/store/session';

export function LoginForm(): JSX.Element {
  const dispatch = useDispatch();
  const status = useSelector(sessionSelectors.fetchStatus);
  const error = useSelector(sessionSelectors.error);

  const [input, setInput] = React.useState('');

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();

      dispatch(sessionActions.fetchRequest(input));
    },
    [dispatch, input]
  );

  return (
    <div className={styles.container}>
      <form
        data-testid="login-form"
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          data-testid="login-password"
          className={styles.text}
          type="password"
          placeholder="Enter password"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <input
          data-testid="login-submit"
          className={styles.submit}
          type="submit"
          disabled={status === 'fetching'}
        />
      </form>
      <div data-testid="login-error" className={styles.error}>
        {error ? error.message : ''}
      </div>
    </div>
  );
}

const styles = {
  container: clsx(
    'absolute',
    'inset-0',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'bg-gray-500'
  ),
  form: clsx('bg-transparent', 'border', 'border-black', 'rounded', 'p-2'),
  text: clsx('bg-transparent', 'focus:outline-black', 'mx-2'),
  submit: clsx('bg-transparent', 'mx-2', 'focus:outline-black'),
  error: clsx(
    'text-red-800',
    'text-sm',
    'flex',
    'justify-center',
    'items-center',
    'h-4'
  ),
};
