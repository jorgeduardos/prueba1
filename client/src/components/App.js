import React from'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

class App extends React.Component{

	constructor(props) {
		super(props);
		this.state ={
			stateSketch: sketch
		}
	}

	render () {
		console.log(this.props.frameRate);
		return (
			<div>
				<P5Wrapper sketch={this.state.stateSketch} background1={this.props.background1} clicked={this.props.clicked} frameRate={this.props.frameRate}/>
			</div>
		);
	}
}

export default App;