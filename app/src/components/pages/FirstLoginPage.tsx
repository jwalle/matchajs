import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Danger from '../messages/Message';
import Checkboxes from '../forms/FormCheckboxes';
import PhotoUploadForm from '../forms/photoUploadForm';
import api from '../../services/api';
import { getAllTags, addNewTag, toggleTag } from '../state/actions/tags';
import { photoUpload, getAllPhotos, getProfil, photoDelete, swapToProfil } from '../state/actions/photos';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

export interface FirstLoginProps {
    isConfirmed: boolean;
    getAllTags: Function;
    addNewTag: Function;
    toggleTag: Function;
    photoUpload: Function;
    getAllPhotos: Function;
    getProfil: Function;
    photoDelete: Function;
    swapToProfil: Function;
    loading: boolean;
    user: any;
    tags: {
        id: number;
        tag: string;
        in_or_out: string;
        value: boolean;
    }[];
    photos: any;
    profil: any;
    tag: any; // TODO
}

interface FirstLoginState {
    loading: boolean;
    errors: {
        global: string;
    };
    data: {
        tags: {
            id: number;
            tag: string;
            in_or_out: string;
            value: boolean;
        }[];
    };
}

export class FirstLogin extends React.Component <FirstLoginProps, FirstLoginState> {
    constructor(props: FirstLoginProps) {
        super(props);

        this.state = {
            loading: false,
            errors: {
                global: ''
            },
            data: {
                tags: [],
            }
        };
        this.toggleCheckbox = this.toggleCheckbox.bind(this);        
    }

    componentWillMount() {
        this.props.getAllTags();
        this.props.getAllPhotos(this.props.user.id);
        this.props.getProfil(this.props.user.id);
    }

    toggleCheckbox = (tag: string) => {
        let { tags } = this.props;
        // let newState = Object.assign({}, this.state.data);
        let index = tags.findIndex(x => x.tag === tag);
        if (index === -1) {
            console.error('ERROR: this index does not exist');
        } else {
            this.props.toggleTag(index);
        }
    }

    handleClose = () => {
        console.log('close this'); // TODO
    }

    handleSubmitPhoto = (file: string) => {
        const userId = this.props.user.id;
        this.props.photoUpload(file, userId);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        let userId = this.props.user.id;
        let tags = this.props.tags;
        let setTags: number[] = [];
        tags.forEach((tag) => {
            if (tag.value === true) {
                setTags.push(tag.id);
            }
        });
        api.tags.setTagsApi(setTags, userId);
        api.user.unsetFirstLogin(userId);
    }

    render() {
        const {errors} = this.state;
        const {user, tags, photos, profil, loading} = this.props;
        return(
          <main id="mainFirstLogin">
            <div id="PhotoUpload">
                <PhotoUploadForm
                photoUpload={this.handleSubmitPhoto}
                swapToProfil={this.props.swapToProfil}
                photoDelete={this.props.photoDelete}
                user={user}
                photos={photos}
                profil={profil} />
            </div>
            {errors.global && <Danger title="Global error" text="Something went wrong" />}
            <Checkboxes
                inOut="in"
                loading={loading}
                tags={tags}
                toggleCheckbox={this.toggleCheckbox}
                submitNewTag={this.props.addNewTag} />
            <Checkboxes
                inOut="out"
                loading={loading}
                tags={tags}
                toggleCheckbox={this.toggleCheckbox}
                submitNewTag={this.props.addNewTag} />
            <Button color="green" onClick={this.onSubmit}>
                <Icon name="checkmark" /> Confirm
                </ Button>
                <Button color="grey" onClick={this.handleClose}>
                    No thanks
            </ Button>
          </main>
        );
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    tags: state.tags.items,
    photos: state.photos.photos,
    profil: state.photos.profil,
    loading: state.tags.loading,
    isConfirmed: !!state.user.confirmed
});

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
    { addNewTag, getAllTags, toggleTag, photoUpload, photoDelete, getAllPhotos, getProfil, swapToProfil }, dispatch);
};

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(FirstLogin);