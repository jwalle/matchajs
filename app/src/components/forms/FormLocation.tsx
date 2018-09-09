import { Form } from 'semantic-ui-react';
import * as React from 'react';
import { Danger } from '../messages/Message';
import * as formTypes from './formTypes';

export interface FormLocationProps {
    updateLocation: Function;
    data: formTypes.UserData;
    errors: formTypes.ErrorsForm;
}

export interface FormLocationState {
    countriesList: any;
    citiesList: any;
    data: formTypes.UserData;
    loading: boolean;
}

export default class FormLocation extends React.Component < FormLocationProps, FormLocationState > {
    constructor(props: FormLocationProps) {
        super(props);

        this.state = {
            countriesList: [],
            citiesList: [],
            data: {
                ...this.props.data
            },
            loading: false,
        };
        this.onSelectCountry = this.onSelectCountry.bind(this);
        this.onSelectCity = this.onSelectCity.bind(this);
    }

    componentWillMount() {
        this.getCountries();
        if (this.state.data.country) {
            this.getCities(this.state.data.country);
        }
    }

    async onSelectCountry(e: any, {value}: any) {
        await this.setState({
            data: {
                ...this.state.data,
                country: value
            }        
        });
        this.getCities(value);
    }

    async onSelectCity(e: any, {value}: any) {
        await this.setState({
            data: {
                ...this.state.data,
                city: value
            }
        });
        this.props.updateLocation(this.state.data);
    }

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

    render() {
        const { data } = this.state;
        const { errors } = this.props;
        return (
            <div>
                <label htmlFor="location">Your Location :</label>            
                <Form.Group className="flex" style={{padding: '15px'}}>
                    <Form.Select
                        fluid
                        placeholder="Select your country"
                        selection
                        value={data.country}
                        options={this.state.countriesList}
                        onChange={this.onSelectCountry}
                    />
                    <Form.Select
                        fluid
                        placeholder="Select your cities"
                        selection
                        // {...!!this.state.citiesList ? 'disabled' : ''}
                        value={data.city}
                        options={this.state.citiesList}
                        onChange={this.onSelectCity}
                    />
                </Form.Group>
                {errors.location && <Danger title="Location" text={errors.location} />}                
            </div>
        );
    }
}
