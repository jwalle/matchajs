import { Router, Request, Response, NextFunction } from 'express';
import tagsService from '../services/service.tag';
let request = require('request');

export class tagsRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    // @route   POST api/tags
    // @desc    add a tag
    // @access  Public
    public addTag(req: Request, res: Response, next: NextFunction): void {
        const { newTag, inOrOut } = req.body;
        tagsService.addTag(newTag, inOrOut)
        .then((results: any) => {
            if (results){
                // console.log('RESULTS ---> ',results);
                let tag = {
                    id: results.insertId,
                    tag: newTag,
                    in_or_out: inOrOut,
                    value: false
                };
                res.status(200).send(tag);
            }
        })
        .catch((err) => {
            console.log("addTag error :" + err);
        });
    }

    // @route   POST api/tags
    // @desc    set a tag to a user
    // @access  Public
    public setTag(req: Request, res: Response, next: NextFunction): void {
        const { setTags, userId } = req.body;
        tagsService.setTag(setTags, userId);
        res.status(200);
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
        this.router.post('/addTag', this.addTag)
        this.router.post('/setTag', this.setTag)
        console.log('route READY.');
    }
}

const tagsRoutes = new tagsRouter();
tagsRoutes.init();

export default tagsRoutes;

