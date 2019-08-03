import api from '../../../services/api';

export const UPDATE_USER_TRAITS = 'UPDATE_USER_TRAITS';

export const updateUserTraits = (user: any) => ({
    type: UPDATE_USER_TRAITS,
    user,
});

export const updateUserTraitsDispatch = (user: any) => (dispach: any) => {
    api.user.updateTraits(user)
        .then((res) => {
            if (res.status === 200) {
                dispach(updateUserTraits(res.data));
            } else {
                console.log('ERROR DISPATCH');
            }
        });
};