import { combineReducers } from 'redux';
import userReducer from './userReducer';
import tagsReducer from './tagsReducer';
import photosReducer from './photosReducer';

export type userState = {
    user: any;
    tags: any;
};

export default combineReducers<{}>({
    user: userReducer,
    tags: tagsReducer,
    photos: photosReducer
});