import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import App from "./App.js";
import UI from "./UI.js";

class Main extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			background1: {
				color1: 0,
				color2: 0,
				color3: 0,
				colorB1: 0,
				colorB2: 0,
				colorB3: 0
			},
			background2: {
				color1: 0,
				color2: 0,
				color3: 0
			},
			frameRate: "play",
			clicked: false,
			endpoint: "http://09fbb7b7.ngrok.io"
		};

		this.sendBackgroundColors = this.sendBackgroundColors.bind(this);
		this.playFrameRate = this.playFrameRate.bind(this);
		this.stopFrameRate = this.stopFrameRate.bind(this);
		this.sendBackgroundColors =this.sendBackgroundColors.bind(this);
	}

	componentDidMount(){
		const {endpoint} = this.state;
		const socket = socketIOClient(endpoint);
		socket.on("change color", color => this.setState({ color }));
		socket.on("newRandomColors", colors => this.setState({
			background1:{
				color1: colors.color1,
				color2: colors.color2,
				color3: colors.color3,
				colorB1: colors.colorB1,
				colorB2: colors.colorB2,
				colorB3: colors.colorB3
			},
			clicked: true
		}))
		socket.on("playAnimation", v => this.setState({
			frameRate: v
		}))
		socket.on("stopAnimation", v => this.setState({
			frameRate: v
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


	sendBackgroundColors(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		var colors = {
			color1: this.randomNumber(255),
			color2: this.randomNumber(255),
			color3: this.randomNumber(255),
			colorB1: this.randomNumber(255),
			colorB2: this.randomNumber(255),
			colorB3: this.randomNumber(255)
		}
		socket.emit('randomBackground', colors);
	}

	randomNumber(number){
		var randomNumber;
		randomNumber = Math.round(Math.random(0, number)*255);
		return randomNumber;
	}

	render(){
		return(
			<Router>
				<div>
					<Route exact path="/" render={ (props) => <UI sendBackgroundColors={this.sendBackgroundColors} playFrameRate={this.playFrameRate} stopFrameRate={this.stopFrameRate} color={this.state.color} sendBackgroundColors={this.sendBackgroundColors} />} />
					<Route exact path="/art" render={ (props) => <App background1={this.state.background1} frameRate={this.state.frameRate} clicked={this.state.clicked} />} />
				</div>
			</Router>
		)
	}
}

export default Main;