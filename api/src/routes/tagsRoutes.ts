import { Router, Request, Response, NextFunction } from 'express';
import tagsService from '../services/service.tag';
let request = require('request');

export class tagsRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    // @route   GET api/tags
    // @desc    Get all Item
    // @access  Public
    public getAll(req: Request, res: Response, next: NextFunction): void {
        tagsService.getAll()
        .then((results: any) => {
            if (results) {
                results.forEach(element => {
                    element.value = false;
                });
                res.status(200).send(results);
            } else {
                res.send({
                        message: 'no tags list found',
                        status: res.status
                    });
            }
        })
    }

    init() {
        this.router.get('/getAll', this.getAll)
        console.log('route READY.');
    }
}

const tagsRoutes = new tagsRouter();
tagsRoutes.init();

export default tagsRoutes;

