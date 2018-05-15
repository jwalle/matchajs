import * as React from 'react';
import * as Moment from 'moment';
import Danger from '../messages/Message';
import { Container, Header, Divider, Form, FormGroup, Button, Dropdown } from 'semantic-ui-react';
import * as formTypes from './formTypes'; 

export interface FormDateProps {
    submitDate: Function;
    errors: formTypes.ErrorsForm;
    data: formTypes.UserData;
}

export interface FormDateState {
    data: formTypes.UserData;
    days: any;
    years: any;
}

export default class SignupFormDate extends React.Component < FormDateProps, FormDateState > {
    constructor(props: FormDateProps) {
        super(props);

        this.state = {
            data: {
                ...this.props.data
            },
            days: [],
            years: []
        };
        this.onSelectDay = this.onSelectDay.bind(this);
        this.onSelectYear = this.onSelectYear.bind(this);
        this.onSelectMonth = this.onSelectMonth.bind(this);
    }

    componentWillMount() {
        this.getDays(this.state.data.birthday.month || '01');
        this.getYears();
    }

    async onSelectMonth(e: any, {value}: any) {
        await this.setState({
            data: {
                ...this.state.data,
                birthday: {
                    ...this.state.data.birthday,
                    month: value
                }
            }
        });
        await this.getDays(value);
        this.submitDate();        
    }

    async onSelectDay(e: any, {value}: any ) {
        await this.setState({
            data: {
                ...this.state.data,
                birthday: {
                    ...this.state.data.birthday,
                    day: value
                }
            }
            });
        this.submitDate();        
    }

    async onSelectYear(e: any, {value}: any) {
        await this.setState({
            data: {
                ...this.state.data,
                birthday: {
                    ...this.state.data.birthday,                    
                    year: value
                }
            }
        });
        this.submitDate();
    }

    submitDate = () => {
        let {day, month, year} = this.state.data.birthday;
        if (day && month && year) {
            this.props.submitDate(this.state.data.birthday);
        }
    }

    getDays = (month: string) => {
            let days = [];
            var key = 1;
            let maxDays: number = (longMonth.indexOf(month) > -1) ? 32 : 31;
            if (month === '02') {
                maxDays = 29;
            }
            while (key < maxDays) {
                days.push({key , value: key, text: key});
                key++;
            }
            this.setState({ days });
    }

    getYears = () => {
        let years = [];
        let now = Moment().year;
        var key = 0;
        while (key < 100) {
            years.push({key , value: (2018 - key), text: (2018 - key)}); // TODO: from 'this' year
            key++;
        }
        this.setState({ years });        
    }

    render() {
        const { errors } = this.props;
        const { data } = this.state;
        return (
            <Form.Field error={!!errors.birthday}>
            <label htmlFor="birthday">Your birthday :</label>
                <Form.Group>                    
                    {/* <Divider hidden/> */}
                    <Form.Select
                        selection
                        placeholder="Month"
                        width={2}
                        name="month"
                        value={data.birthday.month}
                        options={months}
                        onChange={this.onSelectMonth}
                    />
                    <Form.Select
                        selection
                        placeholder="Day"
                        width={1}
                        value={data.birthday.day}
                        options={this.state.days}
                        onChange={this.onSelectDay}
                    />
                    <Form.Select
                        selection
                        placeholder="Year"
                        width={2}
                        value={data.birthday.year}
                        options={this.state.years}
                        onChange={this.onSelectYear}
                    />
                </Form.Group>
                {errors.birthday && <Danger title="Birthday" text={errors.birthday} />}                
            </Form.Field>
            
        );
    }
}

const longMonth = ['01', '03', '05', '07', '08', '10', '12'];

const months = [
    { value: '01', text: 'January' },
    { value: '02', text: 'February' },
    { value: '03', text: 'Mars' },
    { value: '04', text: 'Avril' },
    { value: '05', text: 'May' },
    { value: '06', text: 'June' },
    { value: '07', text: 'July' },
    { value: '08', text: 'August' },
    { value: '09', text: 'September' },
    { value: '10', text: 'October' },
    { value: '11', text: 'November' },
    { value: '12', text: 'December' },
  ];