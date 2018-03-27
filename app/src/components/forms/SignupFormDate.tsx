import * as React from 'react';
import * as Moment from 'moment';
import { Container, Header, Divider, Form, FormGroup, Button, Dropdown } from 'semantic-ui-react';

export interface SignupFormDateProps {
    submitDate: Function;
}

export interface SignupFormDateState {
    day: string;
    month: string;
    year: number;
    days: any;
    years: any;
}

export default class SignupFormDate extends React.Component < SignupFormDateProps,
SignupFormDateState > {
    constructor(props: SignupFormDateProps) {
        super(props);

        this.state = {
            day: '',
            month: '',
            year: 2018,
            days: [],
            years: []
        };
        this.onSelectDay = this.onSelectDay.bind(this);
        this.onSelectYear = this.onSelectYear.bind(this);
        this.onSelectMonth = this.onSelectMonth.bind(this);
    }

    componentWillMount() {
        this.getDays('1');
        this.getYears();
    }

    async onSelectMonth(e: any, {value}: any) {
        await this.setState({
                month: value
           });
        await this.getDays(value);
        this.submitDate();        
    }

    async onSelectDay(e: any, {value}: any) {
        await this.setState({
                day: value
            });
        this.submitDate();        
    }

    async onSelectYear(e: any, {value}: any) {
        await this.setState({
                year: value
        });
        this.submitDate();
    }

    submitDate = () => {
        let {day, month, year} = this.state;
        if (day && month && year) {
            if (parseInt(day, 10) < 10) {
                day = '0' + day;
            }
            let birthday = Moment(year + '-' + month + '-' + day);
            this.props.submitDate(birthday);
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
        return (
            <Form.Group>
                <Divider hidden/>
                <Header as="h2">Semantic-UI-React-plop</Header>
                <Form.Select
                    selection
                    placeholder="Month" 
                    options={months}
                    onChange={this.onSelectMonth}
                />
                <Form.Select 
                    selection
                    placeholder="Day"
                    options={this.state.days}
                    onChange={this.onSelectDay}
                />
                <Form.Select
                    selection
                    placeholder="Year"
                    options={this.state.years}
                    onChange={this.onSelectYear}
                />
            </Form.Group>
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