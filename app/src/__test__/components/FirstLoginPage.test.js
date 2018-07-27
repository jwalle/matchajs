import * as React from 'react';
import ReactDOM from 'react-dom';
import {FirstLogin} from '../../components/pages/FirstLoginPage';

describe('FirstLoginPage', () => {
    it('render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FirstLogin />, div);
    });
});