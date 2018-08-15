import React, {Component} from 'react';
import { Link } from "react-router-dom";

class UI extends Component {
	constructor(props){
		super(props);
	}

	currentBlendMode(v){

		var blenMode;
		switch(v){
	      case 1: 
	        blenMode = "DIFFERENCE";
	        break;
	      case 2:
	        blenMode = "SOFT_LIGHT";
	        break;
	      case 3:
	        blenMode = "LIGHTEST";
	        break;
	      case 4:
	        blenMode = "BLEND";
	        break;
	      case 5:
	        blenMode = "DARKEST";
	        break;
	      case 6:
	        blenMode = "MULTIPLY";
	        break;
	      case 7:
	        blenMode = "SOFT_LIGHT";
	        break;
	      case 8:
	        blenMode = "HARD_LIGHT";
	        break;
	      case 9:
	        blenMode = "DODGE";
	        break;
	      case 10:
	        blenMode = "SCREEN";
	        break;
    	}
    	return blenMode;
	}

	render(){
		return(
			<div>
				<h1>Alloy UI</h1>
				<button onClick={this.props.sendBackgroundColors}>Random Background Color</button>
				<button onClick={this.props.stopFrameRate}>Stop Animation</button>
				<button onClick={this.props.playFrameRate}>Play Animation</button>
				<button onClick={this.props.sendOrder}>Change Order</button>
				<button onClick={this.props.sendBlendMode}>Change Blend Mode</button>
				<button onClick={this.props.sendSpeed}>+</button>
				<button onClick={this.props.sendDecreseSpeed}>-</button>
				<button onClick={this.props.sendAddSquare}>Add Square</button>
				<h3>Current Blend Mode: {this.currentBlendMode(this.props.blendMode)}</h3>
			</div>

		)
	}
}

export default UI;