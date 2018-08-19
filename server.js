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

	socket.on('colorPallet', colorPallet => {
		console.log("color pallet: ", colorPallet);
		io.sockets.emit("colorPalletReceived", colorPallet);
	})

	socket.on('playFramerate', v => {
		console.log("Play Animation");
		io.sockets.emit("playAnimation", v);
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

	socket.on('addSquare', v => {
		console.log('adding square: ', v);
		io.sockets.emit('addSquareReceived', v);
	})
	socket.on('removeSquare', v => {
		console.log('removing square to: ', v);
		io.sockets.emit('removeSquareReceived', v);
	})

	socket.on('reset', ()=>{
		console.log('Reseting to default state');
		io.sockets.emit('resetReceived');
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