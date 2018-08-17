let db = require('../db');

class photosServices {
    constructor() {
    }

    public request(sql : string, data : any) : Promise<object> {
        console.log('request made --> ', sql, data);
        return new Promise(function (resolve, reject) {
            db.pool.getConnection(function(err, connection) {
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

    // public photoUpload(photo: string, userId: number) {
    //     let sql = "";
    //     let values = [
    //         user_id
    //     ];
    //     return (this.request(sql, values));
    // }
}

export default new photosServices();