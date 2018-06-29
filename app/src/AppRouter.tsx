import * as React from 'react';
import { Router } from 'react-router';
import { BrowserRouter, HashRouter, Route , Switch } from 'react-router-dom';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

import App from './components/App';

import NotFoundPage from './components/NotFoundPage';
import ContentPage from './components/ContentPage';
import UserPage from './components/userPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/dashboard';
import FirstLoginPage from './components/FirstLoginPage';

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