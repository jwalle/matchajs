import * as React from 'react';
import axios from 'axios';
import Discovery from '../discoveryContent/discovery';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../state/actions/auth';
import api from '../../services/api';
import { Loader } from 'semantic-ui-react';
import LoadingPage from './LoadingPage';
// const localeIp = '/api';

export interface ContentPageProps {
  isAuth: boolean;
  logout: any;
}

interface State {
  newUsers: any;
  likedUsers: any;
  newUsersLoading: boolean;
  likedUsersLoading: boolean;
}

class ContentPage extends React.Component<ContentPageProps, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      newUsers: undefined,
      likedUsers: undefined,
      newUsersLoading: true,
      likedUsersLoading: true,
    };
  }

  getLikedUsers = () => {
    api.user.getLikedUsers()
      .then((res) => this.setState({ likedUsers: res, likedUsersLoading: false }))
      .catch((err) => console.log(err));
  }

  getNewUsers = () => {
    api.user.getNewUsers()
      .then((res) => this.setState({ newUsers: res, newUsersLoading: false }))
      .catch((err) => console.log(err));
  }

  componentWillMount() {
    this.getLikedUsers();
    this.getNewUsers();
  }

  makeUser = () => {
    axios({
      method: 'get',
      url: '/api/user/makeUser/',
      responseType: 'json'
    }).catch(err => console.log('getLogin error : ' + err));
  }

  render() {
    const {newUsers, likedUsers, newUsersLoading, likedUsersLoading} = this.state;
    if (newUsersLoading || likedUsersLoading) { return <LoadingPage />; }
    return (
      <div className="main-front">
        <div className="main-grid">
          <h1 className="disco-title new-title"><span>New Profiles</span></h1>
          <Discovery class="new-profiles" users={newUsers} />
          <h1 className="disco-title liked-title"><span>Profiles you liked</span></h1>
          <Discovery class="liked-profiles" users={likedUsers} />
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

export default connect<any, any>(mapStateToProps, { logout })(ContentPage);
