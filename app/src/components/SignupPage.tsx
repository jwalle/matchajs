import * as React from 'react';
import SignupForm from './forms/SignupFormAll';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
require('./SignupPage.css');

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
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

export default connect<{}, any>(null, { signup })(SignupPage);