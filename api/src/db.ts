import { createPool } from 'mysql';


let pool = createPool({
  connectionLimit: 10,
  // host: 'mysql_1', //Docker
  host: 'localhost',
  user: 'root',
  password: 'root',
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