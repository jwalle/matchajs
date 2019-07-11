import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as assert from 'assert';
import * as cmd from 'node-cmd';
import * as request from 'request';
import * as multer from 'multer';
import * as download from 'download-file';
import * as bodyParser from 'body-parser';
var jwt = require('jsonwebtoken');

import UserRouter from './routes/userRoutes';
import AuthRouter from './routes/AuthRouter';
import TagsRouter from './routes/tagsRoutes';
import PhotosRouter from './routes/photosRoutes';

class Api {
    public express : express.Application;

    constructor() {
        this.express = express();

        this
            .express
            .use(express.static(path.join(__dirname, '../public')));
        this
            .express
            .use(express.static(path.join(__dirname, '../data/photos')));
        this.middleware();
        this.routes();
    }

    private middleware() : void {
        this
            .express
            .use(bodyParser.json({limit: '10mb'}));
        this
            .express
            .use(cors());
        this
            .express
            .use(bodyParser.urlencoded({limit: '10mb', extended: false}));
        this
            .express
            .use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, authorization, X-Requested-With, Content-Type, Accept");
                next();
            });

    }

    isLoggedIn = (req, res, next) => {
        // check header or url parameters or post parameters for token
        var token = req.headers['authorization'];
        console.log('toooken: ', token);
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                console.log('TCL: -----------------------------------------')
                console.log('TCL: Api -> isLoggedIn -> decoded', decoded)
                console.log('TCL: -----------------------------------------')
                if (err) {
                    return res
                        .status(401)
                        .send({success: false, message: 'Sign in to continue.'});
                } else {
                    res.locals.UserID = decoded.payload.id;
                    console.log(res.locals.UserID);
                    // if everything is good, save to request for use in other routes
                    next();
                }
            });
        } else {
            // if there is no token return an error
            return res
                .status(401)
                .send({success: false, message: 'Sign in to continue.'});
        }
    }

    private routes() : void {
        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({message: 'Hello World !'});
        });

        this
            .express
            .use(function (req, res, next) {
                console.log('\n====================================');
                console.log('API request ----> ', req.path); // populated!
                next();
            });

        this
            .express
            .use('/', router);
        this
            .express
            .use('/api/auth', AuthRouter.router);
        this
            .express
            .use('/api/user', this.isLoggedIn, UserRouter.router);
        this
            .express
            .use('/api/tags', this.isLoggedIn, TagsRouter.router);
        this
            .express
            .use('/api/photos', PhotosRouter.router);
    }
}

export default new Api().express;