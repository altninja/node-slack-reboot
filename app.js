const 
	express = require('express'),
	app = express(),
	request = require('request'),
	bodyParser = require('body-parser'),
	sys = require('sys'),
	exec = require('child_process').exec;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (9001));

app.get('/', (req, res) => {
	res.send('Node-Slack-Rebooter9000XXL Online');
});

app.post('/reboot', (req, res) => {
	exec("reboot", (error) => {
		if (error !== null) {
			var body = {
				response_type: "in_channel",
				text: 'exec error: ' + error
			};
			res.send(body);	
		} else {
			var body = {
				response_type: "in_channel",
				text: 'Rebooting Dev Server'
		  	};
			res.send(body);	
		}
	});
});

app.listen(app.get('port'), () => {
	console.log('Node-Slack-Reboot is running on port', app.get('port'));
});
