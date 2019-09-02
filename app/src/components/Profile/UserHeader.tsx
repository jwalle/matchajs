import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import { getAge } from '../../helpers/userTools';
import { getUserProfil } from '../../helpers/photosTools';
import CircularProgressbar from '../misc/CircularProgressBar';
import 'react-circular-progressbar/dist/styles.css';

export interface Props {
    user: any;
}

export default class UserHeader extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        const { info } = user;
        const picture = getUserProfil(user);
        const percentage = 66;

        return (
            <div className="info-top">
                <span className="infos-left">
                    <p className="info-age-gender">
                        {getAge(info.dob)}, <Icon color="yellow" name="woman" />
                    </p>
                    <p className="info-city">{info.city}</p>
                </span>
                <CircularProgressbar percentage={percentage}>
                    <img
                        src={picture}
                        alt="Profil picture"
                        className="section-img profile" // more specific
                    />
                </CircularProgressbar>
                <span className="info-right">
                    <p className="info-connected">Connected</p>
                </span>
                <p className="info-login">{info.login}</p>
            </div>
        );
    }
}