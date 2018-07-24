import axios from 'axios';

export default {
    user: {
        login: (credentials: object) =>
            axios.post('/api/auth', {credentials}).then(res => res.data.user),
        signup: (user: object) =>
            axios.post('/api/signup', {user}).then(res => res.data.user),
        updateUserInfo: (data: object) =>
            axios.post('/api/updateUserInfo', {data}) 
    }
};