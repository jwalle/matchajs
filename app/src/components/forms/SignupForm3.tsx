import * as React from 'react';
import { Form } from 'semantic-ui-react';
import * as Validator from 'validator';
import FormName from './FormName';
import { Danger } from '../messages/Message';
import * as formTypes from './formTypes';

export interface SignupFormProps {
    setStep: Function;
    submit: Function;
    data: formTypes.UserData;
}

export interface SignupFormState3 {
    data: formTypes.UserData;
    loading: boolean;
    term: boolean;
    errors: formTypes.ErrorsForm;
}

export default class SignupForm extends React.Component<SignupFormProps, SignupFormState3> {
    constructor(props: SignupFormProps) {
        super(props);
        console.log(this.props.data);
        this.state = {
            data: {
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
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch((err: any) => this.setState({
                    errors: {
                        global: err
                    }
                }));
        }
    }

    onPrevious = () => {
        this.props.setStep('detail');
    }

    onChangeTerm = () => {
        this.setState({ term: !this.state.term });
        console.log('term = ', this.state.term);
    }

    onSelectName = (data: formTypes.UserData) => {
        this.setState({
            data: {
                ...this.state.data,
                firstname: data.firstname,
                lastname: data.lastname,
            }
        });
    }

    validate = (data: SignupFormState3['data']) => {
        const errors: any = {};
        if (!data.firstname || !data.lastname) { errors.name = 'You have to enter your name'; }
        if (!Validator.isEmail(data.email)) { errors.email = 'invalid email'; }
        if (!data.password) { errors.password = 'You have to enter a password'; }
        if (!data.passwordVerif) { errors.password = 'You have to re-enter your password'; }
        if (data.password !== data.passwordVerif) { errors.password = 'the verification password is different'; }
        if (!this.state.term) { errors.term = 'You must accept the Terms !!'; }

        // TODO : Add more validation (strlen, complex password,...)
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="flex-col login-form">
                    {errors.global && <Danger text="Something went wrong" /> && console.error(errors.global)}
                    <FormName data={data} errors={errors} updateName={this.onSelectName} />
                    <input
                        className="myInput"
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="your.email@example.com"
                        value={data.email}
                        style={{ width: '320px' }}
                        onChange={this.onChange}
                    />
                    {errors.email && <Danger title="Email" text={errors.email} />}
                    <div>
                        <label htmlFor="password">password :</label>
                        <div>
                            <input
                                className="myInput"
                                type="password"
                                autoComplete="new-password"
                                id="password"
                                name="password"
                                placeholder="6 characters minimum"
                                value={data.password}
                                style={{ width: '200px' }}
                                onChange={this.onChange}
                            />
                            <input
                                className="myInput"
                                type="password"
                                autoComplete="off"
                                id="passwordVerif"
                                name="passwordVerif"
                                placeholder="Confirm your password"
                                value={data.passwordVerif}
                                style={{ width: '200px' }}
                                onChange={this.onChange}
                            />
                        </div>
                        {errors.password && <Danger title="Password" text={errors.password} />}
                    </div>
                    <div style={{ paddingBottom: '15px' }}>
                        <input
                            type="checkbox"
                            id="terms"
                            name="subscribe"
                            value="newsletter"
                            onChange={this.onChangeTerm}
                        />
                        <label htmlFor="terms">I agree to the Terms and Conditions</label>
                    </div>
                    {errors.term && <Danger title="term" text={errors.term} />}
                    <div style={{ width: '80%', paddingTop: '15px' }}>
                        <button
                            style={{ float: 'left' }}
                            className="btn btn-cancel"
                            onClick={this.onPrevious}>Back</button>
                        <button
                            style={{ float: 'right' }}
                            className="btn btn-primary">Submit !</button>
                    </div>
                </form>
            </div>
        );
    }
}
