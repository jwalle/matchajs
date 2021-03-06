import * as React from 'react';
import SignupFormAll from '../forms/SignupFormAll';
import { connect } from 'react-redux';
import { signup } from '../state/actions/auth';
import NavigationRightGuest from '../NavigationBar/NavigationRightGuest';

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

  submit = (data: any) => this.props.signup(data).then(() => this.props.history.push('/'));

  render() {
    return (
      <div>
        <h1 id="logo" className="navLogo"><a href="/">MATCHA</a></h1>
        <NavigationRightGuest />
        <div id="centralContainer">
          <SignupFormAll submit={this.submit} />
        </div>
      </div>
    );
  }
}

export default connect<{}, any>(null, { signup })(SignupPage);