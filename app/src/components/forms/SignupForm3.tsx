import * as React from 'react';
import { Form, FormGroup, Button } from 'semantic-ui-react';
import * as Validator from 'validator';
import Danger from '../messages/Message';

export interface SignupFormProps {
    setStep: Function;    
    submit: Function;
    data: any;
}

export interface SignupFormState3 {
    data: {
        email: string,
        password: string,
        passwordVerif: string,
    };
    loading: boolean;
    term: boolean;
    errors: {
        email: string;
        password: string;
        global: string;
        term: string;
    };
}

export default class SignupForm extends React.Component < SignupFormProps, SignupFormState3 > {
    constructor(props: SignupFormProps) {
        super(props);
        console.log(this.props.data);
        this.state = {
            data : {
                ...this.props.data
            },
            loading: false,
            term: false,
            errors: {
                email: '',
                password: '',
                term: '',
                global: ''                
            }
        };
    }

    onChange = (e: any) => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }  
    })

    onSubmit = (e: any) => {
        e.preventDefault();
        const errors: any = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0 ) {
            this.setState({loading: true});
            this.props.submit(this.state.data)
            .catch((err: any) => this.setState({errors: err.response.data.errors, loading: false }));
        }
    }

    onPrevious = () => {
        this.props.setStep('detail');
    }

    onChangeTerm = () => {
        this.setState({ term: !!this.state.term });
        console.log('term = ', this.state.term);
    }

    validate = (data: SignupFormState3['data']) => {
        const errors: any = {};
        if (!Validator.isEmail(data.email)) { errors.email = 'invalid email'; }
        if (!data.password) { errors.password = 'You have to enter a password'; }
        if (!data.passwordVerif) { errors.password = 'You have to re-enter your password'; }
        if (data.password !== data.passwordVerif) {errors.password = 'the verification password is different'; }
        // if (!this.state.term) {errors.term = 'You must accept the Terms !!'; }

        // TODO : Add more validation (strlen, complex password,...)
        return errors;
    }

    render() {

        const {data, errors, loading} = this.state;
        return (
            <div>
            <h1 style={{color: 'white'}}>You are : {this.props.data.gender} and {this.props.data.orientation}</h1>
            <h1 style={{color: 'white'}}>
            You are {this.props.data.username} from : {this.props.data.country}, {this.props.data.city}
            </h1>
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.global && <Danger title="Global error" text="Something went wrong" />}
                    <Form.Field error={!!errors.email}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email here"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <Danger title="Email" text={errors.email} />}
                    </Form.Field>       
                    <Form.Field error={!!errors.password}>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password here"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    </Form.Field>
                    <Form.Field error={!!errors.password}>
                    <input
                        type="password"
                        id="passwordVerif"
                        name="passwordVerif"
                        placeholder="Confirm your password"
                        value={data.passwordVerif}
                        onChange={this.onChange}
                    />
                    {errors.password && <Danger title="Password" text={errors.password} />} 
                    </Form.Field>
                    {errors.term && <Danger title="term" text={errors.term} />}                     
                    <Form.Checkbox
                        label="I agree to the Terms and Conditions" 
                        onChange={this.onChangeTerm}
                    />
                <Button primary onClick={this.onPrevious}>Back</Button>
                <Button primary>Login</Button>
            </Form>
            </div>            
        );
    }
}
