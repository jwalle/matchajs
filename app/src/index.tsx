import * as React from 'react';
import { render } from 'react-dom';
import { AppRouter } from './AppRouter';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { userLoggedIn } from './actions/auth';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.matchaJWT) {
    const user = { token: localStorage.matchaJWT};
    store.dispatch(userLoggedIn(user));
}

render((
    <BrowserRouter>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </BrowserRouter>
    ), document.getElementById('root')as HTMLElement);