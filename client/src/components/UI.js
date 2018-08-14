import React, {Component} from 'react';
import { Link } from "react-router-dom";

class UI extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<h1>Alloy UI</h1>
				<button onClick={this.props.sendBackgroundColors}>Random Background Color</button>
				<button onClick={this.props.stopFrameRate}>Stop Animation</button>
				<button onClick={this.props.playFrameRate}>Play Animation</button>
			</div>

		)
	}
}

export default UI;