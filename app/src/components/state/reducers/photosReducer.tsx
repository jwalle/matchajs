import {
    DELETE_PHOTO,
    GET_ALL_PHOTOS,
    GET_PROFIL_PHOTO,
    PHOTO_UPLOAD,
    PHOTO_IS_UPLOADING,
    PHOTOS_ARE_LOADING, 
    SWAP_TO_PROFIL } from '../actions/photos';

const initialState = {
    photos: [],
    profil: [],
    loading: false,
};

const makeSwappedState = (state: any, id: number) => {
    let oldProfil = state.profil;
    let newProfil = {};
    oldProfil.isProfil = false;
    state.photos.map((photo: any) => {
        if (photo.id === id) {
            photo.isProfil = true;
            newProfil = photo;
        }
    });
    return {
        ...state,
        photos: [
            ...state.photos.filter((photo: any) => photo.id !== id),
            oldProfil
        ],
        profil: newProfil
    };
};

export default function photos(state: any = initialState, action: any) {
    switch (action.type) {
        case GET_ALL_PHOTOS:
            return {
                ...state,
                photos: action.payload,
                loading: false
            };
        case GET_PROFIL_PHOTO:
            return {
                ...state,
                profil: action.payload[0],
                loading: false
            };
        case PHOTO_UPLOAD:
            return {
                state
            };
        case DELETE_PHOTO:
            const photoId = action.photoId;
            return {
                ...state,
                photos: state.photos.filter((photo: any) => photo.id !== photoId)
            };
        case SWAP_TO_PROFIL:
            return makeSwappedState(state, action.newProfilId);
        case PHOTO_IS_UPLOADING:
            return {
                ...state,
                loading: true
            };
        case PHOTOS_ARE_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}