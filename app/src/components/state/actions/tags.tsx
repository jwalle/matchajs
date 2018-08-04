import api from '../../../services/api';

export const GET_ALL_TAGS = 'GET_ALL_TAGS';
export const ADD_NEW_TAG = 'ADD_NEW_TAG';
export const SET_USER_TAG = 'SET_USER_TAG';
export const TAGS_LOADING = 'TAGS_LOADING';
export const TOGGLE_TAG = 'TOGGLE_TAG';

export const getAllTags = () => (dispatch: any) => {
    dispatch(tagsLoading());
    api.tags.getTags()
        .then(tags => dispatch({
            type: GET_ALL_TAGS,
            payload: tags
        }));
};

export const addNewTag = (newTag: string, inOrOut: string) => (dispatch: any) => {
    api.tags.newTag(newTag, inOrOut)
        .then((tag) => dispatch({
            type: ADD_NEW_TAG,
            payload: tag
        }));
};

export const tagsLoading = () => {
    return {
        type: TAGS_LOADING
    };
};

export const toggleTag = (id: number) => (dispatch: any) => {
    dispatch({
        type: TOGGLE_TAG,
        payload: id
    });
};

// export const setUserTags = (userId: number) => 