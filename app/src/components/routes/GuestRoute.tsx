import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface GuestRouteProps {
    component: any;
    exact?: boolean;
    path: string;
    isAuth?: boolean; // isRequired but bool is set here.
}

const GuestRoute: React.SFC<GuestRouteProps> = ({isAuth, component, ...rest}) => {
  return (
      <Route
       {...rest}
       render={props =>
            !isAuth ? React.createElement(component, props) : <Redirect to="/welcome"/>} 
      />
  ) ;
};

function mapStateToProps(state: any) {
    return {
      isAuth: !!state.user.token
    };
  }
  
export default connect<any, any>(mapStateToProps)(GuestRoute);