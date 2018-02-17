import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface UserRouteProps {
    component: any;
    exact?: boolean;
    path: string;
    isAuth?: boolean; // isRequired but bool is set here.
}

const UserRoute: React.SFC<UserRouteProps> = ({isAuth, component, ...rest}) => {
  return (
      <Route
       {...rest}
       render={props =>
            isAuth ? React.createElement(component, props) : <Redirect to="/"/>} 
      />
  ) ;
};

function mapStateToProps(state: any) {
    return {
      isAuth: !!state.user.token
    };
  }
  
export default connect<any, any>(mapStateToProps)(UserRoute);