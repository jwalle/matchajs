let db = require('../db');

export const selectRequest = (sql: string, data: any): Promise<object> => {
    console.log('request made --> ', sql, data);
    return new Promise(function (resolve, reject) {
        db
            .pool
            .getConnection(function (err, connection) {
                connection
                    .query(sql, data, function (err, result) {
                        if (err)
                            reject(err);
                        connection.release();
                        console.log('====================================\n');
                        resolve(result);
                    })
            })
        // db.connection.end();
    })
}