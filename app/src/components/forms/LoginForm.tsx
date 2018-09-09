import * as React from 'react';
import { Form, Button, FormGroup } from 'semantic-ui-react';
import * as Validator from 'validator';
import { Danger } from '../messages/Message';

export interface AppProps {
    submit: Function;
}

export interface AppState {
    data: {
        email: string,
        password: string
    };
    loading: boolean;
    errors: {
        email: string;
        password: string;
        global: string;
    };
}

export default class App extends React.Component < AppProps, AppState > {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            data: {
                email: '',
                password: '',
            },
            loading: false,
            errors: {
                email: '',
                password: '',
                global: '',
            }
        };
    }

    onChange = (e: any) => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }  
    })

    onSubmit = () => {
        const errors: any = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0 ) {
            this.setState({loading: true});
            this.props.submit(this.state.data);
        }
    }

    validate = (data: AppState['data']) => {
        const errors: any = {};
        if (!Validator.isEmail(data.email)) { errors.email = 'invalid email'; }
        if (!data.email) { errors.email = 'please enter an email adress'; }
        if (!data.password) { errors.password = 'invalid password'; }
        return errors;
    }

    render() {

        const {data, errors} = this.state;

        return (
            <form onSubmit={this.onSubmit} className="flex-column login-form">
                {errors.global && <Danger title="global" text={errors.global} />}
                <div style={{width: '100%'}}>
                    <label htmlFor="email">email :</label>
                    <input
                        className="myInput"
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"                        
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <Danger title="email" text={errors.email} />}
                </div>
                <div style={{width: '100%'}}>
                    <label htmlFor="password">password :</label>                    
                    <input
                        className="myInput"
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="password"
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <Danger title="Password" text={errors.password} />}  
                </div>
                <button className="btn btn-primary btn-login">Login</button>
            </form>
        );
    }
}
