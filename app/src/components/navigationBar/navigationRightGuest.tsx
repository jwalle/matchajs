import * as React from 'react';

export default class NavigationBar extends React.Component {

    render() {
        return (
            <div className="top_signup_right">
                <p>Already have an account ?</p>
                <a href="/#/login" className="navGuestLogin">
                    <span className="navLoginImage">
                        <h2>Login</h2>
                    </span>
                </a>
            </div>
        );
    }
}