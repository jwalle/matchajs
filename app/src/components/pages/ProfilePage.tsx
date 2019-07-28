import * as React from 'react';
import * as moment from 'moment';
import ProfilBasicsEdit from '../Profile/ProfileBasicsEdit';
import MatchaMap from '../misc/matchaMap';
import { Flag, Icon, TextAreaProps } from 'semantic-ui-react';
import Api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import LoadingPage from './LoadingPage';
import { connect } from 'react-redux';

export interface UserProfileProps {
    user: any;
    loading: boolean;
}

export interface UserProfileState {
    center: {
        lat: any,
        lng: any,
    };
    zoom: any;
    openModal: boolean;
    textOneOpen: boolean;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
    _tOne!: HTMLTextAreaElement;
    constructor(props: UserProfileProps) {
        super(props);

        // this.fromAddress = this.fromAddress.bind(this);

        this.state = {
            openModal: false,
            textOneOpen: false,
            center: {
                lat: 40.7446790,
                lng: -73.9485420
            },
            zoom: 10
        };
    }

    componentWillMount() {
        //
    }

    close = () => this.setState({ openModal: false });
    open = () => this.setState({ openModal: true });
    toggleTextOne = async () => {
        await this.setState({ textOneOpen: !this.state.textOneOpen });
        if (this._tOne) {
            this._tOne.focus();
        }
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
        return parseInt(moment(this.props.user.dob, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);
    }

    render() {
        const { user, loading } = this.props;
        const { textOneOpen } = this.state;
        if (loading) { return <LoadingPage />; }
        const pos = user.photos.findIndex((i: any) => i.isProfil === 1);
        let picture = 'http://via.placeholder.com/100x100';
        if (user && user.photos && user.photos[pos].link) {
            picture = 'http://localhost:3000' + `/photos/${user.login}/${user.photos[pos].link}`;
        }
        const gender = user.gender === 'male' ?
            <Icon color="yellow" name="man" /> : <Icon color="yellow" name="woman" />;

        return (
            <div>
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
                    <p className="location">{this.getAge()} • {gender}• {user.city}, {user.country}</p>
                    {/* <h2>{user.login}<Icon name="circle" color="green" /></h2> */}
                    <div className="options" />
                </header>
                <main id="userPageMain">
                    <div id="main-bg" />
                    {textOneOpen
                        ? <section className="section-focus">
                            <h2>Who I am</h2>
                            <textarea
                                className="textAreaSection"
                                ref={(ref) => { this._tOne = ref as HTMLTextAreaElement; }}
                                defaultValue={user.text1} />
                            <div className="textAreaButtons">
                                <button className="cancelButton" onClick={this.toggleTextOne}>Cancel</button>
                                <button className="saveButton">Save</button>
                            </div>
                        </section>
                        : <section className="section-clickable">
                            <h2>Who I am</h2>
                            <div onClick={this.toggleTextOne}><p>{user.text1}</p></div>
                        </section>
                    }
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
                        <ProfilBasicsEdit user={user} />
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
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    loading: state.user.loading,
    user: state.user.user
});

export default connect<UserProfileProps>(mapStateToProps)(UserProfile);