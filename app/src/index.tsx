import * as React from 'react';
import { render } from 'react-dom';
import { AppRouter } from './AppRouter';

render((
    <AppRouter />
),  document.getElementById('root') as HTMLElement);