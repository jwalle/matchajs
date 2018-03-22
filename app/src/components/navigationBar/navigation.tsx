import * as React from 'react';
import NavigationRightUser from './navigationRightUser';
require('./navigation.css');

export default class NavigationBar extends React.Component<{}> {
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
                <NavigationRightUser />
            </div>
        );
    }
}