import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import UserCard from './userCard';

// const localeIp = "http://localhost/api";
// const localeIp = "http://192.168.99.100/api";
// const localeIp = "http://192.168.99.100/api";
const localeIp = '/api';

export interface UserPageProps {
    params: any;
    match: any;
}

export interface UserPageState {
    user: any;
    picture: any;
    age: any;
}

export default class UserPage extends React.Component<UserPageProps, UserPageState> {
    constructor(props: UserPageProps) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getProfilePhoto = this.getProfilePhoto.bind(this);

        this.state = {
            user: [],
            picture: [],
            age: 1
        };
    }

    componentWillMount() {
        this.getUser();
        console.log('COUCOU');
    }

    getAge() {
        let age = parseInt(moment(this.state.user.dob, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);
        this.setState({ age });
    }

    getProfilePhoto() {
        let self = this;
        axios({
            method: 'get',
            url: localeIp + '/getProfilePhoto/' + self.state.user.id,
            responseType: 'json'
        })
            .then(res => {
                self.setState({
                    picture: require(`../../data/photos/${res.data[0].link}`), // plop
                });
            })
            .catch(err => console.log('error axios profilePhoto :', err));
    }

    getUser() {
        let self = this;
        axios({
            method: 'get',
            url: localeIp + '/getUser/' + this.props.match.params.idUser,
            responseType: 'json'
        })
            .then(res => {
                self.setState({
                    user: res.data.user[0]
                });
            })
            .then(this.getProfilePhoto)
            .then(this.getAge)
            .catch(err => console.log('error axios user :', err));
    }

    render() {
        const user = this.state.user;
        const picture = this.state.picture;
        return (
            picture ? (
                <div>
                    <p>{this.state.age} - {user.gender === 'male' ? 'M' : 'F'} - {user.city}</p>
                    <UserCard
                        user={user}
                        picture={picture}
                        age={this.state.age}
                    />
                </div>
            ) : null
        );
    }
}