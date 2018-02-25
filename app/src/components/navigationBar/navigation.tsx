import * as React from 'react';
import NavigationRightUser from './navigationRightUser';
import NavigationRightGuest from './navigationRightGuest';
import { connect } from 'react-redux';
require('./navigation.css');

export interface NavigationBarProps {
    isAuth: boolean;
}

class NavigationBar extends React.Component<NavigationBarProps, {}> {
    constructor(props: any) {
        super(props);    
      }

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
                { this.props.isAuth ?
                  <NavigationRightUser /> :
                  <NavigationRightGuest /> }
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        isAuth: !!state.user.token
    };
}

export default connect<any, any>(mapStateToProps, {})(NavigationBar);