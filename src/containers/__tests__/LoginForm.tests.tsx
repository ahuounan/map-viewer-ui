import * as React from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from '@src/store/hooks';
import {
  sessionActions as _sessionActions,
  sessionSelectors as _sessionSelectors,
} from '@src/store/session';
import { fireEvent, queryByTestId, render } from '@testing-library/react';

import { LoginForm } from '../LoginForm';

const fetchRequestAction = {};
const fetchRequestActionCreator = () => fetchRequestAction;
const fetchStatusSelector = 'fetchStatusSelector';
const errorSelector = 'errorSelector';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('@src/store/hooks', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('@src/store/session', () => ({
  sessionActions: {
    fetchRequest: fetchRequestActionCreator,
  },
  sessionSelectors: {
    fetchStatus: fetchStatusSelector,
    error: errorSelector,
  },
}));

function setup(
  status: 'idle' | 'fetching' | null,
  error: { message: string } | null,
  dispatch: jest.Mock
) {
  (useSelector as jest.Mock).mockImplementation(selector => {
    if (selector === fetchStatusSelector) {
      return status;
    }
    if (selector === errorSelector) {
      return error;
    }
  });

  (useDispatch as jest.Mock).mockImplementation(() => dispatch);
}

describe('LoginForm', () => {
  it('should render a login form with text input and submit button', () => {
    const dispatch = jest.fn();
    setup(null, null, dispatch);

    const { container } = render(<LoginForm />);

    const form = queryByTestId(container, 'login-form');
    const password = queryByTestId(container, 'login-password');
    const submit = queryByTestId(container, 'login-submit');

    expect(form).toBeVisible();
    expect(password).toBeVisible();
    expect(submit).toBeVisible();
  });

  it('should update password input value as the user types in it', () => {
    const dispatch = jest.fn();
    setup(null, null, dispatch);

    const { container } = render(<LoginForm />);

    const password = queryByTestId(container, 'login-password');

    expect(password).not.toBe(null);
    const value = 'testtest';
    fireEvent.change(password as HTMLElement, {
      target: { value },
    });

    expect(password).toHaveAttribute('value', value);
  });

  it('should dispatch a session fetchRequest action when submit button clicked', () => {
    const dispatch = jest.fn();
    setup(null, null, dispatch);

    const { container } = render(<LoginForm />);

    const submit = queryByTestId(container, 'login-submit');

    expect(submit).not.toBe(null);
    fireEvent.click(submit as HTMLElement);

    expect(dispatch).toHaveBeenCalledWith(fetchRequestAction);
  });
  it('should disable the submit button when fetch status is fetching', () => {
    const dispatch = jest.fn();
    setup('fetching', null, dispatch);

    const { container } = render(<LoginForm />);

    const submit = queryByTestId(container, 'login-submit');

    expect(submit).toBeDisabled();
  });
  it('should show an error message when session returns with error', () => {
    const dispatch = jest.fn();
    const message = 'error';
    setup(null, { message }, dispatch);

    const { container } = render(<LoginForm />);

    const error = queryByTestId(container, 'login-error');

    expect(error).toHaveTextContent(message);
  });
});
