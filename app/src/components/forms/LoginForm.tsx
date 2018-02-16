import * as React from 'react';
import { Form, Button, FormGroup, FormControl, Alert, HelpBlock, ControlLabel } from 'react-bootstrap';
import * as Validator from 'validator';

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
       // if (!Validator.isEmail(data.email)) { errors.email = 'invalid email'; }
        if (!data.password) { errors.password = 'can\'t be blank'; }
        return errors;
    }

    render() {

        let alertBlock = (errorName: any, error: any) => {
            return(
            <Alert bsStyle="danger">
                <h4>{errorName}</h4>
                <p>{error}</p>
            </Alert>
        );
    };

        const {data, errors} = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                {errors.global && alertBlock('Something went wrong', errors.global)}
                <FormGroup validationState={errors.email ? 'error' : null} >
                    <ControlLabel htmlFor="email">email</ControlLabel>
                    <FormControl
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && alertBlock('email', errors.email)}
                    <FormControl
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && alertBlock('password', errors.password)}                    
                <Button onClick={this.onSubmit}>Login</Button>
                </FormGroup>
            </Form>
        );
    }
}
