import { USER_LOGGED_IN } from '../types';

export default function user(state: any = {}, action: any = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        default:
            return state;
    }
}