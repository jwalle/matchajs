// import * as formTypes from './formTypes'; 

export interface UserData {
    country: string;
    city: string;
    gender: string;
    orientation: string;
    birthday: {
        day: string,
        month: string,
        year: number,
    };
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordVerif: string;
    [key: string]: any;
}

export interface UserProfileProps {
    id: number;
    token: string;
    info: UserInfos;
    traits: UserTraits;
    location: UserLocation;
    tags: UserTag[];
    album: UserPhoto[];
}

export interface UserTraits {
    size: number | string;
    orientation: number;
    gender: number;
    kids: number;
    status: number;
    ethnicity: number;
    religion: number;
    smoke: number;
    drink: number;
    drugs: number;
    diet: number;
    sign: number;
}

export interface UserInfos {
    login: string;
    size: number;
    dob: Date;
    lastseen: Date;
    nat: any;
    isConnected: boolean;
    confirmed: boolean;
    firstLogin: boolean;
    text1: string;
    text2: string;
    text3: string;
}

export interface UserLocation {
    city: string;
    country: string;
    position: {
        lat: number;
        lng: number;
    };
}

export interface UserTag {
    id: number;
    tag: string;
}

export interface UserPhoto {
    id: number;
    link: string;
    isProfil: boolean;
}

export interface ErrorsForm {
    global?: string;
    username?: string;
    name?: string;
    firstname?: string;
    lastname?: string;
    location?: string;
    birthday?: string;
    email?: string;
    password?: string;
    term?: string;
    bio?: string;
}