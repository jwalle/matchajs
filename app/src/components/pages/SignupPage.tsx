import * as React from 'react';
import SignupForm from '../forms/SignupFormAll';
import { connect } from 'react-redux';
import { signup } from '../state/actions/auth';
import NavigationRightGuest from '../navigationBar/navigationRightGuest';

export interface SignupPageProps {
    history: {
        push: Function;
    };
    signup: Function;
}

class SignupPage extends React.Component<SignupPageProps, {}> {
  constructor(props: SignupPageProps) {
    super(props);
  }

    submit = (data: any) => this.props.signup(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h1 id="logo" className="navLogo"><a href="/">MATCHA</a></h1>
        <NavigationRightGuest />
        <div id="centralContainer"> 
          <SignupForm submit={this.submit} />
        </div>
      </div>
    );
  }
}

export default connect<{}, any>(null, { signup })(SignupPage);