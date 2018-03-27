import * as React from 'react';
import LoginForm from './forms/LoginForm';
import { connect } from 'react-redux';
import { login } from '../actions/auth'; 

export interface LoginPageProps {
    history: {
        push: Function;
    };
    login: Function;
}

class LoginPage extends React.Component<LoginPageProps, {}> {
    constructor(props: LoginPageProps) {
        super(props);
    }

    submit = (data: any) => this.props.login(data).then(() => this.props.history.push('/dashboard'));

    render() {
        console.log('YOU ARE HERE !');
        return (
            <div>
                <h1>Hi LginPage</h1>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}

export default connect<{}, any>(null, { login })(LoginPage);