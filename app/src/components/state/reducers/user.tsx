import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/types';

export default function user(state: any = {}, action: any = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_LOGGED_OUT:
            return {};
        default:
            return state;
    }
}