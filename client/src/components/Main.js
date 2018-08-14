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
				color3: 0,
				colorB1: 0,
				colorB2: 0,
				colorB3: 0
			},
			frameRate: "play",
			order: 1,
			clicked: false,
			endpoint: "http://127.0.0.1:4001"
		};

		this.sendBackgroundColors = this.sendBackgroundColors.bind(this);
		this.playFrameRate = this.playFrameRate.bind(this);
		this.stopFrameRate = this.stopFrameRate.bind(this);
		this.sendBackgroundColors =this.sendBackgroundColors.bind(this);
		this.sendOrder = this.sendOrder.bind(this);
	}

	componentDidMount(){
		const {endpoint} = this.state;
		const socket = socketIOClient(endpoint);
		socket.on("newRandomColors", colors => this.setState({
			background1:{
				color1: colors.background1.color1,
				color2: colors.background1.color2,
				color3: colors.background1.color3,
				colorB1: colors.background1.colorB1,
				colorB2: colors.background1.colorB2,
				colorB3: colors.background1.colorB3
			},
			background2:{
				color1: colors.background2.color1,
				color2: colors.background2.color2,
				color3: colors.background2.color3,
				colorB1: colors.background2.colorB1,
				colorB2: colors.background2.colorB2,
				colorB3: colors.background2.colorB3
			},
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
			background1:{
				color1: this.randomNumber(255),
				color2: this.randomNumber(255),
				color3: this.randomNumber(255),
				colorB1: this.randomNumber(255),
				colorB2: this.randomNumber(255),
				colorB3: this.randomNumber(255)
			},
			background2:{
				color1: this.randomNumber(255),
				color2: this.randomNumber(255),
				color3: this.randomNumber(255),
				colorB1: this.randomNumber(255),
				colorB2: this.randomNumber(255),
				colorB3: this.randomNumber(255)
			}
		}
		socket.emit('randomBackground', colors);
	}

	sendOrder(e){
		e.preventDefault();
		const socket = socketIOClient(this.state.endpoint);
		var order = this.state.order == 1 ? 2 : 1; 
		socket.emit('order', order);
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
					<Route exact path="/" render={ (props) => <UI sendBackgroundColors={this.sendBackgroundColors} playFrameRate={this.playFrameRate} stopFrameRate={this.stopFrameRate} sendOrder={this.sendOrder} />} />
					<Route exact path="/art" render={ (props) => <App background1={this.state.background1} background2={this.state.background2} frameRate={this.state.frameRate} clicked={this.state.clicked} order={this.state.order} />} />
				</div>
			</Router>
		)
	}
}

export default Main;