import * as React from 'react';
import NavigationBar from './NavigationBar';
import { loginFromToken } from './state/actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';

interface AppProps {
  children: any;
  loading: boolean;
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
    const { isAuth, loading } = this.props;
    const style = isAuth ? 'user-container' : 'guest-container';

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
    loading: !!state.user.loading,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { loginFromToken }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
