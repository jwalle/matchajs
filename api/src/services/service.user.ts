import * as Download from 'download-file';
import * as jwt from "jsonwebtoken";
import * as randomstring from "randomstring";
import * as loremIpsum from "lorem-ipsum";
const countriesJSON = require('../../../app/src/data/countries');

let db = require('../db');

class userServices {
    constructor() { }

    // TODO: add bcrypt password

    // TODO: create a user.tool file ?

    public isValidPassword(userPass: string, credentialsPass: string): boolean {
        return userPass === credentialsPass;
    }

    public toAuthJSON(payload) {
        return this.generateJWT(payload);
    }

    public generateJWT(payload) {
        return jwt.sign({
            payload
        }, process.env.JWT_SECRET);
    }

    public isFriend = "(CASE WHEN (SELECT UserID FROM users_relations ur WHERE ur.UserID=? && ur.Type=1 && ur.TargetID=u.id) THEN 1 ELSE 0 END) as friend";

    public selectRequest(sql: string, data: any): Promise<object> {
        console.log('request made --> ', sql, data);
        return new Promise(function (resolve, reject) {
            db
                .pool
                .getConnection(function (err, connection) {
                    connection
                        .query(sql, data, function (err, result) {
                            if (err)
                                reject(err);
                            connection.release();
                            console.log('====================================\n');
                            resolve(result);
                        })
                })
            // db.connection.end();
        })
    }

    public updateUserInfo(data) {
        console.log("------>", data);
        let sql = "UPDATE users SET login=?, firstname=?, lastname=?, email=?, dob=?, country=?, ci" +
            "ty=?, text1=?, text2=?, text3=? WHERE id=?"
        let values = [
            data.username,
            data.firstname,
            data.lastname,
            data.email,
            new Date(data.birthday.year, data.birthday.month, data.birthday.day),
            data.country,
            data.city,
            data.text1,
            data.text2,
            data.text3,
            data.id
        ];
        return (this.selectRequest(sql, values))
    }

    public unsetFirstLogin(userId) {
        let sql = "UPDATE users SET firstLogin=0 WHERE id=?"
        let values = [userId];
        return (this.selectRequest(sql, values))
    }

    public getUserByEmail(email) {
        let sql = "SELECT * FROM users WHERE email=?";
        return (this.selectRequest(sql, email))
    }

    public getUser(id) {
        let sql = "SELECT * FROM users WHERE id=?";
        let value = [id];
        return (this.selectRequest(sql, value))
    }

    public getUserTraits(UserID) {
        let sql = "SELECT * FROM traits WHERE UserID=?";
        let value = [UserID];
        return (this.selectRequest(sql, value))
    }

    public getUserProfile(ProfileID, UserID) {
        let sql = `SELECT u.*, ur.Type AS relation\
        FROM users u\
        LEFT JOIN users_relations ur\
        ON ur.UserID=? AND ur.TargetID=?\
        WHERE u.id=?`;
        let value = [UserID, ProfileID, ProfileID];
        return (this.selectRequest(sql, value))
    }

    public getRandUsers() {
        let sql = "SELECT u.id, u.login, u.dob, u.city , p.link\
        FROM `users` u\
        LE" +
            "FT JOIN photos p\
        ON p.idUser = u.id AND p.isProfil = 1\
        WHERE 1" +
            "\
        ORDER BY RAND()\
        LIMIT 6";
        let value = [];
        return (this.selectRequest(sql, value))
    }

    public getNewUsers(UserID) {
        let sql = `SELECT u.id, u.login, u.dob, u.city, p.link, ${this.isFriend}\
        FROM users u\
        LEFT JOIN photos p\
        ON p.idUser = u.id AND p.isProfil = 1\
        WHERE u.id != ?\
        ORDER BY RAND()\
        LIMIT 6`;
        let value = [UserID, UserID];
        return (this.selectRequest(sql, value))
    }

    public getLikedUsers(UserID) {
        let sql = `SELECT u.id, u.login, u.dob, u.city, p.link, ${this.isFriend}\
        FROM users_relations ur\
        LEFT JOIN users u\
        ON u.id=ur.TargetID\
        LEFT JOIN photos p\
        ON p.idUser = u.id AND p.isProfil = 1\
        WHERE ur.UserID=? AND ur.Type=1\
        ORDER BY RAND()\
        LIMIT 6`;
        let value = [UserID, UserID];
        return (this.selectRequest(sql, value))
    }

    public searchUsers(filters: any, UserID: number) {
        let sql = `SELECT u.id, u.login, u.dob, u.city , p.link, ${this.isFriend}\
        FROM users u\
        LEFT JOIN photos p\
        ON p.idUser = u.id AND p.isProfil = 1\
        WHERE 1\
        ORDER BY RAND()\
        LIMIT 20`;
        let value = [UserID];
        return (this.selectRequest(sql, value))
    }

    public reportUser(UserID: number, TargetID: number) {
        let sql = `INSERT INTO users_reports (UserID, TargetID) VALUES (?,?)`;
        let value = [UserID, TargetID];
        return (this.selectRequest(sql, value))
    }

    public likeOrBlockUser(UserID: number, TargetID: number, Type: number) {
        let sql = `INSERT INTO users_relations (UserID, TargetID, Type, Date) VALUES(?,?,?, NOW()) ON DUPLICATE KEY UPDATE Type=?, Date=NOW()`;
        let value = [UserID, TargetID, Type, Type];
        return (this.selectRequest(sql, value))
    }

    public updateUserTraits(UserID: number, Traits: any) {
        let sql = `UPDATE traits SET size=?, orientation=?, kids=?, status=?, ethnicity=?, religion=?, smoke=?, drink=?, drugs=?, diet=?, sign=? WHERE UserID=?`;
        let value = [
            Traits.size,
            Traits.orientation,
            Traits.kids,
            Traits.status,
            Traits.ethnicity,
            Traits.religion,
            Traits.smoke,
            Traits.drink,
            Traits.drugs,
            Traits.diet,
            Traits.sign,
            UserID
        ];
        return (this.selectRequest(sql, value))
    }

    public getUserMightLikeUsers(userId) {
        let sql = "SELECT * FROM users WHERE id!=? ORDER BY RAND() LIMIT 6";
        return (this.selectRequest(sql, [userId]))
    }

    public getUserProfilePhoto(userId) {
        let sql = "SELECT link FROM photos WHERE idUser=? AND isProfil=?"; //isProfile
        return (this.selectRequest(sql, [userId, 1]))
    }

    public getUserPhotos(userId) {
        let sql = "SELECT id, link, isProfil FROM photos WHERE idUser=?";
        return (this.selectRequest(sql, [userId]))
    }

    public downloadPhoto(url, login) {
        return new Promise((resolve, reject) => {
            let directory = `../api/public/photos/${login}/`; // Docker: Check if it work
            let filename = login + '-' + Date.now() + '.jpg';
            let dlOptions = {
                directory: directory,
                filename: filename
            };
            console.log('CCCCC');
            Download(url, dlOptions, function (err) {
                if (err)
                    reject(err);
                resolve(filename);
            });
        })
    }

    createNewUser(user): Promise<object> {
        let sql = "INSERT INTO users (login, firstname, lastname, password, email, gender, orientat" +
            "ion, dob, registered, country, city, nat) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        let values = [
            user.username,
            user.firstname,
            user.lastname,
            user.password,
            user.email,
            user.gender,
            user.orientation,
            new Date(user.birthday.year, user.birthday.month, user.birthday.day),
            new Date(),
            user.country,
            user.city,
            'FR' // TODO : countries API/Json
        ];
        return (this.selectRequest(sql, values));
    };

    createUserTraits(UserID): Promise<object> {
        let sql = "INSERT INTO traits (UserID, size, gender, orientation, kids, status, ethnicity, religion, smoke, drink, drugs, diet, sign) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        let values = [
            UserID,
            getRandomInt(150, 200),
            getRandomInt(0, 3),
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
        return (this.selectRequest(sql, values));
    };

    insertNewRandUser(user): Promise<object> {
        let sql = "INSERT INTO users (\
            login,\
            firstname,\
            lastname,\
            password,\
            email,\
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
            size\
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        let values = [
            user.login.username,
            user.name.first,
            user.name.last,
            user.login.password,
            user.email,
            new Date(user.dob.date),
            new Date(user.registered.date),
            city,
            country, // ???
            user.nat.toLowerCase(),
            Math.random() >= 0.5, // Boolean random
            1,
            randomDate(user.registered),
            loremIpsum({
                count: getRandomInt(1, 10)
            }),
            loremIpsum({
                count: getRandomInt(1, 10)
            }),
            loremIpsum({
                count: getRandomInt(1, 10)
            }),
            getRandomInt(150, 200),
        ];
        return (this.selectRequest(sql, values)); //.insertId;
    };

    public insertNewPhoto(link, idUser, isProfil) {
        let sql = "INSERT INTO photos (link, idUser, created, isProfil) VALUES (?,?,?,?)";
        let values = [
            link, idUser, Date.now(),
            isProfil
        ];
        return (this.selectRequest(sql, values));
    }

}
export default new userServices();

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
