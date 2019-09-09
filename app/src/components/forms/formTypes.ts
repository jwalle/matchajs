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
    email: string;
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

export interface UserStatus {
    isConnected: boolean;
    lastseen: Date;
    firstLogin: boolean;
    confirmed: boolean;
}

export interface UserInfos {
    city: string;
    login: string;
    firstname: string;
    lastname: string;
    dob: Date;
    nat: any;
    gender: number;
    text1?: string;
    text2?: string;
    text3?: string;
}

export interface UserLocation {
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
    // username?: string;
    login?: string;
    name?: string;
    city?: string;
    firstname?: string;
    lastname?: string;
    location?: string;
    birthday?: string;
    email?: string;
    password?: string;
    term?: string;
    bio?: string;
}