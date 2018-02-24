import * as React from 'react';
import { Form, FormGroup, Button } from 'semantic-ui-react';
import * as Validator from 'validator';
import Danger from '../messages/Message';
import { signup } from '../../actions/auth';
import SignupForm1 from './SignupForm1';
import SignupForm2 from './SignupForm2';
import SignupForm3 from './SignupForm3';

export interface SignupFormProps {
    submit: Function;
}

export interface SignupFormState {
    currentStep: string;
    data: {
        country: string,
        city: string,
        gender: string,
        username: string,
        email: string,
        password: string,
        passwordVerif: string
    };
    loading: boolean;
}

export default class SignupFormAll extends React.Component < SignupFormProps, SignupFormState > {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            currentStep: 'intro',
            data: {
                gender: 'F',
                country: '',
                city: '',
                username: '',
                email: '',
                password: '',
                passwordVerif: ''
            },
            loading: false,
        };
    }

    updateData = (data: any) => this.setState({
        data
    })

    onChange = (e: any) => { this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }  
    });
}

    setStep = (currentStep: string) => {
        this.setState({ currentStep });
    }

    render() {
        switch (this.state.currentStep) {
            case 'intro':
            return <SignupForm1 data={this.state.data} setStep={this.setStep} updateData={this.updateData} />;
            case 'detail':
            return <SignupForm2 data={this.state.data} setStep={this.setStep} updateData={this.updateData} />;
            case 'login':
            return <SignupForm3 data={this.state.data} submit={this.props.submit} />;
            default:
                return <h1>Error</h1>;
        }
    }
}
