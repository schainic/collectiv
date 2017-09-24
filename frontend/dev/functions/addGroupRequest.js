const http = require('http');

function addGroupRequest(name, callback) {

	var postData = {
		"group_name": name,
	};

	const options = {
		method: 'POST',
		path: '/api/groups/add',
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
			var bodyJson = JSON.parse(body);
			callback(res, bodyJson);
		});

		res.on('error', (e) => {
			console.log(`Error: ${e.message}`);
		});

	});

	req.write(JSON.stringify(postData));
	req.end();

}

module.exports = { addGroupRequest }
