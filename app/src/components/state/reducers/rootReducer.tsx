import { combineReducers } from 'redux';
import userReducer from './userReducer';
import tagsReducer from './tagsReducer';

export type userState = {
    user: any;
    tags: any;
};

export default combineReducers<{}>({
    user: userReducer,
    tags: tagsReducer
});