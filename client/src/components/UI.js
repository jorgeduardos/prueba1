import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles/ui.css';

var styles = {
	background: 'linear-gradient(#0ae9e2, #5337f1)'
}

class UI extends Component {
	constructor(props){
		super(props);
		this.state ={
			colorPallets:[
			    {
			      backgrounds: ["#0ae9e2", "#5337f1"],
			      squares:["#ffff2c", "#fae148", "#f6c365", "#f1a581", "#ed869d", "#e868b9", "#e44ad6", "#df2cf2"]
			    },
			    { 
			      backgrounds: ["#e866d3", "#80379c"],
			      squares:["#fe9c8f", "#feb2a8", "#fec8c1", "#fad9c1", "#f9caa7", "#faf0e6", "#fff5ee", "#fdf5e6"]

			    }
			]
		}

		this.backgroundSetter = this.backgroundSetter.bind(this);
	}

	backgroundSetter(){
		var color;
		color = {background: `linear-gradient(${this.state.colorPallets[this.props.colorPallet].backgrounds[0]}, ${this.state.colorPallets[this.props.colorPallet].backgrounds[1]})`};
		return color;
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
		// change blend mode to only display soft and hard!
		return(
			<div id="UI">
				<header><h1>CHROMA</h1><h3>alloy</h3></header>
				<div style={this.backgroundSetter()} className="UiContainer">
					<div className="uiControlersContainer uppercase">
						<div className="row center">
							<div className="cell small-12">
								<label>Color</label>
								<button className="btn btnPush" onClick={this.props.sendColorPallet}>Change</button>
							</div>
							<div className="cell small-12">
								<label>Blend</label>
								<button className="btn btnPush" onClick={this.props.sendBlendMode}>Change</button>
								<p id="blendModeP">Current Blend Mode: {this.currentBlendMode(this.props.blendMode)}</p>
							</div>
						</div>
						<div className="row center">
							<div className="cell small-12">
								<label>Play Pause</label>
								<button className="btnIcon" onClick={this.props.playFrameRate}><i className="icon ion-md-play"/></button>
								<button className="btnIcon" onClick={this.props.stopFrameRate}><i className="icon ion-md-pause"/></button>
							</div>
							<div className="cell small-12">
								<label>Speed</label>
								<button className="btnIcon" onClick={this.props.sendSpeed}><i className="icon ion-md-add-circle"/></button>
								<button className="btnIcon" onClick={this.props.sendDecreseSpeed}><i className="icon ion-md-remove-circle"/></button>
							</div>
						</div>
						<div className="row center">
							<div className="cell small-12">
								<label>Squares</label>
								<button className="btn btnPush" onClick={this.props.sendAddSquare}>Add Square</button>
								<button className="btn btnPush" onClick={this.props.sendRemoveSquare}>Remove Square</button>
							</div>
						</div>
					</div>
					<div className="logoContainer">
						<img src={require('./sketches/assets/alloy-wink.png')} alt="Alloy Wink Logo"/>
					</div>
				</div>
			</div>
		)
	}
}

export default UI;