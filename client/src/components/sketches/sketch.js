export default function sketch (p) {

  var rectangles = [];
  var disorderedRectangles = [];
  // gradient related 
  var Y_AXIS = 1;
  var X_AXIS = 2;
  var b1, b2, c1, c2;

  var img;
  var loop;
  var order;

  p.setup = function () {
    p.createCanvas(800, 800);
    p.angleMode(p.DEGREES);
    // p.frameRate(60)

    //gradient related
    b1 = p.color(10,24,191);
    b2 = p.color(176,234,209);
    c1 = p.color(10,24,191);
    c2 = p.color(176,234,209);
    loop = true;
    for (var i = 0; i < 6; i++) {
      rectangles[i] = new Rectangle(0 , 0, ((8-i)*100) - 100, ((8-i)*100) - 100);
    }
    for (var i = 0; i < 6; i++) {
      disorderedRectangles[i] = new Rectangle(0 , 0, p.round(p.random(100, 600)), p.round(p.random(100, 600)));
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
      b1 = p.color(props.background1.color1, props.background1.color2, props.background1.color3);
      b2 = p.color(props.background1.colorB1, props.background1.colorB2, props.background1.colorB3);
      c1 = p.color(props.background2.color1, props.background2.color2, props.background2.color3);
      c2 = p.color(props.background2.colorB1, props.background2.colorB2, props.background2.colorB3);
    }
    if(props.order){
      console.log('order props: ', props.order);
      order = props.order;
    }
  };

  p.draw = function () {
    setGradient(0, 0, p.width, p.height, b1, b2, X_AXIS);
    setGradient(0, 0, p.width, p.height/2, c1, c2, X_AXIS);
    p.push();
    p.blendMode(p.DIFFERENCE);
    p.translate(400, 400);
  
    if(order == 1){
      for (var i = 0; i < rectangles.length; i++) {
        rectangles[i].display(i);
        loop ? rectangles[i].rotate(1) : null
      }
    }else{
      for (var i = 0; i < disorderedRectangles.length; i++) {
        disorderedRectangles[i].display(i);
        loop ? disorderedRectangles[i].rotate(1) : null
      }
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
    this.rotate = function(direction){
      if(direction == 1){
        this.deg += p.random(0.5, 3);
      }else{
        this.deg += p.random(-0.5,-5);
      }
    }
    this.display = function(id){
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rotate(this.deg);
      p.fill(this.r, this.g, this.b);
      p.rect(this.x1, this.y1, this.l, this.h);
      this.id = id;
    }
  }

  function createRectangles(){

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

};