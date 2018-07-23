import * as React from 'react';
import axios from 'axios';
import { Container, Header, Button, Form, Icon } from 'semantic-ui-react';
import Modal from '../tools/Modal';
import PhotoUploadPreview from './PhotoUploadPreview';
import Danger from '../messages/Message';
require('../styles/UploadPhoto.css');

export interface PhotoUploadFormProps {}

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

    handleSubmitPhoto = () => console.log('photo !!');

    displayPhoto = (img?: string) => {
        return(
            <div className="albumPhoto" onClick={this.handleOpenModal}>
                <img
                    src={img ? img : 'http://via.placeholder.com/120x120'}
                    alt="pseudo here"
                />
                <div className="photoOverlay">
                    <Icon link name="user" className="toMainOverlayButton" onClick={() => console.log('toMain')}/>
                    <Icon link name="trash" className="toTrashOverlayButton" onClick={() => console.log('toTrash')}/>
                </div>
            </div>
        );
    }

    public render() {

        const uploadPhotoForm = (
            <div>

            </div>
        );

        return (
            <div id="uploadArea" className="flex-column">
                <h1>Your photos :</h1>
                <div id="mainPhoto">
                    <h2>My main photo :</h2>
                    <img src="http://via.placeholder.com/160x160" alt="pseudo here"/>
                </div>
                <div id="uploadAlbumArea" className="flex-column">
                    <p>My Album :</p>
                    <div id="album" className="flex-row">
                        {this.displayPhoto()}
                        {this.displayPhoto()}
                        {this.displayPhoto()}
                        {this.displayPhoto()}
                    </div>
                </div>
                <Modal show={this.state.modalOpen}>
                    <PhotoUploadPreview 
                        handleClose={this.handleCloseModal} 
                        handleSubmit={this.handleSubmitPhoto}
                    />
                </ Modal>
            </div>
        );
    }
}
