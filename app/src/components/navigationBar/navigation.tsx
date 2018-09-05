import * as React from 'react';
import { Icon, Button, Image, Container, Dropdown } from 'semantic-ui-react';
import NavigationRightUser from './navigationRightUser';
import { connect } from 'react-redux';

export interface NavigationBarProps {
    profil: any;
    user: any;
}

export class NavigationBar extends React.Component<NavigationBarProps, {}> {
    constructor(props: any) {
        super(props);
      }

    render() {
        return (
            <div id={'navigation'} className="fixed">
                <div className="navLeft">
                    <div>
                        <a href="/" id="logoLink">
                            <img src="../../data/images/matcha3.png" id="logoImg" alt="logo"/>
                            <h1>atcha</h1>
                        </a>
                    </div>
                    <div className="navLinks navItem">
                        <span><Icon 
                            className="navIconLeft"
                            color="blue"
                            name="search"
                            size="big"
                        /><h2 className="navTitleLeft">Search</h2></span>
                        <span><Icon 
                            className="navIconLeft"
                            color="blue"
                            name="clone"
                            size="big"
                        /><h2 className="navTitleLeft">Matchas</h2></span>
                    </div>
                </div>
                <NavigationRightUser profil={this.props.profil} user={this.props.user} />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    profil: state.photos.profil,
    user: state.user.user
});

export default connect<NavigationBarProps, null>(mapStateToProps, null)(NavigationBar);