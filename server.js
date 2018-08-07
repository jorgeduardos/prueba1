const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 8000;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.get('/', (req, res)=> {
	res.send("<h1>Hello User</h1>");
})

io.on('connection', socket => {
	console.log('User has connected');

	socket.on('change color', color => {
		console.log('Color Change to: ', color);
		io.sockets.emit('change color', color);
	})

	socket.on('disconnect', () => {
		console.log('User has disconnected');
	})

});

server.listen(port, () => {
	console.log(`listening on port ${port}`);
})