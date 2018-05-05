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
        email: string;
        password: string;
        passwordVerif: string;
}

export interface ErrorsForm {
    global?: string;
    username?: string;
    location?: string;
    birthday?: string;
    email?: string;
    password?: string;
    term?: string;
}