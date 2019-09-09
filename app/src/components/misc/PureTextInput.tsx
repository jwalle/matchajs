import { Form, FormGroup, Button, Dropdown, Container } from 'semantic-ui-react';
import * as React from 'react';
import { Danger } from '../messages/Message';

export interface FormNameProps {
    error?: null | string;
    label: string;
    defaultValue: string;
    name: string;
    placeholder: string;
    UpdateOnBlur: Function;
}

export default class PureTextInput extends React.PureComponent<FormNameProps> {
    constructor(props: FormNameProps) {
        super(props);
    }

    render() {
        const { error, defaultValue, label, placeholder, name } = this.props;
        return (
            <div>
                <label htmlFor="location">{label}</label>
                <input
                    className="myInput"
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    name={name}
                    onBlur={(e) => this.props.UpdateOnBlur(e)}
                />
                {error && <Danger title="Name" text={error} />}
            </div>
        );
    }
}