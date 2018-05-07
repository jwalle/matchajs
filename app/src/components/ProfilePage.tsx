import * as React from 'react';
import * as moment from 'moment';
import axios from 'axios';
import UpdateUserInfoForm from './forms/UpdateUserInfoForm';
import { Form, Flag, Divider, Icon, Button, Image, Container, Dropdown, Modal, Input } from 'semantic-ui-react';
require('./styles/profilePage.css');

// declare var Promise: any;

const localeIp = '/api';
const username = 'browntiger669';

export interface ProfilePageProps {
    params: any;
    match: any;
}

export interface ProfilePageState {
    user: any;
    picture: any;
    age: any;
}

export default class UserPage extends React.Component<ProfilePageProps, ProfilePageState> {
    constructor(props: ProfilePageProps) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getProfilePhoto = this.getProfilePhoto.bind(this);

        this.state = {
            user: {},
            picture: [],
            age: 1,
        };
    }

    componentWillMount() {
        this.getUser();
    }

    getAge = () => {
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

    // Add a "0" to month number if < 10
    padDateNumber = (dateNumber: string) => {
        if (parseInt(dateNumber, 10) < 10) {
            dateNumber = '0' + dateNumber;
        }
        return dateNumber;
    }

    getBirthdayObject = () => {
        const dobMoment = moment(this.state.user.dob, 'YYYY-MM-DD h:mm:ss');
        let user = this.state.user;
        let birthday = {
            day: dobMoment.day(),
            month: this.padDateNumber(dobMoment.month().toString()),
            year: dobMoment.year(),
        };
        user.birthday = birthday;
    }

    getUser() {
        let self = this;
        axios({
            method: 'get',
            url: localeIp + '/getUser/' + username,
            responseType: 'json'
        })
            .then(res => {
                self.setState({
                    user: res.data.user[0]
                });
            })
            .then(this.getProfilePhoto)
            .then(this.getAge)
            .then(this.getBirthdayObject)
            .catch(err => console.log('error axios user :', err));
    }

    submitUserInfo = (data: any) =>  {
        let self = this;
        axios({
            method: 'post',
            url: localeIp + '/updateUserInfo',
            data: data
        }).catch(err => console.log('error axios updateUserInfo :', err));
    }

    render() {
        const user = this.state.user;
        console.log(user);
        const flag = user.nat;
        const picture = this.state.picture;
        const trigger = (
            <Icon.Group size="big">
                <Icon color="grey" name="user" />
                <Icon size="large" color="blue" name="dont" />
            </Icon.Group>
          );

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

        const topInfo = (   
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
            );

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
                <Modal
                    size="small" 
                    trigger={topInfo} 
                    header="Change your info :" 
                    content={<UpdateUserInfoForm data={this.state.user} submit={this.submitUserInfo}/>} 
                />
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
                    </ Container>
                </div>
            </div>
        );
    }
}
