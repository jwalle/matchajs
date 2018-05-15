import * as Download from 'download-file';
import * as jwt from "jsonwebtoken";
import * as randomstring from "randomstring";
import * as loremIpsum from "lorem-ipsum";
const countriesJSON = require('../../data/countries.json');

let db = require('../db');

class userServices {
    constructor() {
    }

    // TODO: add bcrypt password

    // TODO: create a user.tool file ?

    public isValidPassword(userPass : string, credentialsPass: string): boolean {
        return userPass === credentialsPass;
    }

    public toAuthJSON(email) {
        return {
            email,
            token: this.generateJWT(email)
        }
    }

    public generateJWT(email) {
        return jwt.sign({
            email: email
            },
            process.env.JWT_SECRET
        );
    }

    public selectRequest(sql : string, data : string[]|number[]) : Promise<object> {
        return new Promise(function (resolve, reject) {
            db.pool.getConnection(function(err, connection) {
                connection.query(sql, data, function (err, result) {
                    if (err) reject(err);
                    connection.release();
                    resolve(result);
                })
            })
            // db.connection.end();
        })
    }

    public updateUserInfo(data) {
        console.log("------>", data);
        let sql = "UPDATE users SET login=?, firstname=?, lastname=?, email=?, dob=?, country=?, city=? WHERE id=?"
        let values = [
            data.username,
            data.firstname,
            data.lastname,
            data.email,
            new Date(data.birthday.year, data.birthday.month ,data.birthday.day),
            data.country,
            data.city,
            data.id
        ];
        return (this.selectRequest(sql, values))
    }

    public getUserByEmail(email) {
        let sql = "SELECT * FROM users WHERE email=?";
        return (this.selectRequest(sql, email))
    }

    public getUser(id) {
        let sql = "SELECT * FROM users WHERE id=?";
        return (this.selectRequest(sql, id))
    }

    public getUserMightLikeUsers(userId) {
        let sql = "SELECT * FROM users WHERE id!=? ORDER BY RAND() LIMIT 6";
        return (this.selectRequest(sql, [userId]))
    }

    public getUserProfilePhoto(userId) {
        let sql = "SELECT link FROM photos WHERE idUser=? AND isProfil=?"; //isProfile
        return (this.selectRequest(sql, [userId, 1]))
    }

    public downloadPhoto(url, login) {
        return new Promise((resolve, reject) => {
            let directory = "./data/photos/";
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

    createNewUser(user) : Promise<object>  {
        let sql = "INSERT INTO users (login, password, email, gender, dob, registered, country, city, nat) VALUES (?,?,?,?,?,?,?,?,?)";
        let values = [
            user.username,
            user.password,
            user.email,
            user.gender,
//            user.dob,
            "today",
            "last year",
            user.country,
            user.city,
            'FR' //TODO : countries API/Json
        ];
        return (this.selectRequest(sql, values)); //.insertId; 
    };
    
    insertNewUser(user) : Promise<object>  {
        let sql = "INSERT INTO users (\
            login,\
            firstname,\
            lastname,\
            password,\
            email,\
            gender,\
            orientation,\
            dob,\
            registered,\
            city,\
            country,\
            nat,\
            isconnected,\
            confirmed,\
            lastseen,\
            text1,\
            text2,\
            text3,\
            size,\
            ethnicity,\
            religion,\
            status,\
            smoke,\
            drink,\
            drugs,\
            sign,\
            diet,\
            kids\
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        let values = [
            user.login.username,
            user.name.first,
            user.name.last,
            user.login.password,
            user.email,
            user.gender[0],
            randomstring.generate({length: 1, charset:'sbg'}), // orientation
            user.dob,
            user.registered,
            city,
            country, // ???
            user.nat.toLowerCase(),
            Math.random() >= 0.5, // Boolean random
            1,
            randomDate(user.registered),
            loremIpsum({count: getRandomInt(1, 10)}),
            loremIpsum({count: getRandomInt(1, 10)}),
            loremIpsum({count: getRandomInt(1, 10)}),
            getRandomInt(150, 200),
            ethnicity.randomElement(),
            religion.randomElement(),
            status.randomElement(),
            smoke.randomElement(),
            drink.randomElement(),
            drugs.randomElement(),
            sign.randomElement(),
            diet.randomElement(),
            Math.random() >= 0.5 // Boolean random
        ];
        return (this.selectRequest(sql, values)); //.insertId; 
    };

    public insertNewPhoto(link, idUser) {
        let sql = "INSERT INTO photos (link, idUser, created, isProfil) VALUES (?,?,?,?)";
        let values = [
            link,
            idUser.insertId,
            Date.now(),
            1
        ];
        return (this.selectRequest(sql, values));
    }

}
export default new userServices();

// const city = getCities(country[0]).randomElement;

const ethnicity = ['Asian', 'Indian', 'White', 'Black', 'Hispanic', 'Other'];
const religion = ['Atheism', 'Christianity', 'Judaism', 'Islam', 'Other'];
const status = ['Single', 'Seeing Someone', 'Married', 'Open Relationship'];
const smoke = ['Yes', 'No', 'Sometimes'];
const drink = ['Yes', 'No', 'Sometimes'];
const drugs = ['Yes', 'No', 'Sometimes'];
const sign = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'gemini', 'Cancer', 'leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
const diet = ['Omnivore', 'Vegetarian', 'Vegan'];

declare global {
    interface Array<T> {
        randomElement(): T;
    }

    interface Object  {
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
