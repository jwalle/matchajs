import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import UserCard from './userCard';
import { Divider, Icon, Button, Image, Container } from 'semantic-ui-react';
require('./userPage.css');
let googleMap = require('../../public/images/googleMap.png');
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
                        <p>{this.state.age} - {user.gender === 'male' ? 'M' : 'F'} - {user.city}</p>
                        <p>{user.city}, {user.country}</p>
                    </div>
                    <div className="topIcons">
                        <Icon 
                            name="like"
                            toggle 
                            size="huge"
                            className="likeButton"
                            color="grey"
                        />
                        <Icon.Group size="huge">
                            <Icon color="grey" name="user" />
                            <Icon size="large" color="blue" name="dont" />
                        </Icon.Group>
                    </div>
                </div>
                <div id="middleUserPage" />
                <div id="middleCentralContainer">
                   <Container id="texts">
                    <div id="textOne">
                            <h3>Who I am</h3>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate modi quisquam eum corporis, voluptate neque? Aliquid eum voluptatem commodi temporibus. Repellat similique modi praesentium omnis ad temporibus, sed, illum voluptates animi iusto hic unde? Fugiat, suscipit ex! Iste doloremque laborum maxime perferendis deleniti architecto iure soluta assumenda. Fugit, sed quas modi unde facere eum minima deserunt earum suscipit blanditiis laborum soluta ad cumque similique repellat, vitae sequi aut quibusdam exercitationem? Vero tenetur nesciunt aspernatur saepe quo corporis cum fuga maiores eveniet accusantium dignissimos, quia deleniti inventore, consequatur repellendus voluptates ipsa porro quasi numquam dolores quaerat neque quisquam obcaecati! Saepe, quasi.</p>
                        </div>
                        <div id="textOne">
                            <h3>What I like doing</h3>                
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate modi quisquam eum corporis, voluptate neque? Aliquid eum voluptatem commodi temporibus. Repellat similique modi praesentium omnis ad temporibus, sed, illum voluptates animi iusto hic unde? Fugiat, suscipit ex! Iste doloremque laborum maxime perferendis deleniti architecto iure soluta assumenda. Fugit, sed quas modi unde facere eum minima deserunt earum suscipit blanditiis laborum soluta ad cumque similique repellat, vitae sequi aut quibusdam exercitationem? Vero tenetur nesciunt aspernatur saepe quo corporis cum fuga maiores eveniet accusantium dignissimos, quia deleniti inventore, consequatur repellendus voluptates ipsa porro quasi numquam dolores quaerat neque quisquam obcaecati! Saepe, quasi.</p>
                        </div>
                        <div id="textOne">
                            <h3>What I am looking for</h3>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate modi quisquam eum corporis, voluptate neque? Aliquid eum voluptatem commodi temporibus. Repellat similique modi praesentium omnis ad temporibus, sed, illum voluptates animi iusto hic unde? Fugiat, suscipit ex! Iste doloremque laborum maxime perferendis deleniti architecto iure soluta assumenda. Fugit, sed quas modi unde facere eum minima deserunt earum suscipit blanditiis laborum soluta ad cumque similique repellat, vitae sequi aut quibusdam exercitationem? Vero tenetur nesciunt aspernatur saepe quo corporis cum fuga maiores eveniet accusantium dignissimos, quia deleniti inventore, consequatur repellendus voluptates ipsa porro quasi numquam dolores quaerat neque quisquam obcaecati! Saepe, quasi.</p>
                        </div>
                    </Container>
                    <Container id="rightMiddleContainer">
                        <div id="googleMapContainer">
                            <Image  
                                src={googleMap}
                                alt="googleMap picture"
                            />
                        </div>
                        <Divider />                        
                        <Container id="interests">
                            <Icon size="big" id="interestsIcon" color="grey" name="reddit alien"/>
                            <p>Foot, Computer, Science, Video Games, Music, ...</p> 
                        </ Container>
                        <Divider />
                        <Container id="interests">
                            <Icon size="big" id="interestsIcon" color="grey" name="reddit alien"/>
                            <p>Foot, Computer, Science, Video Games, Music, ...</p> 
                        </ Container>
                        <Divider />                        
                        <Container id="interests">
                            <Icon size="big" id="interestsIcon" color="grey" name="reddit alien"/>
                            <p>Foot, Computer, Science, Video Games, Music, ...</p> 
                        </ Container>
                    </ Container>
                </div>
            </div>
        );
    }
}