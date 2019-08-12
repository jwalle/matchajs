import api from '../../../services/api';

export const UPDATE_USER = 'UPDATE_USER_TRAITS';

export const updateUser = (user: any) => ({
    type: UPDATE_USER,
    user,
});

export const updateUserTraitsDispatch = (user: any) => (dispach: any) => {
    api.user.updateTraits(user)
        .then((res) => {
            if (res.status === 200) {
                dispach(updateUser(res.data));
            } else {
                console.log('ERROR DISPATCH');
            }
        });
};

export const updateUserTagsDispatch = (tags: any) => (dispach: any) => {
    api.user.updateTags(tags)
        .then((res) => {
            if (res.status === 200) {
                dispach(updateUser(res.data));
            } else {
                console.log('ERROR DISPATCH');
            }
        });
};