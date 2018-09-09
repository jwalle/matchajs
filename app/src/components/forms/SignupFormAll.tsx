import * as React from 'react';
import { Form, FormGroup, Button, Container } from 'semantic-ui-react';
import * as moment from 'moment';
import * as Validator from 'validator';
import Danger from '../messages/Message';
import { signup } from '../state/actions/auth';
import SignupForm1 from './SignupForm1';
import SignupForm2 from './SignupForm2';
import SignupForm3 from './SignupForm3';
import * as formTypes from './formTypes'; 

export interface SignupFormProps {
    submit: Function;
}

export interface SignupFormState {
    currentStep: string;
    data: formTypes.UserData;
    loading: boolean;
}

export default class SignupFormAll extends React.Component < SignupFormProps, SignupFormState > {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            currentStep: 'intro',
            // currentStep: 'intro',
            data: {
                gender: 'F',
                orientation: 'S',
                // birthday: moment('1987-01-19'), // TODO: should this be null ?
                birthday: {
                    month: '',
                    day: '',
                    year: 1987,
                },
                country: '',
                city: '',
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                passwordVerif: ''
            },
            loading: false,
        };
    }

    updateData = (data: formTypes.UserData) => this.setState({
        data
    })

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
            return <SignupForm3 data={this.state.data} setStep={this.setStep} submit={this.props.submit} />;
            default:
                return <h1>Error</h1>;
        }
    }
}
