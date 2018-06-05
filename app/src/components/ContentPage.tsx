import * as React from 'react';
import axios from 'axios';
import Discovery from './discoveryContent/discovery';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
require('./styles/ContentPage.css');
const localeIp = '/api';

export interface ContentPageProps {
  isAuth: boolean;
  logout: any;
}

class ContentPage extends React.Component<ContentPageProps, {}> {
  constructor(props: any) {
    super(props);

    this.makeUser = this.makeUser.bind(this);
  }

  makeUser() {
    axios({
      method: 'get',
      url: localeIp + '/makeUser/',
      responseType: 'json'
    }).catch(err => console.log('getLogin error : ' + err));
  }

  render() {
    return (
      <div className="main-front">
        <Discovery />
        <h1>Welcome</h1>
        {this.props.isAuth ?
         <button onClick={() => this.props.logout()}>Logout</button> :
         <Link to="/login">Login</Link>}
        <button className="btn btn-primary" style={{ float: 'left' }} onClick={() => this.makeUser()}>
          Make User
          </button>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isAuth: !!state.user.token
  };
}

export default connect<any, any>(mapStateToProps, {logout})(ContentPage);
