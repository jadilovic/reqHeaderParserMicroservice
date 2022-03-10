// server.js
// where your node app starts

// init project
require('dotenv').config();
const axios = require('axios');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const { response } = require('express');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
	const lang = req.headers['accept-language'];
	const soft = req.headers['user-agent'];
	const getIpAddress = async () => {
		const ipAddress = await axios.get('https://api.ipify.org?format=json');
		console.log(ipAddress.data.ip);
		res.json({
			ipaddress: `::ffff:${ipAddress.data.ip}`,
			language: lang,
			software: soft,
		});
	};
	getIpAddress();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
