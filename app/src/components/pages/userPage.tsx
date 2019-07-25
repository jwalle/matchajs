import * as React from 'react';
import axios from 'axios';
const path = require('path');
import * as moment from 'moment';
import ProfilBasics from '../Profile/ProfileBasics';
import MatchaMap from '../misc/matchaMap';
import { Flag, Icon, Button, Image, Container, Dropdown, Loader, Modal, Header, Popup } from 'semantic-ui-react';
import Api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faTimes, faEnvelope, faImages, faStar, faTags } from '@fortawesome/free-solid-svg-icons';
import LoadingPage from './LoadingPage';

const PHOTOS_DIR = path.resolve(__dirname, '../data/photos/');

export interface UserPageProps {
    params: any;
    match: any;
}

export interface UserPageState {
    user: any;
    loading: boolean;
    age: any;
    mightLike: any;
    center: {
        lat: any,
        lng: any,
    };
    zoom: any;
    openModal: boolean;
}

export default class UserPage extends React.Component<UserPageProps, UserPageState> {
    constructor(props: UserPageProps) {
        super(props);

        this.getMightLikeUsers = this.getMightLikeUsers.bind(this);
        // this.fromAddress = this.fromAddress.bind(this);

        this.state = {
            user: undefined,
            openModal: false,
            loading: true,
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

    close = () => this.setState({ openModal: false });
    open = () => this.setState({ openModal: true });
    report = () => {
        // Api.user.reportUser(this.state.user.id);
        this.close();
        history.back();
    }

    updateUserRelation = (Type: number) => {
        Api.user.updateUserRelation(this.state.user.id, Type)
            .then((res) => this.setState({
                user: {
                    ...this.state.user,
                    ...res
                }
            }))
            .catch((err: any) => console.log('error like :', err));
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

    getAge = () => {
        let age = parseInt(moment(this.state.user.dob, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);
        this.setState({ age });
    }

    getMightLikeUsers() {
        let self = this;
        Api.user.getMightLike()
            .then(res => {
                console.log(res);
                self.setState({
                    mightLike: res.data, // plop
                    loading: false,
                });
            })
            .catch(err => console.log('error axios mightLikeUSERS :', err));
    }

    getUser = () => {
        const UserID = this.props.match.params.idUser;
        Api.user.getUserProfile(UserID)
            .then(res => {
                this.setState({
                    user: res.user[0]
                });
            })
            .then(this.getAge)
            .then(this.getMightLikeUsers)
            // .then(this.fromAddress)
            .catch(err => console.log('error axios user :', err));
    }

    render() {
        const { user, loading } = this.state;
        if (loading) { return <LoadingPage />; }
        const flag = user.nat;
        const pos = user.photos.findIndex((i: any) => i.isProfil === 1);
        const { relation } = user;
        let picture = 'http://via.placeholder.com/100x100';
        if (user && user.photos && user.photos[pos].link) {
            picture = 'http://localhost:3000' + `/photos/${user.login}/${user.photos[pos].link}`;
        }
        const gender = user.gender === 'male' ?
            <Icon color="yellow" name="man" /> : <Icon color="yellow" name="woman" />;

        const blockOptions = [
            { key: 'block', text: 'Block', icon: 'user' },
            { key: 'blockAndReport', text: 'Block and Report', icon: 'settings' },
        ];

        const ReportModal = () => (
            <Modal dimmer="blurring"
                className="reportModal"
                size="small"
                open={this.state.openModal}
                onClose={this.close}
                basic
            >
                <Modal.Content>
                    <p>Are you sure you want to report this user ?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="grey" onClick={this.close}>
                        <Icon name="remove" /> No
                </Button>
                    <Button color="red" onClick={this.report}>
                        <Icon name="checkmark" /> Report
                </Button>
                </Modal.Actions>
            </Modal>
        );

        const style = {
            borderRadius: 0,
            opacity: 0.7,
            padding: '1em',
            zIndex: 9999,
        };

        const Options = [{
            action: this.open,
            icon: faFlag,
            className: '',
            content: 'Report User'
        }, {
            action: relation === 2 ? () => this.updateUserRelation(0) : () => this.updateUserRelation(2),
            icon: faTimes,
            className: relation === 2 ? 'option-blocked' : '',
            content: relation === 2 ? 'Unblock User' : 'Block User'
        }, {
            action: this.open,
            icon: faImages,
            className: '',
            content: 'Gallery',
        }, {
            action: relation === 1 ? () => this.updateUserRelation(0) : () => this.updateUserRelation(1),
            icon: faStar,
            className: relation === 1 ? 'option-liked' : '',
            content: relation === 1 ? 'Unlike User' : 'Like User'
        }, {
            action: this.open,
            icon: faEnvelope,
            className: '',
            content: 'Message User'
        }
        ];

        return (
            <div>
                <ReportModal />
                <div id="whole-bg" />
                <div id="plop1">
                    <img
                        src={typeof (picture) === 'string' ? picture : 'http://via.placeholder.com/160'}
                        alt="background"
                        id="header-bg" // more specific
                    /></div>
                <header>
                    <img
                        src={typeof (picture) === 'string' ? picture : 'http://via.placeholder.com/160'}
                        alt="Profil picture"
                        className="section-img profile" // more specific
                    />
                    <h1 className="title">{user.firstname} {user.lastname} <Flag name={user.nat} /></h1>
                    <p className="location">{this.state.age} • {gender}• {user.city}, {user.country}</p>
                    {/* <h2>{user.login}<Icon name="circle" color="green" /></h2> */}
                    <div className="options">
                        {Options.map((option, index) => {
                            return <Popup
                                key={index}
                                trigger={<a onClick={option.action} className={option.className}>
                                    <FontAwesomeIcon icon={option.icon} /></a>}
                                content={option.content}
                                style={style}
                                position={option.content === 'Gallery' ? 'bottom center' : 'top center'}
                                inverted
                            />;
                        })}
                    </ div>
                </header>
                <main id="userPageMain">
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
                    <section style={{ padding: 0 }}>
                        <MatchaMap />
                        {/* <img className="section-img" src="../../data/images/googleMap.png" alt="google PAM" /> */}
                    </section>
                    {/* <GoogleMap center={this.state.center} zoom={this.state.zoom}/> */}
                    <section>
                        <h2>My interest</h2>
                        <p><FontAwesomeIcon icon={faTags} /> Foot, Computer, Science, Video Games, Music, ...</p>
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
