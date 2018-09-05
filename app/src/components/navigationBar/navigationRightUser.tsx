import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import * as path from 'path';
const PHOTOS_DIR = path.resolve(__dirname, 'data/photos/');

export interface NavigationBarProps {
    profil: any;
    user: any;
}

export default class NavigationBar extends React.Component<NavigationBarProps, {}> {
    render() {
        const { profil, user } = this.props;
        let profilPhoto = 'http://via.placeholder.com/100x100';
        if (profil) {
            profilPhoto = `../../../data/photos/${user.login}/${profil.link}`;
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
                                {/* <img src="http://via.placeholder.com/120x120" alt="pseudo here" /> */}
                            <img src={profilPhoto} alt="pseudo here" />
                            </span>
                        </a>
                    </div>
                </div>
        );
    }
}