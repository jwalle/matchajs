import React from 'react';
import axios from 'axios';
import UserPage from './userPage.jsx';

export default class ContentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    }
  }

  componentWillMount () {
  }

  render() {
    return (
      <div>
          <h1>Welcome</h1>
          <UserPage/>
      </div>
    );
  }
};