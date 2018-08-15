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
		return (
			<div>
				<P5Wrapper squaresToDisplay={this.props.squaresToDisplay} sketch={this.state.stateSketch} background1={this.props.background1} background2={this.props.background2} clicked={this.props.clicked} frameRate={this.props.frameRate} order={this.props.order} blendMode={this.props.blendMode} rotationSpeed={this.props.rotationSpeed}/>
			</div>
		);
	}
}

export default App;