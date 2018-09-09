import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FirstLogin, FirstLoginProps } from '../pages/FirstLoginPage';
import ConfirmPage, {} from '../pages/ConfirmPage';

interface UserRouteProps {
    component: any;
    firstLogin?: boolean;
    exact?: boolean;
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

const UserRoute: React.SFC<UserRouteProps> = ({isAuth, firstLogin, component, ...rest}) => {
  let confirmed = true;
  console.log(isAuth, firstLogin);
  if (!isAuth) {
    return <Redirect to="/" />;
  } else if (!confirmed) {
    return <Route {...rest} render={() => React.createElement(ConfirmPage)} />;
  } else if (firstLogin) {
    return <Redirect to="/first" />;
  } else {
    return <Route {...rest} render={props => React.createElement(component, props)} />;
  }
};

function mapStateToProps(state: any) {
    return {
      isAuth: !!state.user.token,
      firstLogin: !!state.user.user.firstLogin,
      user: state.user.user
    };
  }
  
export default connect<any, any>(mapStateToProps)(UserRoute);