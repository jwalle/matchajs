import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import * as path from 'path';
import { withRouter } from 'react-router-dom';
const PHOTOS_DIR = path.resolve(__dirname, 'data/photos/');

export interface NavigationBarProps {
    profil: any;
    user: any;
}

export default class NavigationBar extends React.Component<NavigationBarProps, {}> {
    render() {
        const { user } = this.props;
        const pos = user.photos.findIndex((i: any) => i.isProfil === 1);
        let profilPhoto = 'http://via.placeholder.com/100x100';
        if (user && user.photos && user.photos[pos].link) {
            profilPhoto = 'http://localhost:3000' + `/photos/${user.login}/${user.photos[pos].link}`;
        }
        return (
            <div className="navRight">
                <div className="navLinksRight">
                    <span><Icon
                        className="navIconRight"
                        color="blue"
                        name="star"
                        size="huge"
                    /></span>
                    <span><Icon
                        className="comments"
                        color="blue"
                        name="comments"
                        size="huge"
                    ><span id="comments-count">5</ span>
                    </Icon></span>
                </div>
                <div className="navUser">
                    <a href="/#/profile" className="navUserImage">
                        <span className="navUserThumb">
                            <img src={profilPhoto} alt="pseudo here" />
                        </span>
                    </a>
                </div>
            </div>
        );
    }
}