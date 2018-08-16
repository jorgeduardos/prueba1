import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles/ui.css';

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
	        blenMode = "EXCLUSION";
	        break;
	      case 4:
	        blenMode = "BLEND";
	        break;
	      case 5:
	        blenMode = "OVERLAY";
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
			<div id="UI">
				<div className="UiContainer">
					<div className="uiControlersContainer">
						<div className="row center">
							<div className="small-6"><button className="btn btnPush" onClick={this.props.sendColorPallet}>Change Color Pallet</button></div>
							<div className="small-6"><button className="btn btnPush" onClick={this.props.sendBlendMode}>Change Blend Mode</button></div>
						</div>
						<div className="row center">
							<div className="small-6">
								<button className="btnIcon" onClick={this.props.playFrameRate}><i className="icon ion-md-play"/></button>
								<button className="btnIcon" onClick={this.props.stopFrameRate}><i className="icon ion-md-pause"/></button>
							</div>
							<div className="small-6">
								<button className="btnIcon" onClick={this.props.sendSpeed}><i className="icon ion-md-add-circle"/></button>
								<button className="btnIcon" onClick={this.props.sendDecreseSpeed}><i className="icon ion-md-remove-circle"/></button>
							</div>
						</div>
						<button className="btn btnPush" onClick={this.props.sendOrder}>Change Order</button>
						<button className="btn btnPush" onClick={this.props.sendAddSquare}>Add Square</button>
					</div>
					<h3>Current Blend Mode: {this.currentBlendMode(this.props.blendMode)}</h3>
					<div className="logoContainer">
						<img src={require('./sketches/assets/alloy-wink.png')} alt="Alloy Wink Logo"/>
					</div>
				</div>
			</div>
		)
	}
}

export default UI;