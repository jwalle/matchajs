import api from '../../../services/api';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const userLoggedIn = (user: any, token: string) => ({
    type: USER_LOGGED_IN,
    user,
    token
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const userLoginFailure = (error: any) => ({
    type: USER_LOGIN_FAILURE,
    payload: error
});

export const loginFromToken = () => (dispatch: any) => {
    let token = localStorage.getItem('matchaJWT');
    if (token) {
        api.user.loginFromToken(token).then(res => {
            if (res.status !== 200) {
                // dispatch(userLoginFailure(res.error));
            } else {
                // localStorage.setItem('matchaJWT', res.data.token); TODO: refresh token ?
                dispatch(userLoggedIn(res.data.user, res.data.token));
            }
        });
    }
};

export const login = (credentials: any) => (dispatch: any) => 
    api.user.login(credentials).then(res => {
        console.log(res);
        if (res.status !== 200) {
            // dispatch(userLoginFailure(res.error));
        } else {
            localStorage.setItem('matchaJWT', res.data.token);
            dispatch(userLoggedIn(res.data.user, res.data.token));
        }
    });
    
export const signup = (credentials: any) => (dispatch: any) => 
    api.user.signup(credentials).then(user => {
        localStorage.setItem('matchaJWT', user.token);
        // dispatch(userLoggedIn(res.data.user, res.data.token));
    });

export const logout = () => (dispatch: any) => {
        localStorage.removeItem('matchaJWT');
        dispatch(userLoggedOut());
    };