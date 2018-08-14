import React from'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

class App extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			randomColor1: 0,
			randomColor2: 0,
			randomColor3: 0,
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
			stateSketch: sketch
		};
	}

	stopFrameRate(e){
		e.preventDefault();
		this.setState({frameRate: "stop"});
		console.log(this.state.frameRate);
	}
	playFrameRate(e){
		e.preventDefault();
		this.setState({frameRate: "play"});
		console.log(this.state.frameRate);
	}

	colorChange(e){
		e.preventDefault();
		this.setState({
			background1:{
				color1: this.randomNumber(255),
				color2: this.randomNumber(255),
				color3: this.randomNumber(255),
				colorB1: this.randomNumber(255),
				colorB2: this.randomNumber(255),
				colorB3: this.randomNumber(255)
			},
			clicked: true
		});
		console.log(this.state.background1);
	}

	randomNumber(number){
		var randomNumber;
		randomNumber = Math.round(Math.random(0, number)*255);
		return randomNumber;
	}

	render () {
		console.log(this.state.randomColor);
		return (
			<div>
				<P5Wrapper sketch={this.state.stateSketch} background1={this.state.background1} clicked={this.state.clicked} frameRate={this.state.frameRate}/>
				<button onClick={this.colorChange.bind(this)}>Random Background Color</button>
				<button onClick={this.stopFrameRate.bind(this)}>Stop Animation</button>
				<button onClick={this.playFrameRate.bind(this)}>Play Animation</button>
			</div>
		);
	}
}

export default App;