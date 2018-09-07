import * as React from 'react';
import LoginForm from '../forms/LoginForm';
import { connect } from 'react-redux';
import { login } from '../state/actions/auth'; 
import { Container } from 'semantic-ui-react';

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
        return (
            <Container id="centralContainer">             
                <h1>Welcome back !</h1>
                <LoginForm submit={this.submit} />
            </Container>
        );
    }
}

export default connect<{}, any>(null, { login })(LoginPage);