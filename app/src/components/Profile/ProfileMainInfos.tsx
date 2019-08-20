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
                {editInfos}
            </div>

        );
    }
}