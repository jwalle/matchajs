import * as React from 'react';
import { Router } from 'react-router';
import { HashRouter, Route , Switch } from 'react-router-dom';
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

export class AppRouter extends React.Component<{}> {

    render() {
        return(
            <HashRouter>
                    <App isAuth>
                        <Switch>
                            <Route exact path="/" component={ContentPage} />
                            <GuestRoute exact path="/login" component={LoginPage}/>
                            <Route exact path="/signup" component={SignupPage}/>
                            {/* Signup should be guestRoute */}
                            <Route path="/user/:idUser" component={UserPage}/>
                            <UserRoute exact path="/dashboard" component={DashboardPage}/>
                            <UserRoute exact path="/profile" component={ProfilePage}/>
                            <Route component={NotFoundPage} />
                        </Switch>
                    </App>
            </HashRouter>
        );
     }
}