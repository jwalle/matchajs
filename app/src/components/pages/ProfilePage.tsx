import * as React from 'react';
import ProfilBasicsEdit from '../Profile/ProfileBasicsEdit';
import MatchaMap from '../misc/matchaMap';
import { Flag, Icon, Dropdown, Label, Input, Modal } from 'semantic-ui-react';
import LoadingPage from './LoadingPage';
import { connect } from 'react-redux';
import { getUserProfil } from '../../helpers/photosTools';
import { getAge } from '../../helpers/userTools';
import { UserProfileProps } from '../forms/formTypes';
import { updateUserTraitsDispatch, updateUserTagsDispatch } from '../state/actions/users';
import { bindActionCreators } from 'redux';
import api from '../../services/api';
import * as _ from 'lodash';
import ProfileMainInfos from '../Profile/ProfileMainInfos';
import Textarea from 'react-textarea-autosize';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';

export interface ProfileProps {
    user: UserProfileProps; // TODO;
    updateUserTraitsDispatch: Function;
    updateUserTagsDispatch: Function;
    loading: boolean;
}

export interface UserProfileState {
    tagsSelected: number[];
    center: {
        lat: any,
        lng: any,
    };
    zoom: any;
    openModal: boolean;
    textOneOpen: boolean;
    percentage: number;
    otherTags: any;
}

class UserProfile extends React.Component<ProfileProps, UserProfileState> {
    _tOne!: HTMLTextAreaElement;
    constructor(props: ProfileProps) {
        super(props);

        // this.fromAddress = this.fromAddress.bind(this);

        this.state = {
            tagsSelected: [],
            openModal: false,
            textOneOpen: false,
            center: {
                lat: 40.7446790,
                lng: -73.9485420
            },
            zoom: 10,
            percentage: 0,
            otherTags: undefined,
        };
    }

    componentWillMount() {
        this.getAllTags();
        this.tagsToValues();
        this.setState({ tagsSelected: this.tagsToValues() });
    }

    componentDidMount() {
        setTimeout(() => this.setState({ percentage: 60 }), 1000);
    }

    tagsToValues = (): number[] => {
        return this.props.user.tags.map((tag) => tag.id);
        // console.log('VALUE : ', value);
    }

    getAllTags = () => {
        api.tags.getNotUserTags()
            .then((tags) => {
                this.setState({ otherTags: tags });
            });
    }

    addTag = (e: any, data: any) => {
        api.tags.newTag(data.value, 'in')
            .then((newTag) => {
                let newTags: any = this.state.tagsSelected;
                let allTags: any = this.state.otherTags;
                newTags.push(newTag.id);
                allTags.push(newTag);
                this.setState({
                    tagsSelected: newTags,
                    otherTags: allTags,
                });
            });
    }

    close = () => this.setState({ openModal: false });
    open = () => this.setState({ openModal: true });

    changeTags = (e: any, data: any) => {
        // console.log('isINT? ', data.value.isInteger);
        // console.log('typeof:', typeof (data.value));
        // console.log('value:', data.value);
        // if (!isNaN(data.value)) {
        this.setState({
            tagsSelected: data.value,
        });
        // }
    }

    resetTags = () => {
        this.setState({ tagsSelected: this.tagsToValues() });
    }

    saveTags = () => {
        //
    }

    toggleTextOne = async () => {
        await this.setState({ textOneOpen: !this.state.textOneOpen });
        if (this._tOne) {
            this._tOne.focus();
        }
    }

    submitTags = () => {
        let submitTag = this.state.tagsSelected;
        submitTag = submitTag.filter((tag) => !isNaN(tag));
        this.props.updateUserTagsDispatch(this.state.tagsSelected); // TODO: Verif before sending
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
        const { textOneOpen, otherTags, openModal } = this.state;
        const picture = getUserProfil(user);
        const tagsOptions = _.map(otherTags, (tag, index) => ({
            key: tag.id,
            text: tag.tag,
            value: tag.id,
        }));
        const percentage = 66;
        let tagsValues = this.props.user.tags.map((tag) => tag.id);
        let tagsChanged = !_.isEqual(_.sortBy(tagsValues), _.sortBy(this.state.tagsSelected));
        if (loading) { return <LoadingPage />; }
        // const gender = info.gender === 1 ?
        //     <Icon color="yellow" name="man" /> : <Icon color="yellow" name="woman" />;
        console.log('==> ', tagsValues, this.state.tagsSelected);
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
                    <div className="header-infos">
                        <div className="info-top">
                            <span className="infos-left">
                                <p className="info-age-gender">
                                    {getAge(info.dob)}, <Icon color="yellow" name="woman" />
                                </p>
                                <p className="info-city">{info.city}</p>
                            </span>
                            <ProgressProvider valueStart={0} valueEnd={this.state.percentage}>
                                {(value: any) => <CircularProgressbarWithChildren
                                    value={value}
                                    className="circular-popu"
                                    styles={{
                                        path: {
                                            // Path color
                                            stroke: `rgba(217, 179, 16, 1)`,
                                            strokeLinecap: 'butt',
                                            // Customize transition animation
                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                        },
                                        // Customize the circle behind the path, i.e. the "total progress"
                                        trail: {
                                            // Trail color
                                            stroke: 'transparent',
                                            strokeLinecap: 'butt',
                                        },
                                        // Customize the text
                                        text: {
                                            // Text color
                                            fill: '#d9b310',
                                            // Text size
                                            fontSize: '16px',
                                        },
                                        // Customize background - only used when the `background` prop is true
                                        background: {
                                            fill: '#3e98c7',

                                        },
                                    }}
                                >
                                    <img
                                        src={picture}
                                        alt="Profil picture"
                                        className="section-img profile" // more specific
                                    />

                                    <div className="info-popu">
                                        <CountUp
                                            start={0}
                                            end={percentage}
                                            delay={1}
                                            separator=" "
                                            suffix=" %"
                                        />
                                    </div>
                                </CircularProgressbarWithChildren>}
                            </ProgressProvider>
                            <span className="info-right">
                                <p className="info-connected">Connected</p>
                            </span>
                        </div>
                        <p className="info-login">{info.login}</p>
                        {/* <ProfileMainInfos user={user} /> */}
                    </div>
                </header>
                <main id="userPageMain">
                    <div id="main-bg" />
                    {textOneOpen
                        ? <section className="section-focus">
                            <h2>Who I am</h2>
                            <Textarea
                                className="textAreaSection"
                                minRows={3}
                                inputRef={(ref: any) => { this._tOne = ref as HTMLTextAreaElement; }}
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
                            additionLabel="Add a tag: "
                            allowAdditions
                            className="profileTagsDropdown"
                            onAddItem={this.addTag}
                            onChange={this.changeTags}
                            value={this.state.tagsSelected}
                            options={tagsOptions}
                        >
                        </Dropdown>
                        {tagsChanged && <div className="textAreaButtons">
                            <button className="cancelButton" onClick={this.resetTags}>Cancel</button>
                            <button className="saveButton" onClick={this.submitTags}>Save</button>
                        </div>}
                    </ section>
                </main>
            </div >
        );
    }
}

const mapStateToProps = (state: any) => ({
    loading: state.user.loading,
    user: state.user.user
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        { updateUserTraitsDispatch, updateUserTagsDispatch }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

const ProgressProvider = ({ valueStart, valueEnd, children }: any) => {
    const [value, setValue] = React.useState(valueStart);
    React.useEffect(() => { setValue(valueEnd); }, [valueEnd]);

    return children(value);
};