import React from 'react';
import axios from 'axios';
import { Button, Image, FormControl } from 'react-bootstrap';
import style from './navigation.css';

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={style.navigation} className={style.fixed}>
                <div className={style.navLeft}>
                    <h1 id={style.logo} className={style.navLogo}><a href="/">MATCHA</a></h1>
                    <ul className={style.navLinks + ' ' + style.navItem}>
                        <li><a href="/search">Search</a></li>
                        <li><a href="/matchs">Matchs</a></li>
                    </ul>
                </div>
                <div className={style.navRight}>
                    <ul className={style.navNotif + ' ' + style.navItem}>
                        <li id={style.likes}><a href="/likes">|like|</a></li>
                        <li id={style.mailbox}><a href="/messages">|msg|</a></li>
                    </ul>
                    <div className={style.navUser}>
                        <a href="/profile" className={style.navUserImage} title>
                        <span className={style.navUserThumb}>
                            <img src="http://via.placeholder.com/120x120" alt="pseudo here"/>
                        </span>
                        </a>
                    </div>
                </div>
            </div>
                );
            };
}