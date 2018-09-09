import axios from 'axios';

export default {
    user: {
        login: (credentials: object) =>
            axios.post('/api/auth', {credentials}).then(res => res),
        loginFromToken: (token: string) =>
            axios.post('/api/authFromToken', {token}).then(res => res),
        signup: (user: object) =>
            axios.post('/api/signup', {user}).then(res => res),
        updateUserInfo: (data: object) =>
            axios.post('/api/updateUserInfo', {data}),
        unsetFirstLogin: (userId: number) =>
            axios.post('/api/unsetFirstLogin', {userId})
        // getUser
        // getProfilePhoto
        // getMightLike
    },
    tags: {
        getTags: () =>
            axios.get('/api/tags/getAll').then(res => res.data),
        newTag: (newTag: string, inOrOut: string) =>
            axios.post('/api/tags/addTag', {newTag, inOrOut}).then(res => res.data),
        setTagsApi : (tagsId: number[], userId: number) =>
            axios.post('/api/tags/setTag', {tagsId, userId}).then(res => res.data.user)
    },
    photos: {
        getProfil: (userId: number) => 
            axios.get('/api/photos/getProfil/' + userId).then(res => res.data),
        getAllFromUser: (userId: number) =>
            axios.get('/api/photos/getAllFromUser/' + userId).then(res => res.data),
        photoUpload: (photo: string, userId: number) =>
            axios.post('/api/photos/photoUpload', {photo, userId}),
        deletePhoto: (photoId: number) =>
            axios.delete('/api/photos/deletePhoto/' + photoId),
        swapToProfil: (photoId: number, userId: number) =>
            axios.post('/api/photos/swapToProfil/', {photoId, userId})
    }
};