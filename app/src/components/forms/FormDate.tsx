import * as React from 'react';
import { Danger } from '../messages/Message';
import { Form } from 'semantic-ui-react';
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

export default class SignupFormDate extends React.Component<FormDateProps, FormDateState> {
    constructor(props: FormDateProps) {
        super(props);

        this.state = {
            data: {
                ...this.props.data
            },
            days: [],
            years: []
        };
    }

    componentWillMount() {
        this.getNumberOfDaysForMonth(this.state.data.birthday.month || '01');
        this.getYears();
    }

    onSelectMonth = async (e: any, { value }: any) => {
        await this.setState({
            data: {
                ...this.state.data,
                birthday: {
                    ...this.state.data.birthday,
                    month: value
                }
            }
        });
        await this.getNumberOfDaysForMonth(value);
        this.submitDate();
    }

    onSelectDay = async (e: any, { value }: any) => {
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

    onSelectYear = async (e: any, { value }: any) => {
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
        let { day, month, year } = this.state.data.birthday;
        if (day && month && year) {
            this.props.submitDate(this.state.data.birthday);
        }
    }

    getNumberOfDaysForMonth = (month: string) => {
        let days = [];
        var key = 1;
        let maxDays: number = (longMonth.indexOf(month) > -1) ? 32 : 31;
        if (month === '02') {
            maxDays = 29;
        }
        while (key < maxDays) {
            days.push({ key, value: key, text: key });
            key++;
        }
        this.setState({ days });
    }

    getYears = () => {
        let years = [];
        var key = 0;
        while (key < 120) {
            years.push({ key, value: (2019 - key), text: (2019 - key) });
            key++;
        }
        this.setState({ years });
    }

    render() {
        const { errors } = this.props;
        const { data } = this.state;
        return (
            <div>
                <label htmlFor="birthday">Your birthday :</label>
                <Form.Group className="flex" style={{ padding: '15px' }}>
                    <Form.Select
                        selection
                        placeholder="Month"
                        fluid
                        name="month"
                        value={data.birthday.month}
                        options={months}
                        onChange={this.onSelectMonth}
                        style={{ minWidth: '140px' }}
                    />
                    <Form.Select
                        selection
                        placeholder="Day"
                        fluid
                        value={data.birthday.day}
                        options={this.state.days}
                        onChange={this.onSelectDay}
                        style={{ minWidth: '85px' }}
                    />
                    <Form.Select
                        selection
                        placeholder="Year"
                        fluid
                        value={data.birthday.year}
                        options={this.state.years}
                        onChange={this.onSelectYear}
                    />
                </Form.Group>
                {errors.birthday && <Danger title="Birthday" text={errors.birthday} />}
            </div>

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