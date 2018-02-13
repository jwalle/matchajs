import { Router, Request, Response, NextFunction } from 'express';
import userServices from '../services/service.user'
import { createInterface } from 'readline';
let request = require('request');

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

    init() {
        this.router.get('/makeUser', this.makeOneUser.bind(this));
        this.router.get('/getProfilePhoto/:id', this.getUserProfilePhoto);
        this.router.get('/getUser/:id', this.getUser);
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes;