import {createPool} from 'mysql';


    let pool = createPool({
            connectionLimit: 10,
            // host: 'mysql_1', //Docker
            host: 'localhost',
            user: 'jwalle',
            password: '1234',
            database: 'matchadb'
        });

    pool.getConnection(function (err, connection) {
      if (err) throw err;
    });

    module.exports = {
    pool: pool
}


//findOne
//findById
//create