import axios from 'axios';
import fetchApi from './FetchApi';

export default {
    user: {
        login: (credentials: object) =>
            fetchApi('/api/auth/signin', { credentials }, 'post').then(res => res),
        loginFromToken: (token: string) =>
            fetchApi('/api/auth/authFromToken', { token }, 'post').then(res => res),
        signup: (user: object) =>
            fetchApi('/api/auth/signup', { user }, 'post').then(res => res),
        updateUserInfo: (data: object) =>
            fetchApi('/api/user/updateUserInfo', { data }, 'post'),
        unsetFirstLogin: (userId: number) =>
            fetchApi('/api/user/unsetFirstLogin', { userId }, 'post'),
        getRandUsers: () =>
            fetchApi('/api/user/getRandUsers').then(res => res.data),
        getUserProfile: (UserID: number) =>
            fetchApi('/api/user/getUserProfile/' + UserID).then(res => res.data),
        getLikedUsers: () =>
            fetchApi('/api/user/getLikedUsers').then(res => res.data),
        getNewUsers: () =>
            fetchApi('/api/user/getNewUsers').then(res => res.data),
        getSearchResults: (filters: any) =>
            fetchApi('/api/user/getSearchResults', filters, 'post').then(res => res.data),
        getMightLike: () =>
            fetchApi('/api/user/getMightLike').then(res => res.data),
        reportUser: (UserID: number) =>
            fetchApi('/api/user/reportUser', { UserID }, 'post').then(res => res.data),
        blockUser: (UserID: number) =>
            fetchApi('/api/user/blockUser', { UserID }, 'post').then(res => res.data),
        updateUserRelation: (TargetID: number, Type: number) =>
            fetchApi('/api/user/updateUserRelation', { TargetID, Type }, 'post').then(res => res.data),
    },
    tags: {
        getTags: () =>
            fetchApi('/api/tags/getAll').then(res => res.data),
        newTag: (newTag: string, inOrOut: string) =>
            fetchApi('/api/tags/addTag', { newTag, inOrOut }, 'post').then(res => res.data),
        setTagsApi: (tagsId: number[], userId: number) =>
            fetchApi('/api/tags/setTag', { tagsId, userId }, 'post').then(res => res.data.user)
    },
    photos: {
        getProfil: (userId: number) =>
            fetchApi('/api/photos/getProfil/' + userId).then(res => res.data),
        getAllFromUser: (userId: number) =>
            fetchApi('/api/photos/getAllFromUser/' + userId).then(res => res.data),
        photoUpload: (photo: string, userId: number) =>
            fetchApi('/api/photos/photoUpload', { photo, userId }, 'post'),
        deletePhoto: (photoId: number) =>
            axios.delete('/api/photos/deletePhoto/' + photoId),
        swapToProfil: (photoId: number, userId: number) =>
            fetchApi('/api/photos/swapToProfil/', { photoId, userId }, 'post')
    }
};