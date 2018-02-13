import * as React from 'react';
require('./navigation.css');

export default class NavigationBar extends React.Component {

    render() {
        return (
            <div id={'navigation'} className="fixed">
                <div className="navLeft">
                    <h1 id="logo" className="navLogo"><a href="/">MATCHA</a></h1>
                    <ul className="navLinks navItem">
                        <li><a href="/search">Search</a></li>
                        <li><a href="/matchs">Matchas</a></li>
                    </ul>
                </div>
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
            </div>
        );
    }
}