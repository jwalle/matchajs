import { GET_ALL_TAGS, ADD_NEW_TAG, SET_USER_TAG, TOGGLE_TAG, TAGS_LOADING } from '../actions/tags';
import { Item } from '../../../../node_modules/@types/react-bootstrap/lib/Pagination';

const initialState = {
    items: [],
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

export default function tags(state: any = initialState, action: any) {
    switch (action.type) {
        case GET_ALL_TAGS:
            return {
                ...state,
                items: action.payload,
                loading: false
        };
        case TOGGLE_TAG:
            return {
                ...state,
                items: updateItemInArray(state.items, action)
            };
        case ADD_NEW_TAG:
            return {
                ...state, 
                items: [
                    ...state.items,
                    action.payload
                ]
            };
        case TAGS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}