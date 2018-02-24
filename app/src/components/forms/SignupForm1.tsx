import * as React from 'react';
import { Form, FormGroup, Button } from 'semantic-ui-react';
import * as Validator from 'validator';
import Danger from '../messages/Message';

export interface SignupFormProps {
    setStep: Function;
    updateData: Function;
    data: any;
}

export interface SignupFormState {
    data: {
        gender: string;
    };
    loading: boolean;
}

export default class SignupForm1 extends React.Component < SignupFormProps, SignupFormState > {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            data: {
                ...this.props.data
            },
            loading: false,
        };
    }

    onChange = (e: any) => this.setState({
        data: {
            ...this.state.data,
            gender: e
        }  
    })

    onSubmit = () => {
            this.setState({loading: true});
            this.props.updateData(this.state.data);
            this.props.setStep('detail');
    }

    render() {

        const {loading} = this.state;

        return (
            <div>
            <Button.Group color="blue" size="big">
                <Button
                    value="F"
                    active={this.state.data.gender === 'F'}
                    onClick={() => this.onChange('F')}
                >Female
                </ Button>
                <Button.Or />
                <Button
                    value="M"
                    active={this.state.data.gender === 'M'}
                    onClick={() => this.onChange('M')}
                >Male
                </ Button>
            </Button.Group>
            <Button onClick={() => this.onSubmit()}>Next</Button>
            </div>
        );
    }
}
