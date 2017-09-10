const 
	express = require('express'),
	app = express(),
	request = require('request'),
	bodyParser = require('body-parser'),
	sys = require('sys'),
	exec = require('child_process').exec

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (9001))

app.get('/', (req, res) => {
	res.send('Node Slack Reboot Online');
})

app.post('/reboot', (req, res) => {
	// Command on server here - you can make this a shell script or whatever too
	exec("/sbin/reboot", (error) => {
		if (error !== null) {
			var body = {
				response_type: "in_channel",
				text: 'exec error: ' + error
			}
		} else {
			var body = {
				response_type: "in_channel",
				text: 'Reboot Success'
			}
		}
		res.send(body)
	})
})

app.listen(app.get('port'), () => {
	console.log('Node Slack Reboot is running on port', app.get('port'))
})
