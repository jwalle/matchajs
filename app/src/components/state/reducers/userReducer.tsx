import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/auth';

const initialState = {
    user: {},
    token: ''
};

export default function user(state: any = initialState, action: any = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                user: action.user,
                token: action.token
                
            };
        case USER_LOGGED_OUT:
            return {};
        default:
            return state;
    }
}