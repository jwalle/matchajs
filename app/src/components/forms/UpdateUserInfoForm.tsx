import * as React from 'react';
import { Form, FormGroup, Button, Dropdown, Container } from 'semantic-ui-react';
import * as Validator from 'validator';
import Danger from '../messages/Message';
import FormDate from './FormDate';
import FormLocation from './FormLocation';
import * as Moment from 'moment';
import * as formTypes from './formTypes';

export interface UpdateUserInfoFormProps {
    submit: Function;
    data: formTypes.UserData;
}

export interface UpdateUserInfoState {
    data: formTypes.UserData;
    birthdayMoment: Moment.Moment;  
    loading: boolean;
    errors: formTypes.ErrorsForm;
}

export default class UpdateUserInfoForm extends React.Component < UpdateUserInfoFormProps, UpdateUserInfoState > {
    constructor(props: UpdateUserInfoFormProps) {
        super(props);

        this.state = {
            data: {
                ...this.props.data
            },
            birthdayMoment: Moment('1987-01-19'), // TODO: should this be null ?            
            loading: false,
            errors: {
                username: '',
                location : '',
                global: '',
                birthday: ''
            }
        };
        this.onSelectBirthday = this.onSelectBirthday.bind(this);        
    }

    componentWillMount() {
        // Ugly, change that
        let newData: formTypes.UserData =  this.renameProp('login', 'username', this.state.data);
        this.setState({
            data: newData
        });
    }

    // Rename a property inside an object. BAD.
    renameProp = (oldProp: any, newProp: any, {[oldProp]: old, ...others }): any => {
        return {
            [newProp]: old,
            ...others
        };
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

    onSelectLocation = (data: formTypes.UserData) =>  {
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
        if (Object.keys(errors).length === 0 ) {
            this.setState({loading: true});
            this.props.submit(this.state.data);
        }
    }

    // Transform the birthday object in a Moment object.
    makeBirthdayMoment = () => {
        let {day, month, year} = this.state.data.birthday;
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

    validate = (data: UpdateUserInfoState['data']) => {
        const errors: any = {};
        if (!data.username) { errors.username = 'You username !'; }
        // TODO: Check il new username taken
        if (!data.country || !data.city) { errors.location = 'You have to select a place !'; }
        if (!data.birthday) { errors.birthday = 'You have to enter your birthday !'; }
        if (!this.state.birthdayMoment.isValid) { errors.birthday = 'You have to enter a valid date !'; }
        if (!this.isMajor()) { errors.birthday = 'You have to be major to signup !'; }
        // TODO : Add more validation (strlen, complex password,...)
        return errors;
    }

    render() {

        const {data, errors, loading} = this.state;
        return (
            <Container id="UpdateUserInfoModal">
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
                        <FormDate data={data} errors={errors} submitDate={this.onSelectBirthday}/>
                        <FormLocation data={data} errors={errors} updateLocation={this.onSelectLocation} />
                    {/* <Button primary onClick={this.onPrevious}>Cancel</Button> */}
                    <Button primary>Update</Button>
                </Form>
            </Container>
        );
    }
}