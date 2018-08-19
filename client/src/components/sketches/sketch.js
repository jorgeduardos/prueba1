export default function sketch (p) {
  
  // p5.disableFriendlyErrors = true;
  var rectangles = [];
  var disorderedRectangles = [];
  // gradient related 
  var Y_AXIS = 1;
  var X_AXIS = 2;
  var b1, b2, c1, c2;

  var img;
  var loop;
  var blendMode;
  var rotationSpeed;

  var numberSquares = 9;
  var squaresToDisplay;
  var colorPallet = 0;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);

    //gradient related
    b1 = p.color("#0ae9e2");
    b2 = p.color("#5337f1");
    c1 = p.color("#5337f1");
    c2 = p.color("#0ae9e2");
    loop = true;
    for (var i = 0; i < numberSquares; i++) {
      rectangles[i] = new Rectangle(0 , 0, ((numberSquares-i)*100) - 100, ((numberSquares-i)*100) - 100);
    }
  };

  /*
    Ordered squares
      rectangles[i] = new Rectangle(0 , 0, ((8-i)*100) - 100, ((8-i)*100) - 100);
    disordered
      widht and height have to be different random numbers
  */

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if(props.frameRate){
      props.frameRate == "stop" ? loop=false : loop=true;
    }
    if (props.clicked){
        colorPallet = props.colorPallet;
        b1 = p.color(colorPallets[colorPallet].backgrounds[0]);
        b2 = p.color(colorPallets[colorPallet].backgrounds[1]);
        c1 = p.color(colorPallets[colorPallet].backgrounds[1]);
        c2 = p.color(colorPallets[colorPallet].backgrounds[0]);
    }
    if(props.blendMode){
      blendMode = props.blendMode;
    }
    if(props.rotationSpeed){
      rotationSpeed = props.rotationSpeed;
    }
    if(props.squaresToDisplay){
      squaresToDisplay = props.squaresToDisplay;
    }

  };

  p.draw = function () {
    setGradient(0, 0, p.width, p.height, b1, b2, X_AXIS);
    setGradient(0, 0, p.width, p.height/2, c1, c2, X_AXIS);
    p.push();
    switch(blendMode){
      case 1: 
        p.blendMode(p.DIFFERENCE);
        break;
      case 2:
        p.blendMode(p.SOFT_LIGHT);
        break;
      case 3:
        p.blendMode(p.EXCLUSION);
        break;
      case 4:
        p.blendMode(p.BLEND);
        break;
      case 5:
        p.blendMode(p.OVERLAY);
        break;
      case 6:
        p.blendMode(p.MULTIPLY);
        break;
      case 7:
        p.blendMode(p.SOFT_LIGHT);
        break;
      case 8:
        p.blendMode(p.HARD_LIGHT);
        break;
      case 9:
        p.blendMode(p.DODGE);
        break;
      case 10:
        p.blendMode(p.SCREEN);
    }
    p.translate(p.windowWidth/2, p.windowHeight/2);
    for (var i = 0; i < squaresToDisplay; i++) {
      rectangles[i].display(i, colorPallets[colorPallet].squares[i]);
      loop ? rectangles[i].rotate(1, rotationSpeed) : null
    }     
    p.pop();
  };

  function Rectangle(posx1, posy1, l, h){
    this.id = 0;
    this.r = p.random(0,255);
    this.g = p.random(0,255);
    this.b = p.random(0,255);
    this.x1 = posx1;
    this.y1 = posy1;
    this.l = l;
    this.h = h;
    this.deg = 0;
    this.rotate = function(direction, speed){
      if(direction == 1){
        this.deg += speed;
      }else{
        this.deg += speed;
      }
    }
    this.display = function(id, squareColors){
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rotate(this.deg);
      p.fill(p.color(squareColors));
      p.rect(this.x1, this.y1, this.l, this.h);
      this.id = id;
    }
  }

  function setGradient(x, y, w, h, c1, c2, axis) {
    p.push()
    p.noFill();

    if (axis == Y_AXIS) {  // Top to bottom gradient
      for (var i = y; i <= y+h; i++) {
        var inter = p.map(i, y, y+h, 0, 1);
        var c = p.lerpColor(c1, c2, inter);
        p.stroke(c);
        p.line(x, i, x+w, i);
      }
    }  
    else if (axis == X_AXIS) {  // Left to right gradient
      for (var i = x; i <= x+w; i++) {
        var inter = p.map(i, x, x+w, 0, 1);
        var c = p.lerpColor(c1, c2, inter);
        p.stroke(c);
        p.line(i, y, i, y+h);
      }
    }
    p.pop();
  }

  var colorPallets = [
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
  ]
};