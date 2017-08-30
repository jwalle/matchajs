'use strict';

const app = require('express')()
let fs = require('fs');

app.set('view engine', 'ejs')
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
// app.get('/', (req, res) => {
// 	fs.readFile('index.html', (err, data) => {
// 		if (err) throw err
// 		res.writeHead(200, {
// 			'content-type': 'text/html; charset=utf-8'
// 		})
// 		res.end(data)
// 	})
// });

app.get('/', (req, res) => {
	res.render('pages/index', {test:'jwalle'})
})



app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);