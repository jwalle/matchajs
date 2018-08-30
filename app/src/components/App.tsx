import * as React from 'react';
import NavigationBar from './navigationBar/navigation';
import { loginFromToken } from './state/actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// let backGround = require('../../public/images/signupBackground.jpeg');

interface AppProps {
  children: any;
  isAuth: boolean;
  loginFromToken: Function;
}

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);    
  }

  componentWillMount() {
    this.props.loginFromToken();
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
      isAuth: !!state.user.token,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { loginFromToken }, dispatch);
};

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(App);
