export default function sketch (p) {
  let length = 0;
  var rectangles = [];

  p.setup = function () {
    p.createCanvas(800, 800);
    for (var i = 0; i < 3; i++) {
      rectangles[i] = new Rectangle(p.random(0,800), p.random(0, 800), p.random(200,300), p.random(200, 300), p.random (-5,5), p.random(-5,5));
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.length){
      length = props.length;
    }
  };

  p.draw = function () {
    // p.noLoop();
    // console.log(p.width);
    // p.background(0)
    p.fill(233,145,123);
    p.noStroke();
    p.rect(0, 400, 1200, 1200);
    p.fill(255,0,0);
    p.noStroke();
    p.rect(0, -800, 1200, 1200);
    p.push();
    p.blendMode(p.DIFFERENCE);
    for (var i = 0; i < rectangles.length; i++) {
      rectangles[i].display(i);
      rectangles[i].move();
      rectangles[i].bounce();
    }
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
    this.display = function(id){
      p.rectMode(p.CENTER);
      p.noStroke();
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

};