import * as React from 'react';
import axios from 'axios';
import { Container, Header, Button, Form, Icon } from 'semantic-ui-react';
import Modal from '../tools/Modal';
import PhotoUploadPreview from './PhotoUploadPreview';
import Danger from '../messages/Message';
import * as path from 'path';
const PHOTOS_DIR = path.resolve(__dirname, 'data/photos/');

export interface PhotoUploadFormProps {
    photoUpload: Function;
    photoDelete: Function;
    swapToProfil: Function;
    user: any;
    photos: any;
    profil: any;
}

export interface PhotoUploadFormState {
    modalOpen: boolean;
}

export default class PhotoUploadForm extends React.Component < PhotoUploadFormProps,
PhotoUploadFormState > {
    constructor(props: PhotoUploadFormProps) {
        super(props);

        this.state = {
            modalOpen: false
        };
    }

    handleOpenModal = () => {
        document.body.style.overflow = 'hidden';
        this.setState({ modalOpen: true });
    }

    handleCloseModal = () => {
        document.body.style.overflow = 'auto';
        this.setState({ modalOpen: false });
    }

    displayPhoto = (index: number, img?: string, id?: number) => {
        return(
            <div className="albumPhoto" key={index}>         
                {img ? <div>
                    <img
                        src={img ? img : 'http://via.placeholder.com/120x120'}
                        onClick={this.handleOpenModal}
                        alt="pseudo here"
                    />
                    <div className="photoOverlay">
                        <Icon
                            link
                            name="user"
                            className="toMainOverlayButton"
                            onClick={() => this.props.swapToProfil(id, 1)} /> {/* TODO: USER_ID */}
                        <Icon
                            link
                            name="trash"
                            className="toTrashOverlayButton"
                            onClick={() => this.props.photoDelete(id)} />
                    </div>
                </div> : 
                <Icon
                    link
                    name="add"
                    size="huge"
                    onClick={this.handleOpenModal} />}
            </div>
        );
    }

    displayAlbum = (user: any, photos: any) => {
        return (
            [0, 1, 2, 3].map((index: number) => {
                let photoAddress = '';
                let id = 0;
                if (photos && photos[index]) {
                    photoAddress = PHOTOS_DIR + `/${user.login}/` + photos[index].link;
                    id = photos[index].id; // moche
                }
                return this.displayPhoto(index, photoAddress, id);
            })
        );
    }

    public render() {
        console.log(this.props.photos);
        const {photos, profil, user} = this.props;
        let profilPhoto = 'http://via.placeholder.com/160x160';

        if (profil) {
            profilPhoto = PHOTOS_DIR + `/${user.login}/` + profil.link;
        }

        return (
            <div id="uploadArea" className="flex-column">
                <h1>Your photos :</h1>
                <div id="mainPhoto">
                    <h2>My main photo :</h2>
                    <img src={profilPhoto} alt="pseudo here"/>
                </div>
                <div id="uploadAlbumArea" className="flex-column">
                    <p>My Album :</p>
                    <div id="album" className="flex-row">
                        {this.displayAlbum(user, photos)}
                    </div>
                </div>
                <Modal show={this.state.modalOpen}>
                    <PhotoUploadPreview 
                        handleClose={this.handleCloseModal} 
                        handleSubmit={this.props.photoUpload}
                    />
                </ Modal>
            </div>
        );
    }
}
