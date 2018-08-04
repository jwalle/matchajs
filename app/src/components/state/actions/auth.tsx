import api from '../../../services/api';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const userLoggedIn = (user: any) => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = (credentials: any) => (dispatch: any) => 
    api.user.login(credentials).then(user => {
        localStorage.matchaJWT = user.token;
        dispatch(userLoggedIn(user));
    });

export const signup = (credentials: any) => (dispatch: any) => 
    api.user.signup(credentials).then(user => {
        localStorage.matchaJWT = user.token;
        dispatch(userLoggedIn(user));
    });

export const logout = () => (dispatch: any) => {
        localStorage.removeItem('matchaJWT');
        dispatch(userLoggedOut());
    };