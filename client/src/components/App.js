import React from'react';
import P5Wrapper from './P5Wrapper.js';
import sketch from './sketches/sketch';
import './styles/label.css';

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
				<P5Wrapper squaresToDisplay={this.props.squaresToDisplay} sketch={this.state.stateSketch} colorPallet={this.props.colorPallet} clicked={this.props.clicked} frameRate={this.props.frameRate} order={this.props.order} blendMode={this.props.blendMode} rotationSpeed={this.props.rotationSpeed}/>
				<div id="labelContainer">
					<p>To interact with this piece visit chroma.wearealloy.com on your mobile device</p>
				</div>
			</div>
		);
	}
}

export default App;