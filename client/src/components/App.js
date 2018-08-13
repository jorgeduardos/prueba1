import React from'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

class App extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			length: 220,
			stateSketch: sketch,
		};
	}

	lengthChange(e){
		e.preventDefault();
		this.setState({length:e.target.value});
	}

	render () {
		console.log(this.state.length);
		return (
			<div>
				<P5Wrapper sketch={this.state.stateSketch} length={this.state.length}/>
				<input type="range" value={this.state.length}  min="220"  max="600" step="1" onInput={this.lengthChange.bind(this)}/>
			</div>
		);
	}
}

export default App;