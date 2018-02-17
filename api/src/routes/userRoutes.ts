import { Router, Request, Response, NextFunction } from 'express';
import userServices from '../services/service.user'
import { createInterface } from 'readline';
import serviceUser from '../services/service.user';
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
                        userServices.insertNewPhoto(result2, result1)
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

    public auth(req: Request, res: Response, next: NextFunction): void {
        const { credentials } = req.body;

        userServices.getUserByEmail(credentials.email)
        .then((results: any) => {
            const user: any  = results[0];
            if (user && serviceUser.isValidPassword(user.password , credentials.password)) {
                res.json({user: serviceUser.toAuthJSON(user.email)})
            } else {
                res.status(400).json({errors: { global: "Invalid credentials"}})                
            }
        })
        .catch(err => {
            console.log('auth ERROR : ', err);
        })
    }

    public signup(req: Request, res: Response, next: NextFunction): void {
        console.log('====================================');
        console.log(req.body);
        console.log('====================================');
    }
    
    init() {
        this.router.get('/makeUser', this.makeOneUser.bind(this));
        this.router.get('/getProfilePhoto/:id', this.getUserProfilePhoto);
        this.router.get('/getUser/:id', this.getUser);
        this.router.post('/auth', this.auth);
        this.router.post('/signup', this.signup);
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes;