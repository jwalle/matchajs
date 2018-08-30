import api from '../../../services/api';

export const DELETE_PHOTO = 'DELETE_PHOTO';
export const SWAP_TO_PROFIL = 'SWAP_TO_PROFIL';
export const GET_ALL_PHOTOS = 'GET_ALL_PHOTOS';
export const PHOTO_UPLOAD = 'PHOTO_UPLOAD';
export const PHOTO_IS_UPLOADING = 'PHOTO_IS_UPLOADING';
export const PHOTOS_ARE_LOADING = 'PHOTOS_ARE_LOADING';
export const GET_PROFIL_PHOTO = 'GET_PROFIL_PHOTO';

export const getAllPhotos = (userId: number) => (dispatch: any) => {
    dispatch(photosLoading());
    api.photos.getAllFromUser(userId)
        .then(photos => dispatch({
            type: GET_ALL_PHOTOS,
            payload: photos
        }));
};

export const getProfil = (userId: number) => (dispatch: any) => {
    dispatch(photosLoading());
    api.photos.getProfil(userId)
        .then(photo => dispatch({
            type: GET_PROFIL_PHOTO,
            payload: photo
        }));
};

export const photoUpload = (photo: string, userId: number) => (dispatch: any) => {
    dispatch(photoUploading());
    api.photos.photoUpload(photo, userId)
        .then(() => dispatch({
            type: PHOTO_UPLOAD
        }));
};

export const photoDelete = (photoId: number) => (dispatch: any) => {
    api.photos.deletePhoto(photoId)
        .then(() => dispatch({
            type: DELETE_PHOTO,
            photoId
        }));
};

export const swapToProfil = (newProfilId: number, userId: number) => (dispatch: any) => {
    api.photos.swapToProfil(newProfilId, userId)
        .then(() => dispatch({
            type: SWAP_TO_PROFIL,
            newProfilId,
            userId
        }));
};

export const photoUploading = () => {
    return {
        type: PHOTO_IS_UPLOADING
    };
};

export const photosLoading = () => {
    return {
        type: PHOTOS_ARE_LOADING
    };
};