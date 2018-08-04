import * as React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { AppRouter } from './components/routes/AppRouter';
import { Provider } from 'react-redux';
import { userLoggedIn } from './components/state/actions/auth';
import './styles/styles.scss';
import configureStore from './components/state/store';
// import 'semantic-ui-css/semantic.min.css';
import { HashRouter } from 'react-router-dom';

const store = configureStore();

if (localStorage.matchaJWT) {
    const user = { token: localStorage.matchaJWT};
    store.dispatch(userLoggedIn(user));
}

const hotRender = (Component: any) => {
    render(
        <HashRouter>
            <Provider store={store}>
                <Component />
            </Provider>
        </HashRouter>
    ,   document.getElementById('root') as HTMLElement, );
};

hotRender(AppRouter);

if (module.hot) {
    module.hot.accept('./components/routes/AppRouter', () => {
        hotRender(AppRouter);
    });
}