import { GET_ALL_PHOTOS, PHOTO_UPLOAD, PHOTO_IS_UPLOADING, PHOTOS_ARE_LOADING } from '../actions/photos';

const initialState = {
    photos: [],
    loading: false
};

const updateItemInArray = (array: any, action: any) => {
    return array.map((item: any, index: number) => {
        if (index !== action.payload) {
            return item;
        }
        return {
            ...item,
            value : !item.value
        };
    });
};

export default function photos(state: any = initialState, action: any) {
    switch (action.type) {
        case GET_ALL_PHOTOS:
            return {
                ...state,
                items: action.payload,
                loading: false
        };
        case PHOTO_UPLOAD:
            return {
                state
            };
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