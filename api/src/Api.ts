import * as express from 'express';
import * as path from 'path';
import * as assert from 'assert';
import * as cmd from 'node-cmd';
import * as request from 'request';
import * as multer from 'multer';
import * as download from 'download-file';
import * as bodyParser from 'body-parser';

import UserRouter from './routes/userRoutes';
import TagsRouter from './routes/tagsRoutes';

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
        this.express.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
          
    }

    private routes() : void {
        let router = express.Router();
        
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World !'
            });
        });

        this.express.use(function (req, res, next) {
            console.log('\n====================================');
            console.log('API request ----> ', req.path); // populated!
            next();
          });

        this.express.use('/', router);
        this.express.use('/api', UserRouter.router);
        this.express.use('/api/tags', TagsRouter.router);
    }
}

export default new Api().express;