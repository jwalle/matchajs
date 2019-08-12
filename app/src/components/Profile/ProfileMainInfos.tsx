import * as React from 'react';
import * as formTypes from '../forms/formTypes';
import { Modal, Flag, Image, Header, Icon, Dropdown } from 'semantic-ui-react';
import { getAge, capitalize } from '../../helpers/userTools';
import SignupFormDate from '../forms/FormDate';
import SignupFormAll from '../forms/SignupFormAll';
import { Danger } from '../messages/Message';

export interface Props {
    user: formTypes.UserProfileProps;
}

interface State {
    errors: formTypes.ErrorsForm | null;
    openModal: boolean;
    infos: any;

}

export default class ProfileMainInfos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            errors: null,
            openModal: false,
            infos: {
                gender: 0,
                login: '',
                firstname: '',
                lastname: '',
                dob: new Date,
                nat: undefined,
                city: '',
            },
        };
    }

    componentWillMount() {
        this.setState({
            infos: this.props.user.info,
        });
    }

    submit = (data: any) => console.log(data);

    render() {
        const { openModal, errors, infos } = this.state;
        console.log('INFO: ', infos);

        // const gender = infos.gender === 1 ?
        //     <Icon color="yellow" name="man" /> : <Icon color="yellow" name="woman" />;

        const infosTrigger = (
            <div className="mainInfos" onClick={() => this.setState({ openModal: true })}>
                <p className="login">{infos.login}<Flag className="flagIcon" name={infos.nat} /></p>
                <p className="name">({capitalize(infos.firstname)} {capitalize(infos.lastname)})</p>
            </div>
        );

        const editInfos = (
            <div className="mainEditInfos">
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
                    <div>
                        <label htmlFor="username">Username :</label>
                        <input
                            className="myInput"
                            id="username"
                            name="username"
                            placeholder="toto420"
                            value={infos.login}
                            onChange={(data: any) => console.log(data.value)}
                        />
                        {errors && errors.username && <Danger title="Username" text={errors.username} />}
                    </div>
                </div>
            </div >
        );

        return (
            <div className="mainInfosModal">
                {openModal && <div className="backdrop" onClick={() => this.setState({ openModal: false })} />}
                {openModal ? editInfos : infosTrigger}
            </div>

        );
    }
}

const countryOptions = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
];
