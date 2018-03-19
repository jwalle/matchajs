import * as React from 'react';
import { Form, FormGroup, Button } from 'semantic-ui-react';
import * as Validator from 'validator';
import Danger from '../messages/Message';

export interface SignupFormProps {
    setStep: Function;
    updateData: Function;
    data: any;
}

export interface SignupFormState {
    data: {
        username: string,
        country: string,
        city: string
    };
    loading: boolean;
    errors: {
        global: string,
        username: string,
        country: string;
        city: string;
    };
}

export default class SignupForm2 extends React.Component < SignupFormProps, SignupFormState > {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            data: {
                ...this.props.data
                },
            loading: false,
            errors: {
                username: '',
                country : '',
                city: '',
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
            this.props.updateData(this.state.data);
            this.props.setStep('login');
        }
    }

    onPrevious = () => {
        this.props.setStep('intro');
    }

    validate = (data: SignupFormState['data']) => {
        const errors: any = {};
        if (!data.username) { errors.username = 'You have to enter your username !'; }
        if (!data.country) { errors.country = 'You have to enter a country !'; }
        if (!data.city) { errors.city = 'You have to enter your city !'; }
        // TODO : Add more validation (strlen, complex password,...)
        return errors;
    }

    render() {

        const {data, errors, loading} = this.state;

        return (
            <div>
            <h1>You are : {this.props.data.gender}</h1>
            
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
                    <Form.Field error={!!errors.country}>                              
                    <label htmlFor="country">Your country :</label>
                    <input
                        type="country"
                        id="country"
                        name="country"
                        placeholder="example@example.com"
                        value={data.country}
                        onChange={this.onChange}
                    />
                    {errors.country && <Danger title="Country" text={errors.country} />}                    
                    </Form.Field>
                    <Form.Field error={!!errors.city}>
                    <label htmlFor="city">Your city :</label>
                    <input
                        type="city"
                        id="city"
                        name="city"
                        placeholder="New York"
                        value={data.city}
                        onChange={this.onChange}
                    />
                    {errors.city && <Danger title="city" text={errors.city} />}
                    </Form.Field>
                <Button primary onClick={this.onPrevious}>Back</Button>
                <Button primary>Next</Button>
            </Form>
            </div>
        );
    }
}
