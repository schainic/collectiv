const http = require('http');

// Calls callback(x) where x is a user object or null if not logged in

function getGroupObject(groupId, callback) {

	const options = {
		method: 'GET',
		path: '/api/group?id=' + groupId
	}

	var req = http.request(options, (res) => {
		var body = '';
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			body += chunk.toString();
		});

		res.on('end', () => {
			if (res.statusCode == 200) {
				var resData = JSON.parse(body);
				callback(resData)
			}
			else {
				console.error(res.statusCode);
			}
		});

		res.on('error', (e) => {
			console.log(`Error: ${e.message}`);
		});

	});

	req.end();

}

module.exports = { getGroupObject }
