import * as React from 'react';
import { Icon, Button, Image, Container, Dropdown } from 'semantic-ui-react';
import NavigationRightUser from './navigationRightUser';
import axios from 'axios';
const path = require('path');
const PHOTOS_DIR = path.resolve(__dirname, 'data/photos/');

export interface NavigationBarState {
    picture: string;
}

export default class NavigationBar extends React.Component<{}, NavigationBarState> {
    constructor(props: any) {
        super(props);

        this.state = {
            picture: '',
        };
      }

      componentWillMount() {
          this.getProfilePhoto();
      }

      getProfilePhoto = () => {
        let self = this;
        axios({
            method: 'get',
            url: '/api/getProfilePhoto/1',
            responseType: 'json'
        })
            .then(res => {
                self.setState({
                    picture: PHOTOS_DIR + '/' + res.data[0].link, // plop
                });
            })
            .catch(err => console.log('error axios profilePhoto :', err));
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
                <NavigationRightUser picture={this.state.picture} />
            </div>
        );
    }
}