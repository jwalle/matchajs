import * as React from 'react';
import { Form, FormGroup, Button } from 'semantic-ui-react';
import * as Validator from 'validator';
import Danger from '../messages/Message';

export interface SignupFormProps {
    submit: Function;
}

export interface SignupFormState {
    data: {
        username: string,
        email: string,
        password: string,
        passwordVerif: string
    };
    loading: boolean;
    errors: {
        username: string,
        email: string;
        password: string;
        global: string;
    };
}

export default class SignupForm extends React.Component < SignupFormProps, SignupFormState > {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            data: {
                username: '',
                email: '',
                password: '',
                passwordVerif: ''
                },
            loading: false,
            errors: {
                username: '',
                email: '',
                password: '',
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

    validate = (data: SignupFormState['data']) => {
        const errors: any = {};
        if (!data.username) { errors.username = 'You have to enter your username'; }
        if (!Validator.isEmail(data.email)) { errors.email = 'invalid email'; }
        if (!data.password) { errors.password = 'You have to enter a password'; }
        if (!data.passwordVerif) { errors.password = 'You have to re-enter your password'; }
        if (data.password !== data.passwordVerif) {errors.password = 'the verification password is different'; }
        // TODO : Add more validation (strlen, complex password,...)
        return errors;
    }

    render() {

        const {data, errors, loading} = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>

                {errors.global && <Danger title="Global error" text="Something went wrong" />}
               
                <Form.Field error={!!errors.username}>
                    <label htmlFor="username">Username :</label>
                    <input
                        id="username"
                        name="username"
                        placeholder="toto420"
                        value={data.username}
                        onChange={this.onChange}
                    />
                    {errors.username && <Danger title="Username" text={errors.username} />}
                    </Form.Field>
                    <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Your email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <Danger title="Email" text={errors.email} />}
                    </Form.Field>       
                    <Form.Field error={!!errors.password}>                              
                    <label htmlFor="password">Your password :</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="example@example.com"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    </Form.Field>
                    <Form.Field error={!!errors.password}>                              
                    <label htmlFor="password">Your password :</label>
                    <input
                        type="password"
                        id="passwordVerif"
                        name="passwordVerif"
                        placeholder="example@example.com"
                        value={data.passwordVerif}
                        onChange={this.onChange}
                    />
                    {errors.password && <Danger title="Password" text={errors.password} />}                        
                    </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}
