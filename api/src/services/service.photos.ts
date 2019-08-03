let db = require('../db');

class photosServices {
    constructor() {
    }

    public request(sql: string, data: any): Promise<object> {
        console.log('request made --> ', sql, data);
        return new Promise(function (resolve, reject) {
            db.pool.getConnection(function (err, connection) {
                connection.query(sql, data, function (err, result) {
                    if (err) reject(err);
                    connection.release();
                    console.log('====================================\n');
                    resolve(result);
                })
            })
            // db.connection.end();
        })
    }

    public getAllFromUser(userId: number) {
        let sql = "SELECT * FROM photos WHERE idUser=?";
        let values = [userId];
        return (this.request(sql, values));
    }

    public getProfil(userId: number) {
        let sql = "SELECT * FROM photos WHERE idUser=? AND isProfil=1";
        let values = [userId];
        return (this.request(sql, values));
    }

    public deletePhoto(photoId: number) {
        let sql = "DELETE FROM photos WHERE id=?";
        let values = [photoId];
        return (this.request(sql, values));
    }

    public changeProfil(photoId: number, isProfil: boolean) {
        let sql = "UPDATE photos SET isProfil=? WHERE id=?";
        let values = [isProfil, photoId];
        return (this.request(sql, values));
    }

    // public photoUpload(photo: string, userId: number) {
    //     let sql = "";
    //     let values = [
    //         user_id
    //     ];
    //     return (this.request(sql, values));
    // }
}

export default new photosServices();