import * as React from 'react';
import { render } from 'react-dom';
import { AppRouter } from './components/routes/AppRouter';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './components/state/reducers/rootReducer';
import { userLoggedIn } from './components/state/actions/auth';
import './styles/styles.scss';
// import 'semantic-ui-css/semantic.min.css';
import { HashRouter } from 'react-router-dom';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.matchaJWT) {
    const user = { token: localStorage.matchaJWT};
    store.dispatch(userLoggedIn(user));
}

render((
    <HashRouter>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </HashRouter>
    ), document.getElementById('root')as HTMLElement);