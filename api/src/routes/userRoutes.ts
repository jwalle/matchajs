import { Router, Request, Response, NextFunction } from 'express';
import userServices from '../services/service.user'
import * as jwt from "jsonwebtoken";
let request = require('request');

export interface userType{
    email: string;
    password: string;
}

export class UserRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public makeUser = () => {
        return new Promise(function (resolve, reject) {
            let options = {
                url: 'https://randomuser.me/api/?nat=gb,fr,dk,ca,us,de',
                dataType: 'json'
            };
            request.get(options, function (error, response, body) {
                if (!error) {
                    resolve(body);
                }
                else {
                    reject('error request user : ' + error);
                }
            })
        })
    }

    public getUserProfilePhoto(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id, 10);
        userServices.getUserProfilePhoto(query).then((photo) =>{
        if (photo) {
            res.status(200)
                .send(photo);
        }
        else {
            res.status(404)
                .send({
                    message: 'no photo found whit this id.',
                    status: res.status
                });
            }
        })
    }

    public mightLike(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id, 10);
        userServices.getUserMightLikeUsers(query).then((users) =>{
        if (users) {
            console.log(users)
            res.status(200)
                .send(users);
        }
        else {
            res.status(404)
                .send({
                    message: 'no users corresponding found.', // TODO: better msg
                    status: res.status
                });
            }
        })
    }

    public getUser(req: Request, res: Response, next: NextFunction) {
        let query = req.params.id;
        userServices.getUser(query).then((user) => {
        if (user) {
            res.status(200)
                .send({user});
        }
        else {
            res.status(404)
                .send({
                    message: 'no user found whit this id.',
                    status: res.status
                });
        }
        })
    }

    public fillDb(user) {        
        let url = user.picture.large;

        userServices.insertNewUser(user)
            .then((result1) => {
                userServices.downloadPhoto(url, user.login.username)
                    .then((result2) => {
                        userServices.insertNewPhoto(result2, result1, 1)
                            .then(() => {
                                })
                        })
                });
    }

    public makeOneUser(req: Request, res: Response, next: NextFunction): void {
        this.makeUser()
        .then((user : any) => {
             return ((JSON.parse(user).results[0]));
        })
        .then((response) => {
            this.fillDb(response)
        })
        .catch((error) => {throw error});
    }

    public signup(req: Request, res: Response, next: NextFunction): void {
        userServices.createNewUser(req.body.user)
        .then((results: any) => {
            if (results)
                res.status(200);
        })
    }

    public updateUserInfo(req: Request, res: Response, next: NextFunction): void {
        userServices.updateUserInfo(req.body)
        .then((results: any) => {
            if (results) {
                res.status(200).end();
            }
        })
    }

    public authFromToken(req: Request, res: Response, next: NextFunction): void {
        let token = req.body.token;
        if (!token) {
            res.status(401).json({message: 'Must pass token !'});
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, _res) => {
            if (err) throw err;
            userServices.getUser(_res.payload.id)
            .then((user: any) => {
                if (user && (user = user[0])) { // beurk
                    // let u = makeCleanUser(results);
                    res.status(200).json({
                        user : {
                            id: user.id,
                            login: user.login,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            gender: user.gender,
                            orientation: user.orientation,
                            dob: user.dob,
                            confirmed: user.confirmed,
                        },
                        token
                    }).send();
                }
            })
        })
    }

    public auth(req: Request, res: Response, next: NextFunction): void {
        const { credentials } = req.body;

        userServices.getUserByEmail(credentials.email)
        .then((results: any) => {
            const user: any  = results[0];
            if (user && userServices.isValidPassword(user.password , credentials.password)) {
                res.status(200).json({
                    user : {
                        id: user.id,
                        login: user.login,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        gender: user.gender,
                        orientation: user.orientation,
                        dob: user.dob,
                        confirmed: user.confirmed,
                    },
                    token: userServices.toAuthJSON({id: user.id, login: user.login})
                }).send();
            } else {
                res.status(400).json({errors: { global: "Invalid credentials"}})                
            }
        })
        .catch(err => {
            console.log('auth ERROR : ', err);
        })
    }

    init() {
        this.router.get('/makeUser', this.makeOneUser.bind(this));
        this.router.get('/getProfilePhoto/:id', this.getUserProfilePhoto);
        this.router.get('/getUser/:id', this.getUser);
        this.router.post('/getMightLike/:id', this.mightLike);
        this.router.post('/auth', this.auth);
        this.router.post('/authFromToken', this.authFromToken);
        this.router.post('/signup', this.signup);
        this.router.post('/updateUserInfo', this.updateUserInfo);
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes;