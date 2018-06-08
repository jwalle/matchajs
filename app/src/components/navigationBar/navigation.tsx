import * as React from 'react';
import { Icon, Button, Image, Container, Dropdown } from 'semantic-ui-react';
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
                <NavigationRightUser />
            </div>
        );
    }
}