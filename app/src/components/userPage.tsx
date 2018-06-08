import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import ProfilBasics from './Profile/ProfileBasics';
// import UserCard from './userCard';
// import GoogleMap from './GoogleMap';
// import GoogleMapReact from 'google-map-react';
import { Flag, Divider, Icon, Button, Image, Container, Dropdown } from 'semantic-ui-react';

require('./userPage.css');
// let googleMap = require('../../public/images/googleMap.png');
// declare var Promise: any;

// const localeIp = "http://localhost/api";
// const localeIp = "http://192.168.99.100/api";
// const localeIp = "http://192.168.99.100/api";
const localeIp = '/api';
// const GOOGLE_API = 'https://maps.google.com/maps/api/geocode/json';
// const GEOCODE_API_KEY = 'AIzaSyBah4ewvWs7mNaM9QaEuc_JwnvrnCCsZ5M';

export interface UserPageProps {
    params: any;
    match: any;
}

export interface UserPageState {
    user: any;
    picture: any;
    age: any;
    mightLike: any;
    center: {
        lat: any,
        lng: any,
    };
    zoom: any;
}

export default class UserPage extends React.Component<UserPageProps, UserPageState> {
    constructor(props: UserPageProps) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getMightLikeUsers = this.getMightLikeUsers.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getProfilePhoto = this.getProfilePhoto.bind(this);
        // this.fromAddress = this.fromAddress.bind(this);

        this.state = {
            user: [],
            picture: [],
            age: 1,
            mightLike: [],
            center: {
                lat: 40.7446790,
                lng: -73.9485420
            },
            zoom: 10
        };
    }

    componentWillMount() {
        this.getUser();
    }

    // fromAddress() {
    //     let address = this.state.user.country + ', ' + this.state.user.city;
    //     let url = `${GOOGLE_API}?address=${encodeURI(address)}&key=${GEOCODE_API_KEY}`;
    //     axios({
    //         method: 'get',
    //         url: url,
    //         responseType: 'json'
    //     }).then((res: any) => {
    //         console.log(res);
    //         const { lat, lng } = res.data.results[0].geometry.location;
    //         this.setState({center: {lat, lng}});
    //     });
    // }

    getAge() {
        let age = parseInt(moment(this.state.user.dob, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);
        this.setState({ age });
    }   

    getMightLikeUsers() {
        let self = this;
        axios({
            method: 'post',
            url: localeIp + '/getMightLike/' + self.state.user.id,
            responseType: 'json'
        })
            .then(res => {
                console.log(res);
                self.setState({
                    mightLike: res.data, // plop
                });
            })
            .catch(err => console.log('error axios mightLikeUSERS :', err));
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
            .then(this.getMightLikeUsers)
            // .then(this.fromAddress)
            .catch(err => console.log('error axios user :', err));
    }

    render() {
        const user = this.state.user;
        const flag = user.nat;
        const picture = this.state.picture;
        const gender = user.gender === 'male' ?
            <Icon color="yellow" name="man" /> : <Icon color="yellow" name="woman" />;

        const blockOptions = [
            { key: 'block', text: 'Block', icon: 'user' },
            { key: 'blockAndReport', text: 'Block and Report', icon: 'settings' },
        ];
        
        return (
            <div>
                <div id="whole-bg" />
                <div id="plop1">
                <img
                    src={typeof(picture) === 'string' ? picture : 'http://via.placeholder.com/160'}
                    alt="background"
                    id="header-bg" // more specific
                /></div>
                
                <header>
                        <img
                         src={typeof(picture) === 'string' ? picture : 'http://via.placeholder.com/160'}
                         alt="Profil picture"
                         className="section-img profile" // more specific
                        />
                        <h1 className="title">{user.firstname} {user.lastname} <Flag name={user.nat} /></h1>
                        <p className="location">{this.state.age} • {gender}• {user.city}, {user.country}</p>
                        {/* <h2>{user.login}<Icon name="circle" color="green" /></h2> */}
                        <div className="options">
                            <a href="#" className="options-link">Something ?</a>
                            <a href="#" className="options-link">Something ?</a>
                            <a href="#" className="options-link options-msg">Message</a>
                            <a href="#" className="options-link">
                                <Icon 
                                    name="star"
                                    // size="big"
                                    className="likeButton"
                                    color="grey"
                                />
                            </a>
                            <a href="#" className="options-link">
                                ...
                            </a>
                        </ div>
                </header>
                <main>
                    <div id="main-bg" />
                    <section>
                        <h2>Who I am</h2>
                        <p>{user.text1}</p>                            
                    </ section>
                    <section>
                        <h2>What I like doing</h2>
                        <p>{user.text2}</p>
                    </section>
                    <section>
                        <h2>What I am looking for</h2>
                        <p>{user.text3}</p>                            
                    </section>
                    <section>
                        <h2>About me</h2>
                        <ProfilBasics user={user} />
                    </section>
                    <section>
                        <img className="section-img" src="../../public/images/googleMap.png" alt="google PAM" />
                    </section>
                        {/* <GoogleMap center={this.state.center} zoom={this.state.zoom}/> */}
                        <section>
                            <h2>My interest</h2>                        
                            <Icon size="big" id="interestsIcon" color="grey" name="reddit alien"/>
                            <p>Foot, Computer, Science, Video Games, Music, ...</p> 
                        </ section>
                        <section>
                        <h2>You might also like</h2>                        
                            <div className="mightLikeUser">
                                <a href="/profile" className="mightLikeUserImage">
                                    <span className="mightLikeUserThumb">
                                        <img src="http://via.placeholder.com/120x120" alt="pseudo here" />
                                    </span>
                                </a>
                            </div>
                            <div className="mightLikeUser">
                                <a href="/profile" className="mightLikeUserImage">
                                    <span className="mightLikeUserThumb">
                                        <img src="http://via.placeholder.com/120x120" alt="pseudo here" />
                                    </span>
                                </a>
                            </div>
                            <div className="mightLikeUser">
                                <a href="/profile" className="mightLikeUserImage">
                                    <span className="mightLikeUserThumb">
                                        <img src="http://via.placeholder.com/120x120" alt="pseudo here" />
                                    </span>
                                </a>
                            </div>
                            <div className="mightLikeUser">
                                <a href="/profile" className="mightLikeUserImage">
                                    <span className="mightLikeUserThumb">
                                        <img src="http://via.placeholder.com/120x120" alt="pseudo here" />
                                    </span>
                                </a>
                            </div>
                            <div className="mightLikeUser">
                                <a href="/profile" className="mightLikeUserImage">
                                    <span className="mightLikeUserThumb">
                                        <img src="http://via.placeholder.com/120x120" alt="pseudo here" />
                                    </span>
                                </a>
                            </div>
                            <div className="mightLikeUser">
                                <a href="/profile" className="mightLikeUserImage">
                                    <span className="mightLikeUserThumb">
                                        <img src="http://via.placeholder.com/120x120" alt="pseudo here" />
                                    </span>
                                </a>
                            </div>
                    </ section>
                </main>
            </div>
        );
    }
}
