import * as React from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { Danger } from '../messages/Message';
import FormDate from './FormDate';
import FormLocation from './FormLocation';
import * as Moment from 'moment';
import * as formTypes from './formTypes';

export interface SignupFormProps {
    setStep?: Function;
    updateData: Function;
    data: formTypes.UserData;
}

export interface SignupFormState {
    data: formTypes.UserData;
    birthdayMoment: Moment.Moment;
    loading: boolean;
    errors: formTypes.ErrorsForm;
}

export default class SignupForm2 extends React.Component<SignupFormProps, SignupFormState> {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            data: {
                ...this.props.data
            },
            birthdayMoment: Moment('1987-01-19'), // TODO: should this be null ?            
            loading: false,
            errors: {
                login: '',
                location: '',
                global: '',
                birthday: ''
            }
        };
        this.onSelectBirthday = this.onSelectBirthday.bind(this);
    }

    async onSelectBirthday(birthday: formTypes.UserData['birthday']) {
        await this.setState({
            data: {
                ...this.state.data,
                birthday
            }
        });
        this.makeBirthdayMoment();
    }

    onSelectLocation = (data: formTypes.UserData) => {
        this.setState({
            data: {
                ...this.state.data,
                country: data.country,
                city: data.city,
            }
        });
    }

    onChange = (e: any) => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }
    })

    onSubmit = (e: any) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.updateData(this.state.data);
            if (this.props.setStep) {
                this.props.setStep('login');
            }
        }
    }

    onPrevious = () => {
        if (this.props.setStep) {
            this.props.setStep('intro');
        }
    }

    // Transform the birthday object in a Moment object.
    makeBirthdayMoment = () => {
        let { day, month, year } = this.state.data.birthday;
        if (day && month && year) {
            if (parseInt(day, 10) < 10) {
                day = '0' + day;
            }
            let birthday = Moment(year + '-' + month + '-' + day);
            this.setState({
                birthdayMoment: birthday
            });
        }
    }

    // Check if the date give 18+ yo.
    isMajor = () => {
        let age = parseInt(Moment(this.state.birthdayMoment, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);
        if (age >= 18) {
            return 1;
        }
        return 0;
    }

    validate = (data: SignupFormState['data']) => {
        const errors: any = {};
        if (!data.login) { errors.login = 'You have to enter your login !'; }
        // TODO: Check il login taken        
        if (!data.country || !data.city) { errors.location = 'You have to select a place !'; }
        if (!data.birthday) { errors.birthday = 'You have to enter your birthday !'; }
        if (!this.state.birthdayMoment.isValid) { errors.birthday = 'You have to enter a valid date !'; }
        if (!this.isMajor()) { errors.birthday = 'You have to be major to signup !'; }
        // TODO : Add more validation (strlen, complex password,...)
        return errors;
    }

    render() {

        const { data, errors, loading } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="flex-col login-form">
                    {errors.global && <Danger title="Global error" text="Something went wrong" />}
                    <div>
                        <label htmlFor="login">login :</label>
                        <input
                            className="myInput"
                            id="login"
                            name="login"
                            placeholder="toto420"
                            value={data.login}
                            onChange={this.onChange}
                        />
                        {errors.login && <Danger title="login" text={errors.login} />}
                    </div>
                    <FormDate birthday={data.birthday} errors={errors} submitDate={this.onSelectBirthday} />
                    <FormLocation data={data} errors={errors} updateLocation={this.onSelectLocation} />
                    <div style={{ width: '80%' }}>
                        <button
                            className="btn btn-primary"
                            style={{ float: 'left' }}
                            type="button"
                            onClick={this.onPrevious}
                        >Back</button>
                        <button className="btn btn-primary" style={{ float: 'right' }}>Next</button>
                    </div>
                </form>
            </div>
        );
    }
}
