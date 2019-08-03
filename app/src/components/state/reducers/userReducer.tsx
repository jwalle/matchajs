import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/auth';
import { UPDATE_USER_TRAITS } from '../actions/users';

const initialState = {
    user: {},
    token: '',
    loading: true,
};

export default function user(state: any = initialState, action: any = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                user: action.user,
                token: action.token,
                loading: false,

            };
        case USER_LOGGED_OUT:
            return {};
        case UPDATE_USER_TRAITS:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}