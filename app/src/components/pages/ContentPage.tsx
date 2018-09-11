import * as React from 'react';
import axios from 'axios';
import Discovery from '../discoveryContent/discovery';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../state/actions/auth';
// const localeIp = '/api';

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
      url: '/api/makeUser/',
      responseType: 'json'
    }).catch(err => console.log('getLogin error : ' + err));
  }

  render() {
    return (
      <div className="main-front">
        <div className="main-grid">
          <h1 className="disco-title liked-title"><span>Profiles you liked</span></h1>
          <Discovery class="liked-profiles" />
          <h1 className="disco-title new-title"><span>New Profiles</span></h1>
          <Discovery class="new-profiles" />
        </div>
        <h1>Welcome</h1>
        <button onClick={() => this.props.logout()}>Logout</button>
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
