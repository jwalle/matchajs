import React from 'react';
import axios from 'axios';

export default class ContentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    }
  }

  componentWillMount () {
    this.getUser();
  }

  getUser() {
    let self = this;
    axios.get(`/getUser`)
         .then(res => {
           const user = res.data;
           self.setState({ user });
         })
        .catch(err => console.log('error axios user :', err))
  }

  render() {
    return (
      <div>
          <h1>Content goes here !!!!</h1>
          <p> {this.state.user} </p>
      </div>
    );
  }
};