import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FirstLogin, FirstLoginProps } from '../pages/FirstLoginPage';

interface UserRouteProps {
    component: any;
    firstLogin?: boolean;
    exact?: boolean;
    path: string;
    isAuth?: boolean; // isRequired but bool is set here.
}

const UserRoute: React.SFC<UserRouteProps> = ({isAuth, firstLogin, component, ...rest}) => {
  return (
      (firstLogin && isAuth) ?
      <Redirect to="/first" />
      : <Route
       {...rest}
       render={props =>
            isAuth ? React.createElement(component, props) : <Redirect to="/"/>} 
      />
  ) ;
};

function mapStateToProps(state: any) {
    return {
      isAuth: !!state.user.token,
      firstLogin: !!state.user.user.firstLogin
    };
  }
  
export default connect<any, any>(mapStateToProps)(UserRoute);