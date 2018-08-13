export default function sketch (p) {
  let length = 0;
  var rectangles = [];
  let angle = 0;

  // gradient related 
  var Y_AXIS = 1;
  var X_AXIS = 2;
  var b1, b2, c1, c2;

  p.setup = function () {
    p.createCanvas(800, 800);
    p.angleMode(p.DEGREES);
    // p.frameRate(60)

    //gradient related
    b1 = p.color(10,24,191);
    b2 = p.color(176,234,209);
    c1 = p.color(204, 102, 0);
    c2 = p.color(0, 102, 153);

    for (var i = 0; i < 5; i++) {
      rectangles[i] = new Rectangle(p.random(0,0), p.random(0, 0), p.random(200,500), p.random(200, 500), p.random (-5,5), p.random(-5,5));
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.color1){
      b1 = p.color(props.color1, props.color2, props.color3);
    }
  };

  p.draw = function () {
    // p.noLoop();
    // console.log(p.width);
    setGradient(0, 0, p.width, p.height, b1, b2, X_AXIS);
    setGradient(0, 0, p.width, p.height/2, c1, c2, X_AXIS);
    // p.fill(255,0,0);
    // p.noStroke();
    // p.rect(0, -800, 1200, 1200);
    p.push();
    p.blendMode(p.DIFFERENCE);
    p.translate(400,400);
    for (var i = 0; i < rectangles.length; i++) {
      rectangles[i].display(i);
      // rectangles[i].move();
      rectangles[i].rotate(1);
      // rectangles[i].bounce();
    }
    // angle = angle-0.8;
    p.pop();
  };

  function Rectangle(posx1, posy1, l, h, velx, vely){
    this.id = 0;
    this.r = p.random(0,255);
    this.g = p.random(0,255);
    this.b = p.random(0,255);
    this.x1 = posx1;
    this.y1 = posy1;
    this.l = l;
    this.h = h;
    this.velx = velx;
    this.vely = vely;
    this.deg = 0;
    this.rotate = function(direction){
      if(direction == 1){
        this.deg += p.random(0.5, 2);
      }else{
        this.deg += p.random(-0.5,-2);
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
    this.move = function(){
      this.x1 += this.velx;
      this.y1 += this.vely;
    }
    this.bounce = function(){
      if(this.x1 > 0 && this.x1 < p.width && this.y1 > p.height){
        this.vely = this.vely * -1;
      }else if(this.x1 > p.width && this.y1 > 0 && this.y1 < p.height){
        this.velx = this.velx * -1;
      }else if(this.x1 > 0 && this.x1 < p.width && this.y1 < 0){
        this.vely = this.vely * -1;
      }else if(this.x1 < 0 && this.y1 > 0 && this.y1 < p.height){
        this.velx = this.velx * -1;
      }
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

};