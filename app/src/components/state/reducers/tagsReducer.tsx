import { GET_ALL_TAGS, ADD_NEW_TAG, SET_USER_TAG } from '../actions/types';

const initialState = {
    items: []
};

export default function tags(state: any = initialState, action: any) {
    let newState = state;
    switch (action.type) {
        case GET_ALL_TAGS:
            return {
                ...state,
                items: action.payload
        };
        case ADD_NEW_TAG:
            return newState = {
                ...newState,
                items: newState.items.concat(action.payload)
            };
        default:
            return state;
    }
}