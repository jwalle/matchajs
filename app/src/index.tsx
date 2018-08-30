import * as React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { AppRouter } from './components/routes/AppRouter';
import { Provider } from 'react-redux';
import './styles/styles.scss';
import configureStore from './components/state/store';
// import 'semantic-ui-css/semantic.min.css';
import { HashRouter } from 'react-router-dom';

const store = configureStore();

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