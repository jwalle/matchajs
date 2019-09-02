import * as React from 'react';
import axios from 'axios';
const path = require('path');
import MatchaMap from '../misc/matchaMap';
import { Flag, Icon, Button, Image, Container, Dropdown, Loader, Modal, Header, Popup } from 'semantic-ui-react';
import Api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faTimes, faEnvelope, faImages, faStar, faTags, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import LoadingPage from './LoadingPage';
import { getAge } from '../../helpers/userTools';
import { getUserProfil } from '../../helpers/photosTools';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import CircularProgressbar from '../misc/CircularProgressBar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';
import ProfileBasics from '../Profile/ProfileBasics';
import UserHeader from '../Profile/UserHeader';

export interface UserPageProps {
    params: any;
    match: any;
    location: any;
}

export interface UserPageState {
    user: any;
    percentage: number;
    loading: boolean;
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

        this.state = {
            user: undefined,
            percentage: 0,
            openModal: false,
            loading: true,
            mightLike: [],
            center: {
                lat: 40.7446790,
                lng: -73.9485420
            },
            zoom: 10
        };
    }

    componentWillMount() {
        if (!this.getUserFromProps()) {
            this.getUser();
        }
        console.log('PLOP ==> ', this.props.location.state);
    }

    componentDidMount() {
        setTimeout(() => this.setState({ percentage: 60 }), 1000);
    }

    close = () => this.setState({ openModal: false });
    open = () => this.setState({ openModal: true });
    report = () => {
        // Api.user.reportUser(this.state.user.id);
        this.close();
        history.back();
    }

    getUserFromProps = () => {
        const user = this.props.location && this.props.location.state;
        console.log('BORDEL = ', user);
        if (user) {
            console.log('coucou');
            this.setState({ user });
            return true;
        }
        return false;
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

    getMightLikeUsers = () => {
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
            .then(this.getMightLikeUsers)
            // .then(this.fromAddress)
            .catch(err => console.log('error axios user :', err));
    }

    render() {
        const { user } = this.state;
        const { info, album, tags, location, relation } = user;
        const picture = getUserProfil(user);
        const percentage = 66;

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
                        src={picture}
                        alt="background"
                        id="header-bg" // more specific
                    /></div>
                <header>
                    <div className="header-infos">
                        <UserHeader user={user} />
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
                    </div>
                </header>
                <main id="userPageMain">
                    <div id="main-bg" />
                    <section>
                        <h2>Who I am</h2>
                        <p>{info.text1}</p>
                    </ section>
                    <section>
                        <h2>What I like doing</h2>
                        <p>{info.text2}</p>
                    </section>
                    <section>
                        <h2>What I am looking for</h2>
                        <p>{info.text3}</p>
                    </section>
                    <section>
                        <h2>About me</h2>
                        <ProfileBasics user={user} />
                    </section>
                    <section style={{ padding: 0 }}>
                        <MatchaMap />
                        {/* <img className="section-img" src="../../data/images/googleMap.png" alt="google PAM" /> */}
                    </section>
                    {/* <GoogleMap center={this.state.center} zoom={this.state.zoom}/> */}
                    <section>
                        <h2>My interest</h2>
                        {/* <p>{tags.map((tag: any, i: number) => tag.tag + i !== tags.length ? ', ' : ''}</p> */}
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