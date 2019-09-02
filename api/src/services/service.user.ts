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
        let sql = "SELECT * FROM users_traits WHERE UserID=?";
        let value = [UserID];
        return (this.selectRequest(sql, value))
    }

    public getUserInfos(UserID) {
        let sql = "SELECT * FROM users_infos WHERE UserID=?";
        let value = [UserID];
        return (this.selectRequest(sql, value))
    }

    public getUserProfile(ProfileID, UserID) {
        let sql = `SELECT u.id, u.connected, u.lastSeen, ur.Type AS relation\
        FROM users u\
        LEFT JOIN users_relations ur\
        ON ur.UserID=? AND ur.TargetID=?\
        WHERE u.id=?`;
        let value = [UserID, ProfileID, ProfileID];
        return (this.selectRequest(sql, value))
    }

    public getMainUserProfile(UserID) {
        let sql = `SELECT u.*\
        FROM users u\
        WHERE u.id=?`;
        let value = [UserID];
        return (this.selectRequest(sql, value))
    }

    public getRandUsers(UserID, limit) {
        let sql = "SELECT u.id FROM `users` u WHERE u.id != ? ORDER BY RAND() LIMIT ?";
        let value = [UserID, limit];
        return (this.selectRequest(sql, value))
    }

    public getNewUsers(UserID) {
        let sql = `SELECT u.id
        FROM users u
        WHERE u.id != ?
        ORDER BY u.registered
        LIMIT 6`;
        let value = [UserID];
        return (this.selectRequest(sql, value))
    }

    public getLikedUsers(UserID) {
        let sql = `SELECT ur.TargetID as id
        FROM users_relations ur
        WHERE ur.UserID=? AND ur.Type=1
        ORDER BY RAND()
        LIMIT 6`;
        let value = [UserID];
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
        let sql = `UPDATE users_traits SET size=?, orientation=?, kids=?, status=?, ethnicity=?, religion=?, smoke=?, drink=?, drugs=?, diet=?, sign=? WHERE UserID=?`;
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