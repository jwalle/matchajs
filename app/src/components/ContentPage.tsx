import * as React from 'react';
import axios from 'axios';

export interface ContentPageProps {

}

export default class ContentPage extends React.Component<ContentPageProps, {}> {
  constructor(props : any) {
    super(props);

    this.makeUser = this.makeUser.bind(this);
}
  
  makeUser() {
        return axios
            .get('/makeUser')
            .then(res => this.setState({
            }))
            .catch(err => console.log('getLogin error : '  + err));
    }

  componentWillMount () {

  }

  render() {
    return (
      <div>
          <h1>Welcome</h1>
          <button className="btn btn-primary" style={{float:'left'}} onClick={() => this.makeUser()}>
              Make User
          </button>
      </div>
    );
  }
};