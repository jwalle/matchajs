import * as React from 'react';
import { Router } from 'react-router';
import { HashRouter, Route , Switch } from 'react-router-dom';

import App from './components/App';

import NotFoundPage from './components/NotFoundPage';
import ContentPage from './components/ContentPage';
import UserPage from './components/userPage';
import LoginPage from './components/LoginPage';

export class AppRouter extends React.Component<{}> {

    render() {
        return(
            <HashRouter>
                    <App>
                        <Switch>
                            <Route exact path="/" component={ContentPage} />
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/user/:idUser" component={UserPage}/>
                            <Route component={NotFoundPage} />
                        </Switch>
                    </App>
            </HashRouter>
        );
     }
}