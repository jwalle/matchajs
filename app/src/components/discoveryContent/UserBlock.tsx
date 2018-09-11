import * as React from 'react';

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
    return (
      <div className="user-block">
        <img src={user.img} alt="user-image"/>
        <div className="lower-user-block">
            <h2>{user.login}</h2>
            <p>{user.age} • {user.location.city}</p>
        </div>
      </div>
    );
  }
}
