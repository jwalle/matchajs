import * as Download from 'download-file';
import * as jwt from "jsonwebtoken";

let db = require('../db');

class userServices {
    constructor() {
    }

    // TODO: add bcrypt password

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
            db.connection.query(sql, data, function (err, result) {
                if (err) reject(err);
                resolve(result);
            })
            // db.connection.end();
        })
    }

    public getUserByEmail(email) {
        let sql = "SELECT * FROM users WHERE email=?";
        return (this.selectRequest(sql, email))
    }

    public getUser(login) {
        let sql = "SELECT * FROM users WHERE login=?";
        return (this.selectRequest(sql, login))
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

    insertNewUser(user) : Promise<object>  {
        let sql = "INSERT INTO users (login, password, email, gender, firstname, lastname, dob, registered, city, nat) VALUES (?,?,?,?,?,?,?,?,?,?)";
        let values = [
            user.login.username,
            user.login.password,
            user.email,
            user.gender[0],
            user.name.first,
            user.name.last,
            user.dob,
            user.registered,
            user.location.city,
            user.nat
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