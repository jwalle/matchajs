import { Router, Request, Response, NextFunction } from 'express';
import photosService from '../services/service.photos';
import userService from '../services/service.user';
// import {Global} from '../server';
let fs = require('fs');

export class PhotosRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    // @route   POST api/photos
    // @desc    add a photo
    // @access  Public
    public photoUpload(req: Request, res: Response, next: NextFunction): void {
        const { photo, userId } = req.body;

        userService.getUser(userId)
        .then((user: any) => {
            const filename = user[0].login + '-' + Date.now() + '.jpg';
            const dir = `${global.appRoot}/../../app/data/photos/${user[0].login}`;
            const link = dir + `/${filename}`;
            let base64Image = photo.split(';base64,').pop();
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            photosService.getProfil(userId)
            .then((profil: any) => {
                fs.writeFile(link, base64Image,{encoding: 'base64'}, (err) => {
                    if (err){
                        return res.status(500).send('plop: ' + err);
                    }
                    userService.insertNewPhoto(filename, userId,  !profil)
                    .then((results: any) => {
                        if (results) {
                            res.status(200).end();
                        }
                    })
                })
            })
        });
    }

    // @route   GET api/photos
    // @desc    Get profil photo of user
    // @access  Public
    public getProfil(req: Request, res: Response, next: NextFunction): void {
        const userId = parseInt(req.params.userId, 10);
        photosService.getProfil(userId)
        .then((results: any) => {
            if (results) {
                res.status(200).send(results);
            } else {
                res.send({
                        message: 'no profil photo found for this user',
                        status: res.status
                    });
            }
        })
    }

    // @route   GET api/photos
    // @desc    Get all photos of user
    // @access  Public
    public getAllFromUser(req: Request, res: Response, next: NextFunction): void {
        const userId = parseInt(req.params.userId, 10);
        photosService.getAllFromUser(userId)
        .then((results: any) => {
            if (results) {
                res.status(200).send(results);
            } else {
                res.send({
                        message: 'no album photo found for this user',
                        status: res.status
                    });
            }
        })
    }

    // @route   DELETE api/photos
    // @desc    delete photo of user
    // @access  Public
    public deletePhoto(req: Request, res: Response, next: NextFunction): void {
        const photoId = parseInt(req.params.photoId, 10);
        photosService.deletePhoto(photoId)
        .then((results: any) => {
            if (results) {
                res.status(200).send(results);
            } else {
                res.send({
                        message: `the photo could not be destroyed`,
                        status: res.status
                    });
            }
        })
    }
 
    // @route   POST api/photos
    // @desc    swap photo of user to profil
    // @access  Public
    public swapToProfil(req: Request, res: Response, next: NextFunction): void {
        const { photoId, userId } = req.body;
        photosService.getProfil(userId)
        .then((profilPhoto: any) => {
            const profilId = profilPhoto[0].id;
            photosService.changeProfil(profilId, false)
            .then(() => {
                photosService.changeProfil(photoId, true)
                .then((results: any) => {
                    if (results) {
                        res.status(200).send(results);
                    } else {
                        res.send({
                                message: `the photo could not be swap to profil`,
                                status: res.status
                            });
                    }
                } )
            })
        })
    }


    init() {
        this.router.get('/getAllFromUser/:userId', this.getAllFromUser)
        this.router.get('/getProfil/:userId', this.getProfil)
        this.router.post('/photoUpload', this.photoUpload)
        this.router.delete('/deletePhoto/:photoId', this.deletePhoto);
        this.router.post('/swapToProfil', this.swapToProfil);
        console.log('route READY.');
    }
}

const PhotosRoutes = new PhotosRouter();
PhotosRoutes.init();

export default PhotosRoutes;

