import { Form, FormGroup, Button, Dropdown, Container } from 'semantic-ui-react';
import * as React from 'react';
import { Danger } from '../messages/Message';
import * as formTypes from './formTypes';

export interface FormNameProps {
    updateName: Function;
    data: formTypes.UserData;
    errors: formTypes.ErrorsForm;
}

export interface FormNameState {
    data: formTypes.UserData;
}

export default class FormName extends React.Component < FormNameProps, FormNameState > {
    constructor(props: FormNameProps) {
        super(props);

        this.state = {
            data: {
                ...this.props.data
            },
        };
        this.onSelect = this.onSelect.bind(this);
    }

    async onSelect(e: any) { 
        await this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
        this.props.updateName(this.state.data);    
    }

    render() {
        const { data } = this.state;
        const { errors } = this.props;
        return (
            <div>
                <label htmlFor="location">Your Name :</label>
                <div className="flex">
                    <input
                        className="myInput"
                        value={data.firstname}
                        autoComplete="given-name"
                        placeholder="First name"
                        name="firstname"
                        onChange={this.onSelect}
                    />
                    <input
                        className="myInput"
                        value={data.lastname}
                        placeholder="Last name"
                        autoComplete="family-name"
                        name="lastname"
                        onChange={this.onSelect}
                    />
                </div>
                {errors.name && <Danger title="Name" text={errors.name} />}                
            </div>
        );
    }
}
