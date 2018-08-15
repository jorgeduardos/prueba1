const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.get('/', (req, res)=> {
	res.send(`<h1>Hello User, running on PORT:${PORT} </h1>`);
})

io.on('connection', socket => {
	console.log('User has connected');

	socket.on('changeColor', color => {
		console.log('Color Change to: ', color);
		io.sockets.emit('change color', color);
	})

	socket.on('randomBackground', colors => {
		console.log("received colors: ", colors);
		io.sockets.emit("newRandomColors", colors);
	})

	socket.on('playFramerate', v => {
		console.log("Play Animation");
		io.sockets.emit("playAnimation", v);
	})

	socket.on('stopFramerate', v =>{
		console.log("Stop Animation");
		io.sockets.emit("stopAnimation", v);
	})

	socket.on('order', v =>{
		console.log("Chaging Order to: ", v);
		io.sockets.emit('orderReceived', v);
	})


	socket.on('disconnect', () => {
		console.log('User has disconnected');
	})

});

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
})