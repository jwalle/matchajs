import * as React from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, signup } from '../state/actions/auth';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupFormAll';

export interface HomePageProps {
  isAuth: boolean;
  history: {
      push: Function;
    };
    login: Function;
    signup: Function;
}

export interface HomePageState {
    activeForm: string;
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
        activeForm: 'signup',
    };
  }

  togLogForm = () => this.setState({activeForm: 'login'});
  togSignForm = () => this.setState({activeForm: 'signup'});
  togNoForm = () => this.setState({activeForm: ''});

  submitLogin = (data: any) => this.props.login(data).then(() => this.props.history.push('/'));
  submitSignup = (data: any) => this.props.signup(data).then(() => this.props.history.push('/'));

  render() {
    const {activeForm} = this.state;

    const welcome = (
        <div id="front-middle">
            <div id="front-txt">
                <h2>You are one of us.</h2>
                <h2>Ready to find love ?</h2>
            </div>
            <button onClick={() => this.togSignForm()} className="btn-join btn btn-primary">JOIN US NOW</button>
        </div>
    );
    const loginMiddle = (
        <div id="front-middle">
            <LoginForm submit={this.submitLogin} />
        </div>
    );

    const signupMiddle = (
        <div id="front-middle">
            <SignupForm submit={this.submitSignup} />
        </div>
    );

    const mySwitch = () => {
        switch (activeForm) {
            case 'login':
                return (loginMiddle);
            case 'signup':
                return (signupMiddle);
            default:
                return (welcome);
        }
    };

    // TODO: make the logo;
    return (
    <div className="home-front">
        <div className="front-bg">
            <img src="../public/images/homeFaces3.jpg" alt="bg-public"/>
        </div>
        <div id="front-logo" onClick={() => this.togNoForm()}>
            <h1>Matcha</h1>
        </div>
        {activeForm !== 'login' ? <button
                                    className="btn btn-primary btn-sign"
                                    onClick={() => this.togLogForm()}>Sign in</button>
                                : ''}
        {mySwitch()}
    </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isAuth: !!state.user.token
  };
}

export default connect<any, any>(mapStateToProps, {login, signup})(HomePage);
