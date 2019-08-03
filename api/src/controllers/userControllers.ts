import serviceUser from "../services/service.user";
import serviceTag from "../services/service.tag";
import servicePhotos from "../services/service.photos";
import * as moment from 'moment';

class UserControllers {
    constructor() { }

    public getMainUser = (UserID) => {
        return new Promise(async (resolve, reject) => {
            let user: any = await JSON.parse(JSON.stringify(await serviceUser.getUserProfile(UserID, UserID)))[0];
            let tags = JSON.parse(JSON.stringify(await serviceTag.getUserTags(UserID)));
            let traits = JSON.parse(JSON.stringify(await serviceUser.getUserTraits(UserID)))[0];
            delete traits.UserID;
            let album = JSON.parse(JSON.stringify(await servicePhotos.getAllFromUser(UserID)));
            if (user) {
                resolve({
                    id: user.id,
                    info: {
                        login: user.login,
                        size: user.size,
                        dob: user.dob,
                        nat: user.nat,
                        lastseen: user.lastseen,
                        isConnected: user.isConnected,
                        confirmed: user.confirmed,
                        firstLogin: user.firstLogin,
                        text1: user.text1,
                        text2: user.text2,
                        text3: user.text3,
                    },
                    location: {
                        city: user.city,
                        country: user.country,
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