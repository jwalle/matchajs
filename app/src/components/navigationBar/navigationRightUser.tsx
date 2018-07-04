import * as React from 'react';
import { Icon } from 'semantic-ui-react';

export interface NavigationBarProps {
    picture: string;
}

export default class NavigationBar extends React.Component<NavigationBarProps, {}> {
    render() {
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
                        <a href="/profile" className="navUserImage">
                            <span className="navUserThumb">
                                {/* <img src="http://via.placeholder.com/120x120" alt="pseudo here" /> */}
                            <img src={this.props.picture} alt="pseudo here" />
                            </span>
                        </a>
                    </div>
                </div>
        );
    }
}