let express = require('express')
let app = express()
let fs = require('fs');
// let router = express.Router();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


app.use('/public', express.static('public'))


app.get('/', (req, res) => {
	fs.readFile('index.js', (err, data) => {
		if (err) throw err
		res.writeHead(200, {
			'content-type': 'text/html; charset=utf-8'
		})
		res.end(data)
	})
});

app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);