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

export interface LoginPageState {
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);

        this.state = {
        };
    }

    submit = (data: any) => this.props.login(data).then(() => this.props.history.push('/'));

    render() {

        const loginStyle = {
            gridColumn: '2/3'
        };

        return (
            <div className="container" style={loginStyle}>
                <h1>Hi LginPage</h1>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}

export default connect<{}, any>(null, { login })(LoginPage);