import * as React from 'react';
import axios from 'axios';
import Discovery from './discoveryContent/discovery';
require('./ContentPage.css');

// const localeIp = "http://192.168.99.100:3000";
const localeIp = '/api';

export interface ContentPageProps {

}

export default class ContentPage extends React.Component<ContentPageProps, {}> {
  constructor(props: any) {
    super(props);

    this.makeUser = this.makeUser.bind(this);
  }

  makeUser() {
    axios({
      method: 'get',
      url: localeIp + '/makeUser/',
      responseType: 'json'
    }).catch(err => console.log('getLogin error : ' + err));
  }

  render() {
    return (
      <div className="main-front">
        <Discovery />
        <h1>Welcome</h1>
        <button className="btn btn-primary" style={{ float: 'left' }} onClick={() => this.makeUser()}>
          Make User
          </button>
      </div>
    );
  }
}