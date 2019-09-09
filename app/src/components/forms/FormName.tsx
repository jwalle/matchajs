import { Form, FormGroup, Button, Dropdown, Container } from 'semantic-ui-react';
import * as React from 'react';
import { Danger } from '../messages/Message';
import * as formTypes from './formTypes';

export interface FormNameProps {
    updateName: any;
    data: formTypes.UserData;
    errors: formTypes.ErrorsForm | null;
}

export interface FormNameState {
    firstname: string;
    lastname: string;
}

export default class FormName extends React.Component<FormNameProps, FormNameState> {
    constructor(props: FormNameProps) {
        super(props);

        this.state = {
            firstname: this.props.data.firstname,
            lastname: this.props.data.lastname,
        };
        // this.onSelect = this.onSelect.bind(this);
    }

    // async onSelect(e: any) {
    //     await this.setState({
    //         data: {
    //             ...this.state.data,
    //             [e.target.name]: e.target.value
    //         }
    //     });
    //     this.props.updateName(this.state.data);
    // }

    onChangeText = (e: any) => {
        // console.log(e);
        this.setState({
            firstname: e.target.value
        });
    }

    onBlur = () => {
        console.log(this.state);
    }

    render() {
        console.log('wtf names');
        const { firstname, lastname } = this.state;
        const { errors, data } = this.props;
        return (
            <div>
                <label htmlFor="location">Your Name</label>
                <div className="flex">
                    <input
                        className="myInput"
                        value={firstname}
                        autoComplete="given-name"
                        placeholder="First name"
                        name="firstname"
                        onBlur={this.onBlur}
                        onChange={this.onChangeText}
                    />
                    <div style={{ width: 20 }} />
                    <input
                        className="myInput"
                        value={lastname}
                        placeholder="Last name"
                        autoComplete="family-name"
                        name="lastname"
                        onChange={this.onChangeText}
                    />
                </div>
                {errors && errors.name && <Danger title="Name" text={errors.name} />}
            </div>
        );
    }
}
