import * as React from 'react';

import { FullScreen } from '@components/layouts/FullScreen';
import { LoginForm } from '@containers/LoginForm';

export function Login(): JSX.Element {
  return (
    <FullScreen>
      <LoginForm />
    </FullScreen>
  );
}
