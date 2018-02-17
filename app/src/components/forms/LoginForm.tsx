import * as React from 'react';
import { Form, Button, FormGroup } from 'semantic-ui-react';
import * as Validator from 'validator';
import { Danger, Info } from '../messages/Message';

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
                password: ''            },
            loading: false,
            errors: {
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

    onSubmit = () => {
        const errors: any = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0 ) {
            this.setState({loading: true});
            this.props.submit(this.state.data)
            .catch((err: any) => this.setState({errors: err.response.data.errors, loading: false }));
        }
    }

    validate = (data: AppState['data']) => {
        const errors: any = {};
        if (!Validator.isEmail(data.email)) { errors.email = 'invalid email'; }
        if (!data.password) { errors.password = 'can\'t be blank'; }
        return errors;
    }

    render() {

        const {data, errors, loading} = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.global && <Danger title="global" text={errors.global} />}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <Danger title="email" text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">password :</label>                    
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <Danger title="Password" text={errors.password} />}  
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}
