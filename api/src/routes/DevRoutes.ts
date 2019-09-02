import { Router, Request, Response, NextFunction } from 'express';
import userServices from '../services/service.user';
import devServices from '../services/service.dev';
import tagsServices from '../services/service.tag'

let request = require('request');

export interface userType {
    email: string;
    password: string;
}

export class DevRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    getDBinfos = (req: Request, res: Response, next: NextFunction) => {
        devServices.getDBUsers()
            .then((results) => {
                const users = JSON.parse(JSON.stringify(results));
                // console.log(users);
                res.status(200).send({
                    usersCount: users.length,
                    connectedUsers: 10,
                });
            })
            .catch((err) => console.log(err));
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

    public fillUserTags = (UserID) => {
        tagsServices
            .getAll()
            .then((Tags: any) => {
                Tags.map((tag) => {
                    if (Math.random() >= 0.8)
                        tagsServices.addTagToUser(UserID, tag.id);
                })
            })
    }

    public fillUserRelations = (UserID) => {
        userServices
            .getRandUsers(UserID, 20)
            .then((users: any) => {
                users.map((user) => {
                    userServices.likeOrBlockUser(UserID, user.id, 1);
                })
            })
    }

    public fillDb = (user) => {
        let url = user.picture.large;
        return new Promise((res, rej) => {
            devServices
                .insertNewRandUser(user)
                .then((result1: any) => {
                    const UserID = result1.insertId;
                    devServices.createUserTraits(UserID);
                    devServices.createUserInfo(UserID, user);
                    this.fillUserTags(UserID);
                    this.fillUserRelations(UserID);
                    devServices
                        .downloadPhoto(url, user.login.username)
                        .then((result2) => {
                            userServices
                                .insertNewPhoto(result2, UserID, 1)
                                .then((result3: any) => { console.log('RESULT3 ->>> ', result3.insertId); res(true) })
                        })
                });
        })
    }

    public makeOneUser(req: Request, res: Response, next: NextFunction): void {
        this
            .makeUser()
            .then((user: any) => {
                return ((JSON.parse(user).results[0]));
            })
            .then((response) => {
                this.fillDb(response);
            })
            .catch((error) => {
                throw error
            });
    }

    public makeUsers(req: Request, res: Response, next: NextFunction): void {
        // let io = Global.io;

        // global.io.on('connection', (socket) => {
        //     console.log('new client connected !!');
        //     socket.emit('COUCOU', 12);
        //     socket.on('disconnect', () => console.log('client disconnected !!'));
        // });

    }


    init() {
        this
            .router
            .get('/makeUser', this.makeOneUser.bind(this));
        this
            .router
            .get('/makeUsers/:nb', this.makeUsers.bind(this));
        this
            .router
            .get('/getDBinfos', this.getDBinfos);
    }
}

const devRoutes = new DevRouter();
devRoutes.init();

export default devRoutes;