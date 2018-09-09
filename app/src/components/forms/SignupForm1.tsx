import * as React from 'react';
import * as Validator from 'validator';
import Danger from '../messages/Message';
import * as formTypes from './formTypes'; 

export interface SignupFormProps {
    setStep: Function;
    updateData: Function;
    data: formTypes.UserData;
}

export interface SignupFormState {
    data: formTypes.UserData;
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

    onChangeGender = (e: string) => this.setState({
        data: {
            ...this.state.data,
            gender: e
        }
    })

    onChangeOrientation = (e: string) => this.setState({
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

        const { gender, orientation } = this.state.data;

        return (
            <div id="formOneButtons">
                <div id="GenderButtons" className="flex">
                    <input
                        checked={gender === 'M'}
                        type="radio"
                        name="sex"
                        value="M"
                        data-icon=""
                        onChange={() => this.onChangeGender('M')}
                    />
                    <span className="radio-inter">-</span> 
                    <input
                        checked={gender === 'F'}
                        type="radio"
                        name="sex"
                        value="F"
                        data-icon=""
                        onChange={() => this.onChangeGender('F')}
                    />
                </div>
                <div id="orientationButtons" className="flex">
                    <input
                        type="radio"
                        name="ori"
                        value="S"
                        data-icon="Straight"
                        checked={orientation === 'S'}
                        onChange={() => this.onChangeOrientation('S')}
                    />
                    <span className="radio-inter">-</span> 
                    <input
                        type="radio"
                        name="ori"
                        value="G"
                        data-icon="Gay"
                        checked={orientation === 'G'}
                        onChange={() => this.onChangeOrientation('G')}
                    />
                    <span className="radio-inter">-</span> 
                    <input
                        type="radio"
                        name="ori"
                        value="B"
                        data-icon="Bisexual"
                        checked={orientation === 'B'}
                        onChange={() => this.onChangeOrientation('B')}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    style={{float: 'right'}}
                    onClick={() => this.onSubmit()}>Next
                </button>
            </div>
        );
    }
}
