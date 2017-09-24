const http = require('http');

function addUserToGroup(groupid, email, callback) {

	var postData = {
		
		"group_id": groupid,
		"email": email
	};

	const options = {
		method: 'POST',
		path: '/api/groups/invite',
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

module.exports = { addUserToGroup }
