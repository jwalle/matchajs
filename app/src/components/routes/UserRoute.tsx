import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FirstLogin, FirstLoginProps } from '../pages/FirstLoginPage';
import ConfirmPage, { } from '../pages/ConfirmPage';
import LoadingPage from '../pages/LoadingPage';

interface UserRouteProps {
  component: any;
  firstLogin?: boolean;
  exact?: boolean;
  loading?: boolean;
  path: string;
  isAuth?: boolean; // isRequired but bool is set here.
}

// const UserRoute: React.SFC<UserRouteProps> = ({isAuth, firstLogin, component, ...rest}) => {
//   return (
//       (firstLogin && isAuth) ?
//       <Redirect to="/first" />
//       : <Route
//        {...rest}
//        render={props =>
//             isAuth ? React.createElement(component, props) : <Redirect to="/login"/>} 
//       />
//   ) ;
// };

const UserRoute: React.SFC<UserRouteProps> = ({ isAuth, firstLogin, loading, component, ...rest }) => {
  const confirmed = true;
  console.log(isAuth, firstLogin, loading);
  if (loading) {
    return <LoadingPage />;
  }
  if (!isAuth) {
    return <Redirect to="/" />;
  }
  if (!confirmed) {
    return <Route {...rest} render={() => React.createElement(ConfirmPage)} />;
  }
  if (firstLogin) {
    return <Redirect to="/first" />;
  }
  return <Route {...rest} render={props => React.createElement(component, props)} />;
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