import * as React from 'react';
import { Icon, Button, Image, Container, Dropdown } from 'semantic-ui-react';

export default class NavigationBar extends React.Component {
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
                            <img src="../../../data/photos/goldenladybug336-1527606457098.jpg" alt="pseudo here" />
                            </span>
                        </a>
                    </div>
                </div>
        );
    }
}