import * as React from 'react';
import ProfilBasicsEdit from '../Profile/ProfileBasicsEdit';
import MatchaMap from '../misc/matchaMap';
import { Flag, Icon, Dropdown } from 'semantic-ui-react';
import LoadingPage from './LoadingPage';
import { connect } from 'react-redux';
import { getUserProfil } from '../../helpers/photosTools';
import { getAge } from '../../helpers/userTools';
import { UserProfileProps } from '../forms/formTypes';
import { updateUserTraitsDispatch } from '../state/actions/users';
import { bindActionCreators } from 'redux';
import api from '../../services/api';
import * as _ from 'lodash';

export interface ProfileProps {
    user: UserProfileProps;
    updateUserTraitsDispatch: Function;
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
    otherTags: any;
}

class UserProfile extends React.Component<ProfileProps, UserProfileState> {
    _tOne!: HTMLTextAreaElement;
    constructor(props: ProfileProps) {
        super(props);

        // this.fromAddress = this.fromAddress.bind(this);

        this.state = {
            openModal: false,
            textOneOpen: false,
            center: {
                lat: 40.7446790,
                lng: -73.9485420
            },
            zoom: 10,
            otherTags: undefined,
        };
    }

    componentWillMount() {
        this.getAllTags();
    }

    getAllTags = () => {
        api.tags.getNotUserTags()
            .then((tags) => {
                this.setState({ otherTags: tags });
            });
    }

    close = () => this.setState({ openModal: false });
    open = () => this.setState({ openModal: true });
    changeTags = (e: any, data: any) => {
        console.log(data);
    }

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

    render() {
        const { user, loading } = this.props;
        const { info, album, traits, tags, location } = user;
        const { textOneOpen, otherTags } = this.state;
        const picture = getUserProfil(user);
        const tagsOptions = _.map(otherTags, (tag, index) => ({
            key: tag.id,
            text: tag.tag,
            value: tag.id,
        }));
        if (loading) { return <LoadingPage />; }

        const gender = traits.gender === 1 ?
            <Icon color="yellow" name="man" /> : <Icon color="yellow" name="woman" />;

        return (
            <div>
                <div id="whole-bg" />
                <div id="plop1">
                    <img
                        src={picture}
                        alt="background"
                        id="header-bg" // more specific
                    /></div>
                <header>
                    <img
                        src={picture}
                        alt="Profil picture"
                        className="section-img profile" // more specific
                    />
                    <h1 className="title">{info.login}<Flag name={info.nat} /></h1>
                    <p className="location">{getAge(info.dob)} • {gender} • {location.city}, {location.country}</p>
                </header>
                <main id="userPageMain">
                    <div id="main-bg" />
                    {textOneOpen
                        ? <section className="section-focus">
                            <h2>Who I am</h2>
                            <textarea
                                className="textAreaSection"
                                ref={(ref) => { this._tOne = ref as HTMLTextAreaElement; }}
                                defaultValue={info.text1} />
                            <div className="textAreaButtons">
                                <button className="cancelButton" onClick={this.toggleTextOne}>Cancel</button>
                                <button className="saveButton">Save</button>
                            </div>
                        </section>
                        : <section className="section-clickable">
                            <h2>Who I am</h2>
                            <div onClick={this.toggleTextOne}><p>{info.text1}</p></div>
                        </section>
                    }
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
                        <ProfilBasicsEdit user={user} updateUserTraits={this.props.updateUserTraitsDispatch} />
                    </section>
                    <section style={{ padding: 0 }}>
                        <MatchaMap />
                    </section>
                    <section>
                        <h2>My interest</h2>
                        <Dropdown
                            placeholder="Please choose some interest !"
                            fluid
                            multiple
                            search
                            selection
                            onChange={this.changeTags}
                            options={tagsOptions}
                        />
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

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        { updateUserTraitsDispatch }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);