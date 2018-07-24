import { combineReducers } from 'redux';
import user from './user';

export type userState = {
    user: any;
};

export default combineReducers<userState>({
    user
});