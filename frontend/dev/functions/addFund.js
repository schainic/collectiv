const http = require('http');

function addFund(name, groupid, callback) {

	var postData = {
		"fund_name": name,
		"group_id": groupid
	};

	const options = {
		method: 'POST',
		path: '/api/fund/add',
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
			var bodyJSON = JSON.parse(body);
			callback(res, bodyJSON);
		});

		res.on('error', (e) => {
			console.log(`Error: ${e.message}`);
		});

	});

	req.write(JSON.stringify(postData));
	req.end();

}

module.exports = { addFund }
