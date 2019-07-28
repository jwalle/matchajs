import { Router, Request, Response, NextFunction } from 'express';
import userServices from '../services/service.user'
import * as jwt from "jsonwebtoken";

export interface userType {
    email: string;
    password: string;
}

export class AuthRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
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

    public authFromToken(req: Request, res: Response, next: NextFunction): void {
        let token = req.body.token;
        if (!token) {
            res
                .status(401)
                .json({ message: 'Must pass token !' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, _res) => {
            if (err)
                throw err;
            const UserID = _res.payload.id;
            userServices
                .getUserProfile(UserID, UserID)
                .then((user: any) => {
                    userServices
                        .getUserPhotos(UserID)
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
                                    .send({ user: user[0], token });
                            } else {
                                res
                                    .status(404)
                                    .send({ message: 'no user found whit this id.', status: res.status });
                            }
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log('error getUserProfile : ', err))
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
            .post('/signin', this.auth);
        this
            .router
            .post('/authFromToken', this.authFromToken);
        this
            .router
            .post('/signup', this.signup);
    }
}

const authRoute = new AuthRouter();
authRoute.init();

export default authRoute;