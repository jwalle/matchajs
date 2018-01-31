import * as React from 'react';
import axios from 'axios';
import { Button, Image, FormControl } from 'react-bootstrap';
import * as moment from 'moment';
import UserCard from "./userCard";
// import path from 'path';

export interface userPageProps {
    params : any,
    match: any
}

export interface UserPageState {
    user: any,
    picture: any,
    age: any
}

export default class UserPage extends React.Component<userPageProps, UserPageState> {
    constructor(props : any) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getProfilePhoto = this.getProfilePhoto.bind(this);

        this.state = {
            user : [],
            picture: [],
            age: 1
        }
    }

    componentWillMount () {
        this.getUser();
        console.log('COUCOU');
    }

    getAge() {
        let age = parseInt(moment(this.state.user.dob, "YYYY-MM-DD h:mm:ss").fromNow());
        this.setState({ age });
    }

    getProfilePhoto() {
        let self = this;
        axios({
            method: 'get',
            url: '/getProfilePhoto/' + self.state.user.id,
            responseType: 'json'
        })
            .then(res => {
                self.setState({
                    picture : require(`../../data/photos/${res.data[0].link}`)
                });
            })
            .catch(err => console.log('error axios profilePhoto :', err))
    }

    getUser() {
        let self = this;
        axios({
            method: 'get',
            url: '/getUser/' + this.props.match.params.idUser,
            responseType: 'json'
        })
            .then(res => {
                self.setState({
                    user : res.data[0]
                });
            })
            .then(this.getProfilePhoto)
            .then(this.getAge)
            .catch(err => console.log('error axios user :', err))
    }

    render() {
        const user = this.state.user;
        const picture = this.state.picture;
        return (
            picture ?
            <div>
                <h1>username : {user.username}</h1>
                <Image
                    src={picture}
                    alt='Profile picture'
                    responsive
                />
                <p>{this.state.age} - {user.gender === 'male' ? 'M' : 'F' } - {user.city}</p>
                <UserCard
                    user={user}
                    picture={picture}
                    age={this.state.age}
                />
            </div>
                : null
        );
    }
};