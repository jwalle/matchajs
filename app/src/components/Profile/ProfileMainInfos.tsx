import * as React from 'react';
import * as Moment from 'moment';
import * as formTypes from '../forms/formTypes';
import { Divider } from 'semantic-ui-react';
import SignupFormDate from '../forms/FormDate';
import { Danger } from '../messages/Message';
import FormName from '../forms/FormName';
import PureTextInput from '../misc/PureTextInput';

export interface Props {
    user: formTypes.UserProfileProps;
}

interface State {
    errors: formTypes.ErrorsForm | null;
    openModal: boolean;
    birthday: any;
    infos: any;

}

export default class ProfileMainInfos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            errors: null,
            openModal: false,
            birthday: {
                day: '',
                month: '',
                year: 1987,
            },
            infos: {
                gender: 0,
                dob: Moment(),
                login: '',
                email: '',
                firstname: '',
                lastname: '',
                city: '',
            },
        };
    }

    componentWillMount() {
        this.setState({
            infos: {
                ...this.props.user.info,
                email: this.props.user.email,
            },
            birthday: this.makeBirthdayObject(this.props.user.info.dob)
        });
    }

    makeBirthdayMoment = () => {
        let { day, month, year } = this.state.birthday;
        if (day && month && year) {
            if (parseInt(day, 10) < 10) {
                day = '0' + day;
            }
            let dob = Moment(year + '-' + month + '-' + day);
            this.setState({
                infos: {
                    ...this.state.infos,
                    dob
                }
            });
        }
    }

    makeUglyMonth = (month: number) => {
        let m = month.toString();
        if (m.length < 2) {
            m = '0' + m; // please end me
        }
        return m;
    }

    makeBirthdayObject = (dob: Date) => {
        const d = Moment(dob, 'YYYY-MM-DD h:mm:ss');
        return {
            day: d.date(),
            month: this.makeUglyMonth(d.month() + 1),
            year: d.year(),
        };
    }

    submit = (data: any) => console.log(data);

    onSelectBirthday = async (birthday: formTypes.UserData['birthday']) => {
        await this.setState({
            infos: {
                ...this.state.infos,
                birthday
            }
        });
        this.makeBirthdayMoment();
    }

    onSelectName = (data: formTypes.UserData) => {
        // this.setState({
        //     data: {
        //         ...this.state.data,
        //         firstname: data.firstname,
        //         lastname: data.lastname,
        //     }
        // });
    }

    updateOnBlur = (e: any) => {
        // console.log('HERE');
        // console.log(e.target.value);
        this.setState({
            ...this.state,
            infos: {
                ...this.state.infos,
                [e.target.name]: e.target.value
            }
        });
    }

    onChangeText = (e: any) => {
        // console.log(e);
        this.setState({
            ...this.state,
            infos: {
                ...this.state.infos,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        const { openModal, errors, infos, birthday } = this.state;
        console.log('INFO: ', infos);
        // console.log('User: ', this.props.user);
        const editInfos = (
            <div className="mainEditInfos">
                <div className="title">
                    <h1>Your personal information</h1>
                    <Divider />
                </div>
                <div className="flex-col">
                    <div id="GenderButtons" className="flex">
                        <input
                            checked={infos.gender === 1}
                            type="radio"
                            name="sex"
                            value="M"
                            data-icon=""
                            onChange={() => console.log('M')}
                        />
                        <span className="radio-inter">-</span>
                        <input
                            checked={infos.gender === 2}
                            type="radio"
                            name="sex"
                            value="F"
                            data-icon=""
                            onChange={() => console.log('F')}
                        />
                        <span className="radio-inter">-</span>
                        <input
                            checked={infos.gender === 3}
                            type="radio"
                            name="sex"
                            value="T"
                            data-icon=""
                            onChange={() => console.log('T')}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <PureTextInput
                            label="Login"
                            defaultValue={infos.login}
                            error={errors && errors.login}
                            UpdateOnBlur={this.updateOnBlur}
                            placeholder="toto420"
                            name="login"
                        />
                        <div style={{ width: 10 }} />
                        <PureTextInput
                            label="City"
                            defaultValue={infos.city}
                            error={errors && errors.city}
                            UpdateOnBlur={this.updateOnBlur}
                            placeholder="Paris"
                            name="city"
                        />
                    </div>
                    <FormName data={infos} errors={errors} updateName={this.onChangeText} />
                    <SignupFormDate birthday={birthday} errors={errors} submitDate={this.onSelectBirthday} />
                    <div style={{ width: 300 }}>
                        <PureTextInput
                            label="Email"
                            defaultValue={infos.email}
                            error={errors && errors.email}
                            UpdateOnBlur={this.updateOnBlur}
                            placeholder="matcha@42.fr"
                            name="email"
                        />
                    </div>
                    <div style={{ width: '80%' }}>
                        <button
                            className="btn btn-cancel"
                            style={{ float: 'left' }}
                            type="button"
                        // onClick={() => }
                        >Cancel</button>
                        <button className="btn btn-confirm" style={{ float: 'right' }}>Update</button>
                    </div>
                </div>
            </div >
        );

        return (
            <div className="mainInfosModal">
                {openModal && <div className="backdrop" onClick={() => this.setState({ openModal: false })} />}
                {editInfos}
            </div>

        );
    }
}