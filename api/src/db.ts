import {createConnection} from 'mysql';


    let connection = createConnection({
            host: 'mysql_1',
            user: 'jwalle',
            password: '1234',
            database: 'matchadb'
        });



    connection.connect(function (err) {
      if (err) throw err;
    });


    


    module.exports = {
    connection: connection
}





//findOne
//findById
//create














// }

/* eslint-disable no-console */

// const imageFilter = function (req, file, cb) {
//     //only accept image
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };
//
// const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//        cb(null, './data');
//    },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
//
// let upload = multer({ storage: storage, fileFilter: imageFilter }).any();
