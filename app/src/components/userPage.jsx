import React from 'react';
import axios from 'axios';
import { Button, Image, FormControl } from 'react-bootstrap';
import moment from 'moment';
import UserCard from "./userCard.jsx";

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getAge = this.getAge.bind(this);

        this.state = {
            user : [],
            pictures: [],
            age: 1
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
            url: '/getUser/' + this.props.params.idUser,
            responseType: 'json'
        })
            .then(res => {
                self.setState({
                    user : res.data[0],
                    pictures : res.data[0].picture
                });
            })
            .then(this.getAge)
            .catch(err => console.log('error axios user :', err))
    }
    render() {
        const user = this.state.user;
        const pictures = this.state.pictures;
        return (
            <div>
                <h1>username : {user.username}</h1>
                <Image
                    src={pictures.large}
                    alt='Profil picture'
                    responsive
                />
                <p>{this.state.age} - {user.gender === 'male' ? 'M' : 'F' } - {user.city}</p>
                <UserCard
                    user={user}
                    picture={pictures.large}
                    age={this.state.age}
                />
            </div>
        );
    }
};