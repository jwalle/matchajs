let express = require('express');
let app = express();
let fs = require('fs');
// let router = express.Router();

// Constants
//const PORT = 8080;
const HOST = '0.0.0.0';

app.set('port', process.env.PORT || 3000);
const PORT = app.get('port');

let lessMiddleware = require("less-middleware");

app.use(lessMiddleware(__dirname,{
    debug: false,
    dest: __dirname,
    force: true
}));

app.use(express.static(__dirname + "/public"));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
	fs.readFile('index.js', (err, data) => {
		if (err) throw err
		res.writeHead(200, {
			'content-type': 'text/html; charset=utf-8'
		})
		res.end(data)
	})
});
app.listen(PORT);

console.log(`Running on http://${HOST}:${PORT}`);