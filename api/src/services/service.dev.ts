import * as Download from 'download-file';
import * as jwt from "jsonwebtoken";
import * as randomstring from "randomstring";
import * as loremIpsum from "lorem-ipsum";
import { selectRequest } from './schema';
const countriesJSON = require('../../../app/src/data/countries');

let db = require('../db');

class devServices {
    constructor() { }

    public getDBUsers() {
        let sql = "SELECT * FROM users WHERE 1";
        let values = [];
        return (selectRequest(sql, values));
    }

    public downloadPhoto(url, login) {
        return new Promise((resolve, reject) => {
            let directory = `../api/public/photos/${login}/`; // Docker: Check if it work
            let filename = login + '-' + Date.now() + '.jpg';
            let dlOptions = {
                directory: directory,
                filename: filename
            };
            Download(url, dlOptions, function (err) {
                if (err)
                    reject(err);
                resolve(filename);
            });
        })
    }

    createUserTraits(UserID): Promise<object> {
        let sql = "INSERT INTO users_traits (UserID, size, orientation, kids, status, ethnicity, religion, smoke, drink, drugs, diet, sign) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        let values = [
            UserID,
            getRandomInt(150, 200),
            getRandomInt(0, 3),
            getRandomInt(0, 2),
            getRandomInt(0, 3),
            getRandomInt(0, 6),
            getRandomInt(0, 5),
            getRandomInt(0, 3),
            getRandomInt(0, 3),
            getRandomInt(0, 3),
            getRandomInt(0, 3),
            getRandomInt(0, 12),
        ];
        return (selectRequest(sql, values));
    };

    createUserInfo(UserID, user): Promise<object> {
        let sql = "INSERT INTO users_infos (\
            UserID,\
            login,\
            firstname,\
            lastname,\
            gender,\
            dob,\
            city,\
            text1,\
            text2,\
            text3\
        ) VALUES (?,?,?,?,?,?,?,?,?,?)";
        let values = [
            UserID,
            user.login.username,
            user.name.first,
            user.name.last,
            getRandomInt(1, 4),
            new Date(user.dob.date),
            user.location.city,
            loremIpsum({
                count: getRandomInt(1, 10)
            }),
            loremIpsum({
                count: getRandomInt(1, 10)
            }),
            loremIpsum({
                count: getRandomInt(1, 10)
            }),
        ];
        return (selectRequest(sql, values)); //.insertId;
    };

    // public createUserTags(UserID) {
    //     let sql = "INSERT INTO photos (link, idUser, created, isProfil) VALUES (?,?,?,?)";
    //     let values = [];
    //     return (selectRequest(sql, values));
    // }


    public insertNewPhoto(link, idUser, isProfil) {
        let sql = "INSERT INTO photos (link, idUser, created, isProfil) VALUES (?,?,?,?)";
        let values = [
            link, idUser, Date.now(),
            isProfil
        ];
        return (selectRequest(sql, values));
    }

    insertNewRandUser(user): Promise<object> {
        let sql = "INSERT INTO users (\
            password,\
            email,\
            registered,\
            connected,\
            confirmed,\
            lastSeen\
        ) VALUES (?,?,?,?,?,?)";
        let values = [
            user.login.password,
            user.email,
            new Date(user.registered.date),
            Math.random() >= 0.5,
            Math.random() >= 0.5,
            randomDate(user.registered.date),
        ];
        return (selectRequest(sql, values)); //.insertId;
    };

}
export default new devServices();

const indoorTags = [
    'Music',
    'Foot',
    'Computer',
    'Science',
    'Gaming',
    'Movies',
    'Acting',
    'Cooking',
    'Crocheting',
    'Crossword puzzles',
    'Dance',
    'DIY',
    'Fashion',
    'Homebrewing',
    'CTG',
    'Sculpting',
    'Reading',
    'WoodWorking',
    'Painting',
    'Playing musical instruments',
    'Singing',
    'Watching TV',
    'drawing',
    'Yoga'
];
const outdoorTags = [
    'Archery',
    'Astronomy',
    'Basketball',
    'Camping',
    'Canyoning',
    'Driving',
    'Fishing',
    'Geocaching',
    'Hiking',
    'Horseback Riding',
    'Hunting',
    'Jogging',
    'Martial Art',
    'Motor sports',
    'Paintball',
    'Parkour',
    'Photography',
    'Rock climbing',
    'Roller skating',
    'Skateboarding',
    'Rugby',
    'Skiing',
    'Snowboarding',
    'Walking'
];
declare global {
    interface Array<T> {
        randomElement(): T;
    }

    interface Object {
        RandomElement(): string;
    }
}

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};

Object.prototype.RandomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};

function getCountries(): string[] {
    let countries = countriesJSON.countries;
    let arr: string[] = new Array;
    for (let x in countries) {
        if (countries.hasOwnProperty(x)) {
            arr.push(x);
        }
    }
    return arr;
}

function getCities(country: string): Array<string> {
    let countries = countriesJSON.countries;
    let cities = countries[country];
    let arr = [];
    for (let x in cities) {
        if (cities.hasOwnProperty(x)) {
            arr.push(cities[x]);
        }
    }
    return arr;
}

const countries = getCountries();
const country = countries.randomElement();
const cities = getCities(country);
const city = cities.randomElement();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function randomDate(startString) {
    let end = new Date();
    let start = new Date(startString);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
