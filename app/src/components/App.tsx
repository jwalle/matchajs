import * as React from 'react';
import NavigationBar from './navigationBar/navigation';
import { connect } from 'react-redux';
// let backGround = require('../../public/images/signupBackground.jpeg');
require('./App.css');

interface AppProps {
  children: any;
  isAuth: boolean;  
}

class App extends React.Component<AppProps, {}> {
  constructor(props: any) {
    super(props);    
  }

  render() {
    let isAuth = this.props.isAuth;
    let style = isAuth ? 'user-container' : 'guest-container';

    return (
      <div id="ui container">
      {isAuth ? <NavigationBar /> : ''}
        <div className={style}>
          {this.props.children}
        </div>
        <footer className="footer">&copy; 2017 - jwalle</footer>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
      isAuth: !!state.user.token
  };
}

export default connect<any, any>(mapStateToProps, {})(App);
