import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import UserCard from './userCard';
import GoogleMap from './GoogleMap';
import GoogleMapReact from 'google-map-react';
import { Flag, Divider, Icon, Button, Image, Container, Dropdown } from 'semantic-ui-react';

require('./userPage.css');
// let googleMap = require('../../public/images/googleMap.png');
declare var Promise: any;

// const localeIp = "http://localhost/api";
// const localeIp = "http://192.168.99.100/api";
// const localeIp = "http://192.168.99.100/api";
const localeIp = '/api';
const GOOGLE_API = 'https://maps.google.com/maps/api/geocode/json';
const GEOCODE_API_KEY = 'AIzaSyCNJVMNhLakYTPWaGuCmRjs9nX83f41d9k';

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
        this.fromAddress = this.fromAddress.bind(this);

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

    fromAddress() {
        let address = this.state.user.country + ', ' + this.state.user.city;
        let url = `${GOOGLE_API}?address=${encodeURI(address)}&key=${GEOCODE_API_KEY}`;
        axios({
            method: 'get',
            url: url,
            responseType: 'json'
        }).then((res: any) => {
            console.log(res);
            const { lat, lng } = res.data.results[0].geometry.location;
            this.setState({center: {lat, lng}});
        });
    }

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
            .then(this.fromAddress)
            .catch(err => console.log('error axios user :', err));
    }

    render() {
        const user = this.state.user;
        const flag = user.nat;
        const picture = this.state.picture;
        const trigger = (
            <Icon.Group size="big">
                <Icon color="grey" name="user" />
                <Icon size="large" color="blue" name="dont" />
            </Icon.Group>
          );

        const blockOptions = [
            { key: 'block', text: 'Block', icon: 'user' },
            { key: 'blockAndReport', text: 'Block and Report', icon: 'settings' },
        ];

        const orientation = () => {
            if (user.orientation === 's') {
                return('Straight');
            }
            if (user.orientation === 'g') {
                return('Gay');
            }
            if (user.orientation === 'b') {
                return('Bi');
            }
        };

        return (
            <div className="main-container">
                <div id="topUserPage" />
                <div id="topCentralContainer">
                    <div  className="userImage">
                        <Image
                         src={typeof(picture) === 'string' ? picture : 'http://via.placeholder.com/160'}
                         alt="Profil picture"
                        />
                    </div>
                    <div id="topInfo">
                        <Container id="login">
                            <h2>{user.login}<Icon name="circle" color="green" /></h2>
                            {/* <Icon name="circle notched" color="grey"/> */}{/* TODO: isConnected or not*/} 
                        </ Container>
                        <h3>
                            <Flag name={user.nat} />
                            {this.state.age} - {user.gender === 'male' ? 'M' : 'F'}
                        </h3>
                        <p>{user.city}, {user.country}</p>
                    </div>
                    <div className="topIcons">
                        <Icon
                            name="comments"
                            size="big"
                            color="blue"
                        />
                        <Icon 
                            name="like"
                            size="big"
                            className="likeButton"
                            color="grey"
                        />
                        <Dropdown trigger={trigger} options={blockOptions} pointing="top left" icon={null} />
                    </div>
                </div>
                <div id="middleUserPage" />
                <div id="middleCentralContainer">
                   <Container id="texts">
                    <div id="textOne">
                            <h3>Who I am</h3>
                            <p>{user.text1}</p>                            
                        </div>
                        <div id="textOne">
                            <h3>What I like doing</h3>
                            <p>{user.text2}</p>
                        </div>
                        <div id="textOne">
                            <h3>What I am looking for</h3>
                            <p>{user.text3}</p>                            
                        </div>
                    </Container>
                    <Container id="rightMiddleContainer">
                        <GoogleMap center={this.state.center} zoom={this.state.zoom}/>
                        <Container id="interests">
                            <div className="flex">
                                <p>Size : {user.size} cm</p> 
                                <p>Has kids : {user.kids ? 'Yes' : 'No'}</p> 
                                <p>Orientation : {orientation()}</p> 
                            </ div>
                        </ Container>
                        <Divider />
                        <Container id="interests">
                            <Icon size="big" id="interestsIcon" color="grey" name="reddit alien"/>
                            <p>Foot, Computer, Science, Video Games, Music, ...</p> 
                        </ Container>
                        <Divider />
                        <Container id="interests">
                            <Icon size="big" id="interestsIcon" color="grey" name="world"/>
                            <Container>
                                <p>Ethnicity : {user.ethnicity}</p> 
                                <p>Religion : {user.religion}</p> 
                                <p>Status : {user.status}</p>
                            </ Container>
                        </ Container>
                        <Divider />                        
                        <Container id="interests">
                            <Icon size="big" id="interestsIcon" color="grey" name="bar"/>
                            <Container>
                                <p>Smoke : {user.smoke}</p>
                                <p>Drink : {user.drink}</p>
                                <p>Drugs : {user.drugs}</p>
                                <p>Diet : {user.diet}</p>
                            </ Container>
                        </ Container>
                        <Divider />
                        <h2>You might like :</h2>
                        <Container id="mightLike">
                            <div className="mightLikeUser">
                                <a href="/profile   " className="mightLikeUserImage">
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
                        </ Container>
                    </ Container>
                </div>
            </div>
        );
    }
}
