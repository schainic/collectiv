// var fs = require('fs');
// var request = require('request');
const http = require('http');

function sendSignUpRequest(name, email, password, callback) {

	var postData = {
		"name": name,
		"email": email,
		"password": password
	};

	const options = {
		method: 'POST',
		path: '/api/auth/signup',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	var req = http.request(options, (res) => {
		var body = '';
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			body += chunk.toString();
		});

		res.on('end', () => {
			callback(res, body);
		});

		res.on('error', (e) => {
			console.log(`Error: ${e.message}`);
		});

	});

	req.write(JSON.stringify(postData));
	req.end();

}

module.exports = { sendSignUpRequest }
