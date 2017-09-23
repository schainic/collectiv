var request = require('request');

function sendLoginRequest(username, password) {

	var JSONLoginInfo = {
		"name": username,
		"pass": password
	};

	request({
		url: '/api/auth/signin',
		json: true,
		body: JSONLoginInfo,
		method: "POST"
	}, function(error, response, body) {
		console.log(response);
	});
}

module.exports = { sendLoginRequest }
