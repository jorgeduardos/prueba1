const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

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
		console.log("Changing Order to: ", v);
		io.sockets.emit('orderReceived', v);
	})
	
	socket.on('blendMode', v => {
		console.log("Changing Blend Mode to: ", v);
		io.sockets.emit('blendModeReceived', v);
	})

	socket.on('rotationSpeed', v => {
		console.log("Chaging Speed to: ", v);
		io.sockets.emit('rotationSpeedReceived', v);
	})

	socket.on('decreseRotationSpeed', v => {
		console.log("Chaging Speed to: ", v);
		io.sockets.emit('decreaseRotationSpeedReceived', v);
	})

	socket.on('disconnect', () => {
		console.log('User has disconnected');
	})

});

if (process.env.NODE_ENV === "production") {
	// Express will serve up production assests
	app.use(express.static("client/build"));
	// Express will serve up the index.html file if it doesn't recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
})

// https://stackoverflow.com/questions/40528053/npm-install-and-build-of-forked-github-repo