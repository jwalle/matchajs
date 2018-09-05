import * as React from 'react';
import * as moment from 'moment';
import axios from 'axios';
import UpdateUserInfoForm from '../forms/UpdateUserInfoForm';
import FormBio from '../forms/FormBio';
import ProfilBasics from '../Profile/ProfileBasics';
import * as formTypes from '../forms/formTypes';
import { Form, Flag, Divider, Icon, Button, Image, Container, Modal, Input } from 'semantic-ui-react';

// declare var Promise: any;

// const username = 'silvermeercat438';
const id = 2;

export interface ProfilePageProps {
    params: any;
    match: any;
}

export interface ProfilePageState {
    user: any;
    picture: any;
    age: any;
    modalOpen: boolean;
}

export default class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
    constructor(props: ProfilePageProps) {
        super(props);

        this.getUser = this.getUser.bind(this);
        this.getProfilePhoto = this.getProfilePhoto.bind(this);

        this.state = {
            user: {},
            picture: [],
            age: 1,
            modalOpen: false,
        };
    }

    componentWillMount() {
        this.getUser(); 
    }

    handleOpen = () => this.setState({ modalOpen: true });
    
    handleClose = () => this.setState({ modalOpen: false });

    getAge = () => {
        let age = parseInt(moment(this.state.user.dob, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);
        this.setState({ age });
    }

    getProfilePhoto() {
        let self = this;
        axios({
            method: 'get',
            url: '/api/getProfilePhoto/' + self.state.user.id,
            responseType: 'json'
        })
            .then(res => {
                self.setState({
                    picture: `../../../data/photos/${res.data[0].link}`, // plop
                });
            })
            .catch(err => console.log('error axios profilePhoto :', err));
    }

    // Add a "0" to month numb  er if < 10
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
            url: '/api/getUser/' + id,
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

    submitUserInfo = (data: formTypes.ErrorsForm) =>  {
        let self = this;
        axios({
            method: 'post',
            url: '/api/updateUserInfo',
            data: data
        }).then(res => {
            if (res.status === 200) {
                self.handleClose();
                self.getUser();
            }
        }).catch(err => console.log('error axios updateUserInfo :', err));
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

        const topInfo = (   
            <div id="topInfoProfile" onClick={this.handleOpen}>
                    <div id="login"><h2>{user.login}</h2></div>
                    <div id="name"><h3>{user.firstname}, {user.lastname}</h3></ div>
                    <div id="natAgeGender">
                        <h3><Flag name={user.nat} /> - {this.state.age} - {user.gender === 'male' ? 'M' : 'F'}</h3>
                    </div>
                    <div id="location"><p>{user.city}, {user.country}</p></div>
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
                    open={this.state.modalOpen}
                    header="Change your info :" 
                    content={
                    <UpdateUserInfoForm 
                        handleClose={this.handleClose} 
                        data={this.state.user}
                        submit={this.submitUserInfo}
                    />} 
                />
                </div>
                <div id="middleUserPage" />
                <div id="middleCentralContainer">
                   <Container id="texts">
                    <FormBio
                        updateBio={this.submitUserInfo} 
                        bioTitle="Who I am"
                        bioID="text1"
                        data={this.state.user}
                    />
                    <FormBio
                        updateBio={this.submitUserInfo} 
                        bioTitle="What I like doing"
                        bioID="text2"
                        data={this.state.user}
                    />
                    <FormBio
                        updateBio={this.submitUserInfo} 
                        bioTitle="What I am looking for"
                        bioID="text3"
                        data={this.state.user}
                    />
                    </Container>
                    <Container id="rightMiddleContainer">
                        <ProfilBasics user={user} />
                        <Container id="interests">
                            <Icon size="big" id="interestsIcon" color="grey" name="reddit alien"/>
                            <p>Foot, Computer, Science, Video Games, Music, ...</p> 
                        </ Container>
                        <Divider />
                    </ Container>
                </div>
            </div>
        );
    }
}
