import api from '../../../services/api';

export const GET_ALL_PHOTOS = 'GET_ALL_PHOTOS';
export const PHOTO_UPLOAD = 'PHOTO_UPLOAD';
export const PHOTO_IS_UPLOADING = 'PHOTO_IS_UPLOADING';
export const PHOTOS_ARE_LOADING = 'PHOTOS_ARE_LOADING';

export const getAllPhotos = (userId: number) => (dispatch: any) => {
    dispatch(photosLoading());
    api.photos.getAllFromUser(userId)
        .then(photos => dispatch({
            type: GET_ALL_PHOTOS,
            payload: photos
        }));
};

export const photoUpload = (photo: string, userId: number) => (dispatch: any) => {
    dispatch(photoUploading());
    api.photos.photoUpload(photo, userId)
        .then(() => dispatch({
            type: PHOTO_UPLOAD
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