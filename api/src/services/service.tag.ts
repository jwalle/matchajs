let db = require('../db');

class tagServices {
    constructor() {
    }

    public request(sql : string, data : any) : Promise<object> {
        console.log(sql, data);
        return new Promise(function (resolve, reject) {
            db.pool.getConnection(function(err, connection) {
                connection.query(sql, data, function (err, result) {
                    if (err) reject(err);
                    connection.release();
                    resolve(result);
                })
            })
            // db.connection.end();
        })
    }

    public insertNewTag(in_or_out: string, tag: string) {
        let sql = "INSERT INTO tags (tag, in_or_out) VALUE (?, ?)";
        let values = [
            tag,
            in_or_out
        ];
        return (this.request(sql, values));
    }

    public getAll() {
        let sql = "SELECT * FROM ??";
        let values = ['tags']; //placeholder
        return (this.request(sql, values));
    }

    public getTagByID(table: string, id: number) {
        let sql = "SELECT * FROM tags WHERE id=?";
        let values = [
            id
        ];
        return (this.request(sql, values));
    }

    public setUserTag(tag_id: number, user_id: number) {
        let sql = "INSERT INTO tags (user_id, tag_id, VALUES (?,?)";
        let values = [
            user_id,
            tag_id,
        ];
        return (this.request(sql, values));
    }

    public getUserTags(user_id: number) {
        let sql = "SELECT p1.id, p1.tag FROM tags AS p1 \
            INNER JOIN users_tags AS p2 ON p1.id = p2.tag_id AND \
            p2.user_id = ?";
        let values = [
            user_id
        ];
        return (this.request(sql, values));
    }
}

export default new tagServices();