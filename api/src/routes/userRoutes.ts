import { Router, Request, Response, NextFunction } from 'express';
import userServices from '../services/service.user'
import * as jwt from "jsonwebtoken";
let request = require('request');

export interface userType {
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
                } else {
                    reject('error request user : ' + error);
                }
            })
        })
    }

    public getUserProfilePhoto(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id, 10);
        userServices
            .getUserProfilePhoto(query)
            .then((photo) => {
                if (photo) {
                    res
                        .status(200)
                        .send(photo);
                } else {
                    res
                        .status(404)
                        .send({ message: 'no photo found whit this id.', status: res.status });
                }
            })
    }

    public mightLike(req: Request, res: Response, next: NextFunction) {
        const { UserID } = res.locals;
        userServices
            .getUserMightLikeUsers(UserID)
            .then((users) => {
                if (users) {
                    console.log(users)
                    res
                        .status(200)
                        .send(users);
                } else {
                    res
                        .status(404)
                        .send({
                            message: 'no users corresponding found.', // TODO: better msg
                            status: res.status
                        });
                }
            })
    }

    public getUser(req: Request, res: Response, next: NextFunction) {
        let query = req.params.id;
        userServices
            .getUser(query)
            .then((user) => {
                if (user) {
                    res
                        .status(200)
                        .send({ user });
                } else {
                    res
                        .status(404)
                        .send({ message: 'no user found whit this id.', status: res.status });
                }
            })
    }

    public getUserProfile(req: Request, res: Response, next: NextFunction) {
        let ProfileID = req.params.UserID;
        const { UserID } = res.locals;
        userServices
            .getUserProfile(ProfileID, UserID)
            .then((user: any) => {
                userServices
                    .getUserPhotos(ProfileID)
                    .then((photos) => {
                        return user[0] = {
                            ...user[0],
                            photos
                        }
                    })
                    .then((_user) => {
                        if (_user) {
                            res
                                .status(200)
                                .send({ user });
                        } else {
                            res
                                .status(404)
                                .send({ message: 'no user found whit this id.', status: res.status });
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log('error getUserProfile : ', err))
    }

    public getRandUsers(req: Request, res: Response, next: NextFunction) {
        // let UserID = 1;
        const { UserID } = res.locals;
        userServices
            .getRandUsers()
            .then((users) => {
                if (users) {
                    res
                        .status(200)
                        .send(users);
                } else {
                    res
                        .status(404)
                        .send({ message: 'no user found whit this id.', status: res.status });
                }
            })
    }

    public getLikedUsers(req: Request, res: Response, next: NextFunction) {
        const { UserID } = res.locals;
        userServices
            .getLikedUsers(UserID)
            .then((users) => {
                if (users) {
                    res
                        .status(200)
                        .send(users);
                } else {
                    res
                        .status(400)
                        .send({ message: 'no liked user found.', status: res.status });
                }
            })
    }

    public getNewUsers(req: Request, res: Response, next: NextFunction) {
        const { UserID } = res.locals;
        userServices
            .getNewUsers(UserID)
            .then((users) => {
                if (users) {
                    res
                        .status(200)
                        .send(users);
                } else {
                    res
                        .status(400)
                        .send({ message: 'no new user found.', status: res.status });
                }
            })
    }

    public fillDb(user) {
        let url = user.picture.large;

        userServices
            .insertNewUser(user)
            .then((result1: any) => {
                userServices
                    .downloadPhoto(url, user.login.username)
                    .then((result2) => {
                        userServices
                            .insertNewPhoto(result2, result1.insertId, 1)
                            .then(() => { })
                    })
            });
    }

    public makeOneUser(req: Request, res: Response, next: NextFunction): void {
        this
            .makeUser()
            .then((user: any) => {
                return ((JSON.parse(user).results[0]));
            })
            .then((response) => {
                this.fillDb(response)
            })
            .catch((error) => {
                throw error
            });
    }

    public signup(req: Request, res: Response, next: NextFunction): void {
        userServices
            .createNewUser(req.body.user)
            .then((results: any) => {
                if (results) {
                    userServices
                        .getUser(results.insertId)
                        .then((result: any) => {
                            const user = result[0];
                            console.log('COUCOU', user);
                            if (user) {
                                res
                                    .status(200)
                                    .json({
                                        user: {
                                            id: user.id,
                                            login: user.login,
                                            firstname: user.firstname,
                                            lastname: user.lastname,
                                            gender: user.gender,
                                            orientation: user.orientation,
                                            dob: user.dob,
                                            confirmed: user.confirmed,
                                            firstLogin: user.firstLogin
                                        },
                                        token: userServices.toAuthJSON({ id: user.id, login: user.login })
                                    })
                                    .send();
                            } else {
                                res
                                    .status(400)
                                    .json({
                                        errors: {
                                            global: "Backend Signup error"
                                        }
                                    })
                            }
                        })
                }
            })
    }

    public updateUserInfo(req: Request, res: Response, next: NextFunction): void {
        userServices
            .updateUserInfo(req.body)
            .then((results: any) => {
                if (results) {
                    res
                        .status(200)
                        .end();
                }
            })
    }

    public unsetFirstLogin(req: Request, res: Response, next: NextFunction): void {
        let userId = req.body.userId;
        userServices
            .unsetFirstLogin(userId)
            .then((results: any) => {
                if (results) {
                    res
                        .status(200)
                        .end();
                }
            })
    }

    public reportUser(req: Request, res: Response, next: NextFunction): void {
        let targetID = req.body.UserID;
        const { UserID } = res.locals;
        userServices
            .reportUser(UserID, targetID)
            .then((results: any) => {
                if (results) {
                    res
                        .status(200)
                        .end();
                }
            })
    }

    public updateUserRelation(req: Request, res: Response, next: NextFunction): void {
        let { TargetID, Type } = req.body;
        const { UserID } = res.locals;
        userServices
            .likeOrBlockUser(UserID, TargetID, Type)
            .then((results: any) => {
                if (results) {
                    userServices.getUserProfile(TargetID, UserID)
                        .then((user) => {
                            console.log(user);
                            res.status(200).send(user[0]);
                        })
                        .catch((err) => {
                            res.status(400).end();
                        })
                }
            })
    }

    public getSearchResults(req: Request, res: Response, next: NextFunction): void {
        let filters = req.body.filters;
        const { UserID } = res.locals;
        userServices
            .searchUsers(filters, UserID)
            .then((results: any) => {
                if (results) {
                    res
                        .status(200)
                        .send(results);
                } else {
                    res
                        .status(400)
                        .end();
                }
            })
    }

    public auth(req: Request, res: Response, next: NextFunction): void {
        const { credentials } = req.body;

        userServices
            .getUserByEmail(credentials.email)
            .then((results: any) => {
                const user: any = results[0];
                if (user && userServices.isValidPassword(user.password, credentials.password)) {
                    res
                        .status(200)
                        .json({
                            user: {
                                id: user.id,
                                login: user.login,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                gender: user.gender,
                                orientation: user.orientation,
                                dob: user.dob,
                                confirmed: user.confirmed,
                                firstLogin: user.firstLogin
                            },
                            token: userServices.toAuthJSON({ id: user.id, login: user.login })
                        })
                        .send();
                } else {
                    res
                        .status(400)
                        .json({
                            errors: {
                                global: "Invalid credentials"
                            }
                        })
                }
            })
            .catch(err => {
                console.log('auth ERROR : ', err);
            })
    }

    init() {
        this
            .router
            .get('/makeUser', this.makeOneUser.bind(this));
        this
            .router
            .get('/getProfilePhoto/:id', this.getUserProfilePhoto);
        this
            .router
            .get('/getUserProfile/:UserID', this.getUserProfile);
        this
            .router
            .get('/getRandUsers', this.getRandUsers);
        this
            .router
            .get('/getLikedUsers', this.getLikedUsers);
        this
            .router
            .get('/getNewUsers', this.getNewUsers);
        this
            .router
            .get('/getUserProfile/:UserID', this.getUserProfile);
        this
            .router
            .get('/getMightLike', this.mightLike);
        this
            .router
            .post('/auth', this.auth);
        this
            .router
            .post('/signup', this.signup);
        this
            .router
            .post('/updateUserInfo', this.updateUserInfo);
        this
            .router
            .post('/unsetFirstLogin', this.unsetFirstLogin);
        this
            .router
            .post('/getSearchResults', this.getSearchResults);
        this
            .router
            .post('/reportUser', this.reportUser);
        this
            .router
            .post('/updateUserRelation', this.updateUserRelation);
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes;