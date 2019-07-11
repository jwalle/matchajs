import Axios from 'axios';

const fetchApi = async (endPoint: string, payload: any = undefined, method = 'get', headers = {}): Promise<any> => {
    const accessToken = localStorage.getItem('matchaJWT');

    console.log(endPoint, payload, method, headers);
    // return Axios(global.url + endPoint, {
    return Axios('http://localhost:3000' + endPoint, {
        method,
        // withCredentials: true,
        headers: {
            // Accept: 'application/json',
            authorization: accessToken,
            'Content-Type': 'application/json',
        },
        data: payload,
    }).catch((e) => {
        console.log('ET ICI ?', e.response);
        if (e.response && e.response.json) {
            e.response.json().then((json: any) => {
                if (json) { throw json; }
                throw e;
            });
        } else {
            // showMessage(Msg.default.networkError);
            throw e;
        }
    });
};

export default fetchApi;