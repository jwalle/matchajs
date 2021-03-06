import serviceUser from "../services/service.user";
import serviceTag from "../services/service.tag";
import servicePhotos from "../services/service.photos";
import * as moment from 'moment';

class UserControllers {
    //constructor() { }

    public getMainUser = (UserID) => {
        return new Promise(async (resolve, reject) => {
            let user: any = await JSON.parse(JSON.stringify(await serviceUser.getMainUserProfile(UserID)))[0];
            let tags = JSON.parse(JSON.stringify(await serviceTag.getUserTags(UserID)));
            let traits = JSON.parse(JSON.stringify(await serviceUser.getUserTraits(UserID)))[0];
            let infos = JSON.parse(JSON.stringify(await serviceUser.getUserInfos(UserID)))[0];
            delete traits.UserID;
            delete infos.UserID;
            let album = JSON.parse(JSON.stringify(await servicePhotos.getAllFromUser(UserID)));
            if (user) {
                resolve({
                    id: user.id,
                    email: user.email,
                    info: infos,
                    location: {
                        position: {
                            lat: undefined, // TODO: location
                            lng: undefined
                        }
                    },
                    traits,
                    tags,
                    album,
                });
            } else {
                reject('NO USER FOUND');
            }
        })
    }

    public getUser = (MainID, UserID) => {
        return new Promise(async (resolve, reject) => {
            let user: any = await JSON.parse(JSON.stringify(await serviceUser.getUserProfile(UserID, MainID)))[0];
            let tags = JSON.parse(JSON.stringify(await serviceTag.getUserTags(UserID)));
            let traits = JSON.parse(JSON.stringify(await serviceUser.getUserTraits(UserID)))[0];
            let infos = JSON.parse(JSON.stringify(await serviceUser.getUserInfos(UserID)))[0];
            delete traits.UserID;
            let album = JSON.parse(JSON.stringify(await servicePhotos.getAllFromUser(UserID)));
            if (user) {
                resolve({
                    id: user.id,
                    connected: user.connected,
                    relation: user.relation,
                    lastseen: user.lastseen,
                    info: infos,
                    location: {
                        position: {
                            lat: undefined, // TODO: location
                            lng: undefined
                        }
                    },
                    traits,
                    tags,
                    album,
                });
            } else {
                reject('NO USER FOUND');
            }
        })
    }
}

export default new UserControllers();