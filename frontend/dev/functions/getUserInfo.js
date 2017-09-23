const http = require('http');

// Calls callback(x) where x is a user object or null if not logged in

function getUserInfo(callback) {

	const options = {
		method: 'GET',
		path: '/api/auth/me',
	}

	var req = http.request(options, (res) => {
		var body = '';
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			body += chunk.toString();
		});

		res.on('end', () => {
			if (res.statusCode == 200) {
				callback(JSON.parse(body));
			}
			else {
				callback(null);
			}
		});

		res.on('error', (e) => {
			console.log(`Error: ${e.message}`);
		});

	});

	req.end();

}

module.exports = { getUserInfo }
