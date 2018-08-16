import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import App from "./App.js";
import UI from "./UI.js";

class Main extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			colorPallet: 0,
			frameRate: "play",
			order: 1,
			blendMode: 1,
			rotationSpeed: 0.1,
			squaresToDisplay: 2,
			clicked: false,
			endpoint: "http://127.0.0.1:4001"
			// endpoint: window.location.hostname
		};
		// this.setState({
		// 	prueba: window.location.hostname;
		// })
		
		this.sendColorPallet = this.sendColorPallet.bind(this);
		this.playFrameRate = this.playFrameRate.bind(this);
		this.stopFrameRate = this.stopFrameRate.bind(this);
		this.sendOrder = this.sendOrder.bind(this);
		this.sendBlendMode = this.sendBlendMode.bind(this);
		this.sendSpeed = this.sendSpeed.bind(this);
		this.sendDecreseSpeed = this.sendDecreseSpeed.bind(this);
		this.sendAddSquare = this.sendAddSquare.bind(this);
	}

	componentDidMount(){
		const {endpoint} = this.state;
		const socket = socketIOClient(endpoint);
		socket.on("colorPalletReceived", colorPallet => this.setState({
			colorPallet,
			clicked: true
		}))
		socket.on("playAnimation", v => this.setState({
			frameRate: v
		}))
		socket.on("stopAnimation", v => this.setState({
			frameRate: v
		}))
		socket.on("orderReceived", v => {
			this.setState({
				order: v
			});
		})
		socket.on("blendModeReceived", v => this.setState({
			blendMode: v
		}))
		socket.on("rotationSpeedReceived", v => this.setState({
			rotationSpeed: v
		}))
		socket.on('decreaseRotationSpeedReceived', v => this.setState({
			rotationSpeed: v
		}))
		socket.on('addSquareReceived', v => this.setState({
			squaresToDisplay: v
		}))
	}

	stopFrameRate(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		socket.emit('stopFramerate', 'stop');
	}
	playFrameRate(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		socket.emit('playFramerate', 'play');
	}


	sendColorPallet(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		var colorPallet;
		this.state.colorPallet < 1 ? colorPallet = this.state.colorPallet+1: colorPallet = 0;
		socket.emit('colorPallet', colorPallet);
	}

	sendAddSquare(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		var squaresToDisplay;
		this.state.squaresToDisplay < 8 ? squaresToDisplay = this.state.squaresToDisplay + 1 : squaresToDisplay = 8;
		socket.emit('addSquare', squaresToDisplay);
	}

	sendOrder(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		var order = this.state.order == 1 ? 2 : 1; 
		socket.emit('order', order);
	}

	sendBlendMode(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		var blendMode;
		this.state.blendMode < 10 ? blendMode = this.state.blendMode + 1: blendMode = 1;
		socket.emit('blendMode', blendMode);

	}

	sendSpeed(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		var rotationSpeed;
		this.state.rotationSpeed < 1 ? rotationSpeed = this.state.rotationSpeed + 0.1 : rotationSpeed = 1;
		socket.emit('rotationSpeed', rotationSpeed);
	}

	sendDecreseSpeed(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		var rotationSpeed;
		this.state.rotationSpeed > 0.1 ? rotationSpeed = this.state.rotationSpeed - 0.1 : rotationSpeed = 0.1;
		socket.emit('decreseRotationSpeed', rotationSpeed);
	}


	render(){
		return(
			<Router>
				<div>
					<Route exact path="/" render={ (props) => <UI sendAddSquare={this.sendAddSquare} blendMode={this.state.blendMode} sendColorPallet={this.sendColorPallet} playFrameRate={this.playFrameRate} stopFrameRate={this.stopFrameRate} sendOrder={this.sendOrder} sendBlendMode={this.sendBlendMode} sendSpeed={this.sendSpeed} sendDecreseSpeed={this.sendDecreseSpeed}/>} />
					<Route exact path="/art" render={ (props) => <App squaresToDisplay={this.state.squaresToDisplay} colorPallet={this.state.colorPallet} frameRate={this.state.frameRate} clicked={this.state.clicked} order={this.state.order} blendMode={this.state.blendMode} rotationSpeed={this.state.rotationSpeed}/>} />
				</div>
			</Router>
		)
	}
}

export default Main;