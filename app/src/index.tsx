import * as React from 'react';
import { render } from 'react-dom';
import { AppRouter } from './AppRouter';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render((
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    ), document.getElementById('root')as HTMLElement);