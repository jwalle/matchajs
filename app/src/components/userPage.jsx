import React from 'react';
import axios from 'axios';
import { Button, Image, FormControl } from 'react-bootstrap';
import moment from 'moment';


export default class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getAge = this.getAge.bind(this);

        this.state = {
            user: [],
            login: [],
            picture: [],
            location: [],
            age:0,
            gender: 'F'
        }
    }

    componentWillMount () {
        this.getUser();
        this.getAge();
    }

    getAge() {
        let age = parseInt(moment(this.state.user.dob, "YYYY-MM-DD h:mm:ss").fromNow());
        this.setState({ age });
    }


    getUser() {
        let self = this;
        axios({
            method: 'get',
            url: '/getUser',
            responseType: 'json'})
            .then(res => {
                const user = res.data.results[0];
                const login = user.login;
                const picture = user.picture;
                const location = user.location;
                console.log(res.data.results[0]);
                self.setState({ user, login, picture, location });
            })
            .then(this.getAge)
            .catch(err => console.log('error axios user :', err))
    }
    render() {
        const user = this.state.user;
        const login = this.state.login;
        const picture = this.state.picture;
        const location = this.state.location;
        return (
            <div>
                <h1>username : {login.username}</h1>
                <Image
                    src={picture.large}
                    alt='Profil picture'
                    responsive
                />
                <p>{this.state.age} - {user.gender === 'male' ? 'M' : 'F' } - {location.city}</p>

            </div>
        );
    }
};