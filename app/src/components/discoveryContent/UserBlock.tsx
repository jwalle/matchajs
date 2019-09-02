import * as React from 'react';
import moment = require('moment');
import { withRouter, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { getAge } from '../../helpers/userTools';
import { getUserProfil } from '../../helpers/photosTools';

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
    let photo = getUserProfil(user);
    let age = getAge(user.info.dob);
    return (
      <Link to={{ pathname: '/user/' + user.id, state: user }} className="user-block">
        <img src={photo} alt="user-image" />
        {user.relation === 1 ? <span><Icon className="LikedUser" color="yellow" name="star" size="big" /></span> : ''}
        <div className="lower-user-block">
          <h2>{user.info.login}</h2>
          <p>{age} • {user.info.city}</p>
        </div>
      </Link>
    );
  }
}
