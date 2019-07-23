import * as React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import UserRoute from './UserRoute';
import FirstRoute from './FirstRoute';
import GuestRoute from './GuestRoute';
import { loginFromToken } from '../state/actions/auth';

import App from '../App';

import NotFoundPage from '../pages/NotFoundPage';
import ContentPage from '../pages/ContentPage';
import userPage from '../pages/userPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import dashboard from '../misc/dashboard';
import FirstLoginPage from '../pages/FirstLoginPage';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';

export class AppRouter extends React.Component<{}> {

    render() {
        // TODO: remove loginFromtoken ? TS props problem 
        return (
            <App isAuth loading loginFromToken={loginFromToken}>
                <Switch>
                    <GuestRoute exact path="/" component={HomePage} />
                    <FirstRoute path="/first" component={FirstLoginPage} />
                    <UserRoute path="/welcome" component={ContentPage} />
                    {/* <UserRoute path="/welcome" component={SearchPage}/> */}
                    <UserRoute path="/search" component={SearchPage} />
                    <UserRoute path="/user/:idUser" component={userPage} />
                    <UserRoute path="/dashboard" component={dashboard} />
                    <UserRoute path="/profile" component={ProfilePage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </App>
        );
    }
}