import * as React from 'react';
import SignupForm from './forms/SignupFormAll';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
require('./SignupPage.css');
let backGround = require('../../public/images/signupBackground.jpeg');

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
      <div style={{backgroundImage: `url(${backGround})`}}>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

export default connect<{}, any>(null, { signup })(SignupPage);