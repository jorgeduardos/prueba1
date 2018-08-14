import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function changeColor(color, cb){
	socket.on('change color', color => cb(null, color));
	socket.emit('changeColor', color);
}

export {changeColor};