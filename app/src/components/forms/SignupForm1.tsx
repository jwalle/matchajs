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
        orientation: string;
    };
    loading: boolean;
}

export default class SignupForm1 extends React.Component<SignupFormProps, SignupFormState> {
    constructor(props: SignupFormProps) {
        super(props);

        this.state = {
            data: {
                ...this.props.data
            },
            loading: false,
        };
    }

    onChangeGender = (e: any) => this.setState({
        data: {
            ...this.state.data,
            gender: e
        }
    })

    onChangeOrientation = (e: any) => this.setState({
        data: {
            ...this.state.data,
            orientation: e
        }
    })

    onSubmit = () => {
        this.setState({ loading: true });
        this.props.updateData(this.state.data);
        this.props.setStep('detail');
    }

    render() {

        const { loading } = this.state;

        return (
            <div id="formOneButtons">
                <div id="GenderButtons">
                <Button.Group color="blue" size="big">
                    <Button
                        value="F"
                        toggle
                        active={this.state.data.gender === 'F'}
                        onClick={() => this.onChangeGender('F')}
                    >Female
                    </ Button>
                    <Button.Or />
                    <Button
                        value="M"
                        toggle
                        active={this.state.data.gender === 'M'}
                        onClick={() => this.onChangeGender('M')}
                    >Male
                    </ Button>
                </Button.Group>
                </div>
                <div id="orientationButtons">
                <Button.Group>
                    <Button
                        value="S"
                        toggle
                        active={this.state.data.orientation === 'S'}
                        onClick={() => this.onChangeOrientation('S')}
                    >Straight
                    </ Button>
                    <Button.Or />
                    <Button
                        value="G"
                        toggle
                        active={this.state.data.orientation === 'G'}
                        onClick={() => this.onChangeOrientation('G')}
                    >gay
                    </ Button>
                    <Button.Or />
                    <Button
                        value="B"
                        toggle
                        active={this.state.data.orientation === 'B'}
                        onClick={() => this.onChangeOrientation('B')}
                    >Bisexual
                    </ Button>
                </Button.Group>
                </div>
                <Button className="formOneNextButton" onClick={() => this.onSubmit()}>Next</Button>
            </div>
        );
    }
}
