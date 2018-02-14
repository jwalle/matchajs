import * as React from 'react';
import LoginForm from './forms/LoginForm';

export interface LoginPageProps {
}

export interface LoginPageState {
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);

        this.state = {
        };
    }

    submit = (data: any) => {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
    }

    render() {

        return (
            <div className="container" >
                <h1>Hi LginPage</h1>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}