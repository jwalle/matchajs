import * as React from 'react';
import { Form, FormGroup, Button, Dropdown, Container } from 'semantic-ui-react';
import * as Validator from 'validator';
import Danger from '../messages/Message';
import FormDate from './SignupFormDate';
import * as Moment from 'moment';

export interface SignupFormProps {
    setStep: Function;
    updateData: Function;
    data: any;
}

export interface SignupFormState {
    countriesList: any;
    citiesList: any;
    data: {
        username: string,
        country: string,
        city: string,
        birthday: Moment.Moment;
    };
    loading: boolean;
    errors: {
        global: string,
        username: string,
        country: string;
        city: string;
        birthday: string;
    };
}

export default class SignupForm2 extends React.Component < SignupFormProps, SignupFormState > {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            countriesList: [],
            citiesList: [],
            data: {
                ...this.props.data
                },
            loading: false,
            errors: {
                username: '',
                country : '',
                city: '',
                global: '',
                birthday: ''             
            }
        };
    }

    componentWillMount() {
        this.getCountries();
    }

    onSelectCountry = (e: any, {value}: any) =>  {
        this.setState({
            data: {
                ...this.state.data,
                country: value
            }
        });
        this.getCities(value);
    }

    onSelectCities = (e: any, {value}: any) =>  {
        this.setState({
            data: {
                ...this.state.data,
                city: value
            }
        });
    }

    onSelectBirthday = (birthday: any) =>  {
        this.setState({
            data: {
                ...this.state.data,
                birthday
            }
        });
    }

    onChange = (e: any) => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }  
    })

    getCountries = () => {
        let countries = require('../../data/countries.json').countries;
        let arr = [];
        let key = 0;
        for (let x in countries) {
            if (countries.hasOwnProperty(x)) {
                arr.push({key , value: x, text: x});
                key++;
            }
        }
        this.setState({
            countriesList: arr
        });
    }

    getCities = (country: string) => {
        let countries = require('../../data/countries.json').countries;
        let cities = countries[country];
        let arr = [];
        let key = 0;
        for (let x in cities) {
            if (cities.hasOwnProperty(x)) {
                arr.push({key , value: cities[x], text: cities[x]});
                key++;
            }
        }
        this.setState({
            citiesList: arr
        });
    }

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

    isMajor = () => {
        let age = parseInt(Moment(this.state.data.birthday, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);        
        console.log('age = ', age);
        if (age >= 18) {
            return 1;
        }
        return 0;
    }

    validate = (data: SignupFormState['data']) => {
        const errors: any = {};
        if (!data.username) { errors.username = 'You have to enter your username !'; }
        if (!data.country) { errors.country = 'You have to select a country !'; }
        if (!data.city) { errors.city = 'You have to select your city !'; }
        if (!data.birthday) { errors.birthday = 'You have to enter your birthday !'; }
        if (!data.birthday.isValid) { errors.birthday = 'You have to enter a valid date !'; }
        if (!this.isMajor()) { errors.birthday = 'You have to be major to signup !'; }
        // TODO : Add more validation (strlen, complex password,...)
        return errors;
    }

    render() {

        const {data, errors, loading} = this.state;
        // console.log(this.state.countriesList);
        return (
            <Container>
            <h1 style={{color: 'white'}}>You are : {this.props.data.gender} and {this.props.data.orientation}</h1>
            
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
                    <label htmlFor="country">Your country :</label>                    
                    <Form.Field error={!!errors.country}>
                    {errors.birthday && <Danger title="Birtday" text={errors.birthday} />}
                    <FormDate submitDate={this.onSelectBirthday}/>
                    {errors.username && <Danger title="Username" text={errors.username} />}
                    </Form.Field>                    
                    <Form.Field error={!!errors.country}>                              
                    <label htmlFor="country">Your country :</label>
                    <Form.Select
                        placeholder="Select your country"
                        selection
                        value={data.country}
                        options={this.state.countriesList}
                        onChange={this.onSelectCountry}
                    />
                    {errors.country && <Danger title="Country" text={errors.country} />}
                    </Form.Field>
                    <Form.Field error={!!errors.city}>
                    <label htmlFor="city">Your city :</label>
                    <Form.Select
                        placeholder="Select your cities"
                        selection
                        // {...!!this.state.citiesList ? 'disabled' : ''}
                        value={data.city}
                        options={this.state.citiesList}
                        onChange={this.onSelectCities}
                    />
                    {errors.city && <Danger title="city" text={errors.city} />}
                    </Form.Field>
                <Button primary onClick={this.onPrevious}>Back</Button>
                <Button primary>Next</Button>
            </Form>
            </Container>
        );
    }
}
