import * as React from 'react';
import { Router } from 'react-router';
import { BrowserRouter, HashRouter, Route , Switch } from 'react-router-dom';
import UserRoute from './UserRoute';
import GuestRoute from './GuestRoute';

import App from '../App';

import NotFoundPage from '../pages/NotFoundPage';
import ContentPage from '../pages/ContentPage';
import UserPage from '../pages/userPage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../misc/dashboard';
import FirstLoginPage from '../pages/FirstLoginPage';

export class AppRouter extends React.Component<{}> {

    render() {
        return(
            <App isAuth>
                <Switch>
                    <Route exact path="/user/:idUser" component={UserPage}/>
                    <GuestRoute exact path="/login" component={LoginPage}/>
                    <GuestRoute exact path="/signup" component={SignupPage}/>
                    <UserRoute path="/dashboard" component={DashboardPage}/>
                    <UserRoute path="/profile" component={ProfilePage}/>
                    <UserRoute path="/first" component={FirstLoginPage}/>
                    <Route exact path="/" component={ContentPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </App>
        );
     }
}