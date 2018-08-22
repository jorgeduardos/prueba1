import React, {Component} from 'react';
import './styles/ui.css';

var formStyles ={
	position: "absolute", 
	left: "-5000px"
}

var disabledBtnStyles = {
	opacity: "0.3"
}

class UI extends Component {
	constructor(props){
		super(props);
		this.state ={
			colorPallets:[
			    {
			      backgrounds: ["#0ae9e2", "#5337f1"],
			      squares:["#E85431", "#D8D560", "#E868B9", "#ED869D", "#F1A581", "#F6C365", "#F2E086", "#DF2CF2"]
			    },
			    { 
			      backgrounds: ["#8916D7", "#FE421B"],
			      squares:["#2E8DFF", "#FAE148", "#2230E0", "#F1A581", "#ED869D", "#E868B9", "#E44AD6", "#DF2CF2"]

			    },
			    { 
			      backgrounds: ["#2100FF", "#FFD7AA"],
			      squares:["#2E4CFF", "#2D66DB", "#2C7FB6", "#2B9992", "#29B26D", "#28CC49", "#27E524", "#26FF00"]

			    }
			],
			imput: "",
			submitImput: "SEND ME A REMINDER"
		}

		this.backgroundSetter = this.backgroundSetter.bind(this);
	}

	backgroundSetter(){
		var color;
		color = {background: `linear-gradient(${this.state.colorPallets[this.props.colorPallet].backgrounds[0]}, ${this.state.colorPallets[this.props.colorPallet].backgrounds[1]})`};
		return color;
	}

	imputSetter(e){
		this.setState({
			imput: e.target.value
		});
	}

	currentBlendMode(v){

		var blenMode;
		switch(v){
	      case 1: 
	        blenMode = "Difference";
	        break;
	      case 2:
	        blenMode = "Soft Light";
	        break;
	      case 3:
	        blenMode = "Hard Light";
    	}
    	return blenMode;
	}

	render(){
		// change blend mode to only display soft and hard!
		return(
			<div id="UI">
				<header><img id="chromaLogo" src={require("./styles/assets/chroma-logo.svg")} alt="Chroma Logo"/><a target="_blank" href="https://wearealloy.com/"><img id="alloyLogo" src={require("./styles/assets/alloy-logo.svg")} alt="alloy logo"/></a></header>
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
									<button style={this.props.rotationSpeed <= 0.1 && this.props.btnClicked ? disabledBtnStyles : null} className="btnRound" onClick={this.props.sendDecreseSpeed}><img src={require('./styles/assets/minus-sign.svg')} alt="minus sign"/></button>
									<button style={this.props.rotationSpeed >= 1 && this.props.btnClicked ? disabledBtnStyles : null} className="btnRound" onClick={this.props.sendSpeed}><img src={require('./styles/assets/plus-sign.svg')} alt="plus sign"/></button>
							</div>
							<div className="cell small-12">
								<label>Squares</label>
								<button style={this.props.squaresToDisplay === 2 ? disabledBtnStyles: null} className="btnSquare btnPush" onClick={this.props.sendRemoveSquare}><img src={require('./styles/assets/minus-sign.svg')} alt="minus sign"/></button>
								<button style={this.props.squaresToDisplay === 8 ? disabledBtnStyles: null} className="btnSquare btnPush" onClick={this.props.sendAddSquare}><img src={require('./styles/assets/plus-sign.svg')} alt="plus sign"/></button>
							</div>
						</div>
						<div className="row center lastRow">
							<div className="cell small-8">
								<button className="btn btnPush btnPlay" onClick={this.props.playFrameRate}>Pause/Play</button>
							</div>
							<div className="cell small-4">
								<button className="btn btnPush btnReset" onClick={this.props.sendReset}>Reset</button>
							</div>
						</div>
					</div>
				</div>
				<div id="infoContainer">
					<div className="infoDescription">
						<h3 id="aboutChroma">About The Chroma Series</h3>
						<p>Chroma is a dual-platform interactive art experience that invites you to experiment with colors, gradients, and motion, and to explore the relationships that exist between them.
<br/><br/>
It’s entirely made with code using Node.js, React, and p5.js
<br/><br/>
Customize the piece and share your artwork on Instagram by using hashtag  <a id="alloyHash" href="https://www.instagram.com/explore/tags/chromabyalloy/">#chromabyalloy</a>.
<br/><br/>
We’ll be releasing more art pieces from the Chroma series soon. If you want to know when our next piece goes live, sign up to get an email reminder. Or, to get in touch directly with us, send us an email to <a target="_blank" href="mailto:hello@wearealloy.com">hello@wearealloy.com</a>.
<br/><br/>
Thanks, and enjoy the art!
</p>
					</div>
					<div className="infoForm">
						<div id="mc_embed_signup">
							<form action="https://wearealloy.us14.list-manage.com/subscribe/post?u=bb55fcc2da0f449b6b0b95c70&amp;id=77d991fbdd" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
							    <div id="mc_embed_signup_scroll">
									<input type="email" value={this.state.imput} onChange={this.imputSetter.bind(this)} name="EMAIL" className="email" id="mce-EMAIL" placeholder="EMAIL" required/>
						    		<div style={formStyles} aria-hidden="true">
						    			<input type="text" name="b_bb55fcc2da0f449b6b0b95c70_77d991fbdd" tabindex="-1" value=""/>
						    		</div>
							    	<div className="clear">
							    		<input type="submit" value={this.state.submitImput} name="subscribe" id="mc-embedded-subscribe" className="btn"/>
							    	</div>
							    </div>
							</form>
						</div>
					</div>
					<div className="infoFooter">
						<div className="row center">
							<a href="#">
								<img className="social-icons" src={require('./styles/assets/facebook-icon.svg')} alt="Facebook"/>
							</a>
							<a href="#">
								<img className="social-icons" src={require('./styles/assets/instagram-icon.svg')} alt="Instagram"/>
							</a>
						</div>
						<div className="row center" id="copyrightContainer">
							<a target="_blank" href="https://wearealloy.com/"><img id="alloyLogo2" src={require("./styles/assets/alloy-logo.svg")} alt="alloy logo"/></a>
							<h6 className="copyRight">&copy; 2018 Alloy Studio, LLC</h6>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UI;