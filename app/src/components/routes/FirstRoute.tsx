import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface FirstRouteProps {
    component: any;
    firstLogin?: boolean;
    exact?: boolean;
    path: string;
    isAuth?: boolean; // isRequired but bool is set here.
}

const FirstRoute: React.SFC<FirstRouteProps> = ({isAuth, firstLogin, component, ...rest}) => {
  return (
      (firstLogin && isAuth) ?
      <Route {...rest}
       render={props => React.createElement(component, props)} />
        : <Redirect to="/"/>
  ) ;
};

function mapStateToProps(state: any) {
    return {
      isAuth: !!state.user.token,
      firstLogin: !!state.user.user.firstLogin
    };
  }
  
export default connect<any, any>(mapStateToProps)(FirstRoute);