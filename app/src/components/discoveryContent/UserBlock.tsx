import * as React from 'react';
import moment = require('moment');
import { withRouter, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export interface UserBlockProps {
  user: any; // TODO : Types
}

export interface UserBlockState {
  hover: boolean;
}

export default class UserBlock extends React.Component<UserBlockProps, UserBlockState> {
  constructor(props: UserBlockProps) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  public render() {
    const { user } = this.props;
    let photo = undefined;
    let age = moment().diff(moment(user.dob), 'years');
    if (user.link) {
      photo = 'http://localhost:3000' + `/photos/${user.login}/${user.link}`;
    } else {
      photo = 'http://via.placeholder.com/200x200';
    }
    return (
      <Link to={'/user/' + user.id} className="user-block">
        <img src={photo} alt="user-image" />
        {user.friend ? <span><Icon className="LikedUser" color="yellow" name="star" size="big" /></span> : ''}
        <div className="lower-user-block">
          <h2>{user.login}</h2>
          <p>{age} • {user.city}</p>
        </div>
      </Link>
    );
  }
}
