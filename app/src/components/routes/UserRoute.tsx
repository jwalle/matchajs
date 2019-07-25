import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FirstLogin, FirstLoginProps } from '../pages/FirstLoginPage';
import ConfirmPage, { } from '../pages/ConfirmPage';

interface UserRouteProps {
  component: any;
  firstLogin?: boolean;
  exact?: boolean;
  loading?: boolean;
  path: string;
  isAuth?: boolean; // isRequired but bool is set here.
}

const UserRoute: React.SFC<UserRouteProps> = ({ isAuth, firstLogin, loading, component: Component, ...rest }) => {
  const confirmed = true;
  console.log(isAuth, firstLogin, loading, rest.path); 
  // if (loading) {
  //   return <LoadingPage />;
  // }
  // if (!confirmed) {
  //   return <Route {...rest} render={() => React.createElement(ConfirmPage)} />;
  // }
  return <Route {...rest} render={props => isAuth ? <Component {...props}/> : <Redirect to="/#/" />} />;
};

function mapStateToProps(state: any) {
  return {
    loading: state.user.loading,
    isAuth: !!state.user.token,
    firstLogin: !!state.user.user.firstLogin,
    user: state.user.user
  };
}

export default connect<any, any>(mapStateToProps)(UserRoute);