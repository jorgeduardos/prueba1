import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './styles/ui.css';

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
				<header><img id="chromaLogo" src={require("./styles/assets/chroma-logo.svg")} alt="Chroma Logo"/><img id="alloyLogo" src={require("./styles/assets/alloy-logo.svg")} alt="alloy logo"/></header>
				<div style={this.backgroundSetter()} className="UiContainer">
					<div className="uiControlersContainer uppercase">
						<div className="row center">
							<div className="cell small-12">
								<label>Color</label>
								<button className="btn btnPush" onClick={this.props.sendColorPallet}>Change</button>
							</div>
							<div className="cell small-12">
								<label>Intensity</label>
								<button className="btn btnPush" onClick={this.props.sendBlendMode}>Change</button>
								<p id="blendModeP">Current Blend Mode: {this.currentBlendMode(this.props.blendMode)}</p>
							</div>
						</div>
						<div className="row center">
							<div className="cell small-12">
									<label>Speed</label>
									<button className="btnRound" onClick={this.props.sendSpeed}><img src={require('./styles/assets/plus-sign.svg')} alt="plus sign"/></button>
									<button className="btnRound" onClick={this.props.sendDecreseSpeed}><img src={require('./styles/assets/minus-sign.svg')} alt="minus sign"/></button>
							</div>
							<div className="cell small-12">
								<label>Squares</label>
								<button className="btnSquare btnPush" onClick={this.props.sendAddSquare}><img src={require('./styles/assets/plus-sign.svg')} alt="plus sign"/></button>
								<button className="btnSquare btnPush" onClick={this.props.sendRemoveSquare}><img src={require('./styles/assets/minus-sign.svg')} alt="minus sign"/></button>
							</div>
						</div>
						<div className="row center">
							<div className="cell small-6">
								<button className="btn btnPush" onClick={this.props.playFrameRate}>Play / Pause</button>
							</div>
							<div className="cell small-6">
								<button className="btn btnPush" onClick={this.props.sendReset}>Reset</button>
							</div>
						</div>
					</div>
					<div className="logoContainer">
						<img src={require('./sketches/assets/alloy-wink.png')} alt="Alloy Wink Logo"/>
					</div>
				</div>
				<div id="infoContainer">
					<div className="infoDescription">
						<h3>About The Chroma Series</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, repellat non vitae nesciunt ullam, architecto animi
						 facilis fugit sunt voluptatibus totam laboriosam placeat, quibusdam quod delectus aliquam ex ipsam, dicta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam vel aliquam soluta porro. Mol
						 itia, deserunt, aperiam. In quis sit delectus architecto temporibus veritatis eligendi ipsam! Ex harum, officia neque dolores! Lorem ipsum dolor sit amet, consectetur adip
						 isicing elit. Unde, explicabo eum porro dol
						 res error quis voluptate totam eius voluptates nesciunt quaerat, voluptas harum quo, modi soluta rerum. Excepturi necessitatibus, amet.</p>
					</div>
					<div className="infoForm"></div>
				</div>
				<div className="infoFooter"></div>
			</div>
		)
	}
}

export default UI;