// var fs = require('fs');
// var request = require('request');
const http = require('http');
const queryString = require('querystring');

function sendSignUpRequest(name, email, password) {

	var postData = queryString.stringify({
		"name": name,
		"email": email,
		"pass": password
	});

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
			console.log(body);
			// do stuff here
		});

		res.on('error', (e) => {
			console.log(`Error: ${e.message}`);
		});

	});

	req.write(postData);
	req.end();

	// request({
	// 	url: '/api/auth/signup',
	// 	json: true,
	// 	body: JSONLoginInfo,
	// 	method: "POST"
	// }, function(error, response, body) {
	// 	console.log(response);
	// });

	// request.post({ url: '/api/auth/signup/', formData: JSONLoginInfo }, (err, response, body) => {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	else {
	// 		console.log(response);
	// 		console.log(body);
	// 	}
	// });

}

module.exports = { sendSignUpRequest }
