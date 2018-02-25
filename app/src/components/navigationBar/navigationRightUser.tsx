import * as React from 'react';

export default class NavigationBar extends React.Component {

    render() {
        return (
                <div className="navRight">
                    <ul className="navNotif navItem">
                        <li id="likes"><a href="/likes">|like|</a></li>
                        <li id="mailbox"><a href="/messages">|msg|</a></li>
                    </ul>
                    <div className="navUser">
                        <a href="/profile" className="navUserImage">
                            <span className="navUserThumb">
                                <img src="http://via.placeholder.com/120x120" alt="pseudo here" />
                            </span>
                        </a>
                    </div>
                </div>
        );
    }
}