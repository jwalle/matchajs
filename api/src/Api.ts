import * as express from 'express';
import * as path from 'path';
import * as assert from 'assert';
import * as cmd from 'node-cmd';
import * as request from 'request';
import * as multer from 'multer';
import * as download from 'download-file';
import * as bodyParser from 'body-parser';

import  UserRouter from './routes/userRoutes';

class Api {
    public express: express.Application;

    constructor() {
        this.express = express();
    
        //this.express.use(express.static(path.join( __dirname, '../public')));
        this.express.use(express.static(path.join( __dirname, '../data/photos')));

        this.middleware();
        this.routes();
    }

    private middleware() : void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended : false}));
    }

    private routes() : void {
        let router = express.Router();
        
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World  !!!!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api', UserRouter.router);
    }
}

export default new Api().express;