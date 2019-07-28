import * as React from 'react';
import { Icon, Button, Image, Container, Dropdown, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

export interface NavigationBarProps {
    profil: any;
    user: any;
}

export class NavigationBar extends React.Component<NavigationBarProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { user } = this.props;
        const pos = user.photos.findIndex((i: any) => i.isProfil === 1);
        let profilPhoto = 'http://via.placeholder.com/100x100';
        if (user && user.photos && user.photos[pos] && user.photos[pos].link) {
            profilPhoto = 'http://localhost:3000' + `/photos/${user.login}/${user.photos[pos].link}`;
        }
        const trigger = (
            <span className="navUserThumb">
                <img src={profilPhoto} alt="pseudo here" />
            </span>
        );
        const options = [
            { key: 'user', text: 'Account', icon: 'user', as: Link, to: '/profile' },
            { key: 'settings', text: 'Settings', icon: 'settings' },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
        ];
        return (
            <div id={'navigation'} className="fixed">
                <div className="navLogo">
                    <a href="/#/" id="logoLink">
                        <img src="../../data/images/matcha3.png" id="logoImg" alt="logo" />
                        <h1>atcha</h1>
                    </a>
                </div>
                <a className="navLinks" href="/#/search">
                    <Icon className="navIcons" color="blue" name="search" size="big" />
                    <p>Search</p>
                </a>
                <a className="navLinks">
                    <Icon className="navIcons" color="blue" name="clone" size="big" />
                    <p>Swipe</p>
                </a>
                <a className="navLinks">
                    <Icon className="navIcons" color="blue" name="star" size="big">
                        <span id="comments-count">2</ span>
                    </Icon>
                    <p>Likes</p>
                </a>
                <a className="navLinks">
                    <Icon className="navIcons" color="blue" name="comments" size="big">
                        <span id="comments-count">5</ span>
                    </Icon>
                    <p>Comments</p>
                </a>
                <Dropdown
                    className="navTrigger" trigger={trigger} options={options} pointing="top right" icon={null} />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    profil: state.photos.profil,
    user: state.user.user
});

export default connect<NavigationBarProps, null>(mapStateToProps, null)(NavigationBar);