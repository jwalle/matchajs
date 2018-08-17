import axios from 'axios';

export default {
    user: {
        login: (credentials: object) =>
            axios.post('/api/auth', {credentials}).then(res => res.data.user),
        signup: (user: object) =>
            axios.post('/api/signup', {user}).then(res => res.data.user),
        updateUserInfo: (data: object) =>
            axios.post('/api/updateUserInfo', {data}) 
        // getUser
        // getProfilePhoto
        // getMightLike
    },
    tags: {
        getTags: () =>
            axios.get('/api/tags/getAll').then(res => res.data),
        newTag: (newTag: string, inOrOut: string) =>
            axios.post('/api/tags/addTag', {newTag, inOrOut}).then(res => res.data),
        setTagApi : (tagId: number, userId: number) =>
            axios.post('/api/tags/setTag', {tagId, userId}).then(res => res.data.user)
    },
    photos: {
        getAllFromUser: (userId: number) =>
            axios.get('/api/photos/getAllFromUser/' + userId).then(res => res.data),
        photoUpload: (photo: string, userId: number) =>
            axios.post('/api/photos/photoUpload', {photo, userId})
    }
};