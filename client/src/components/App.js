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
			stateSketch: sketch
		};
	}

	colorChange(e){
		e.preventDefault();
		this.setState({randomColor1: Math.round(Math.random(0,255)*255), randomColor2: Math.round(Math.random(0,255)*255), randomColor3: Math.round(Math.random(0,255)*255)});
	}

	render () {
		console.log(this.state.randomColor);
		return (
			<div>
				<P5Wrapper sketch={this.state.stateSketch} color1={this.state.randomColor1} color2={this.state.randomColor2} color3={this.state.randomColor3}/>
				<button onClick={this.colorChange.bind(this)}>Random Background Color</button>
			</div>
		);
	}
}

export default App;