let DEFAULT_SIZE = 720;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  let DIM = min(width, height);
  let M = DIM / DEFAULT_SIZE;

  let mod1 = random();
  let mod2 = random();
  let mod3 = random();
  let mod4 = random();
  let mod5 = random();

  // create star
  let n, skip, verts;
  n = parseInt(5 + 16 * random());
  do {
    skip = [ 
      parseInt(1 + (n-1) * random()),
      parseInt(1 + (n-1) * random()), 
      parseInt(1 + (n-1) * random())
    ];
  } 
  while (n % skip[2] === 0);

  verts = [];
  for (var i = 0; i < n; i++) {
    var ang = lerp(0, TWO_PI, i / n);
    verts.push({
      x: 0.333 * DIM * cos(ang),
      y: 0.333 * DIM * sin(ang)
    });
  }  

  var hueInit = random();

  var strokeHue = parseInt(360 * ((hueInit + mod2) % 1.0));
  var strokeSaturation = parseInt(90 + 10 * random());
  var strokeBrightness = parseInt(90 + 10 * random());
  var strokeAlpha = 0.85 + 0.13 * random();

  var fillHue = parseInt(360 * ((hueInit + 0.5 + mod3) % 1.0));
  var fillSaturation = parseInt(60 + 40 * random());
  var fillBrightness = parseInt(60 + 40 * random());
  var fillAlpha = 0.25 + 0.15 * random();

  colorMode(HSB, 360, 100, 100, 1);    

  background(0); 
  var rads = Math.ceil((DIM**2 + DIM**2) ** 0.5);
  for (var r=rads; r>0; r-=5) {
    fill(fillHue, fillSaturation, lerp(0.72*fillBrightness, 0, r/rads));
    noStroke();
    ellipse(width/2, height/2, r, r);
  }

  var thickness = map(mod1, 0.0, 1.0, 0.1, 1.0) * DIM / 500.0;

  for (var k=0; k<8; k++) {
    if (k < 5) {
      noFill();
      stroke(strokeHue, strokeSaturation, strokeBrightness, strokeAlpha * 0.1 * (k+1));
      strokeWeight((7.0-k) * thickness);
    }
    else if (k == 5) {
      noStroke();
      fill(fillHue, fillSaturation, fillBrightness, fillAlpha * mod4);
    }
    else if (k == 6) {
      noFill();
      stroke(strokeHue, strokeSaturation, strokeBrightness, strokeAlpha*0.555);
      strokeWeight(2.0  * thickness);
    }
    else if (k == 7) {
      noFill();
      stroke(strokeHue, strokeSaturation, strokeBrightness, strokeAlpha);
      strokeWeight(1.0 * thickness);
    }

    push();
    translate(width/2, height/2);
    rotate(0.5 * Math.PI * mod5)
    var i1 = 0;
    do {
      var i2 = (i1 + skip[0]) % n;
      var i3 = (i1 + skip[1]) % n;
      var i4 = (i1 + skip[2]) % n;
      beginShape();
        curveVertex(verts[i1].x, verts[i1].y);
        curveVertex(verts[i2].x, verts[i2].y);
        curveVertex(verts[i3].x, verts[i3].y);
        curveVertex(verts[i4].x, verts[i4].y);
      endShape(CLOSE);
      if (k>6) {
        bezier(
          verts[i1].x, verts[i1].y, 
          verts[i2].x, verts[i2].y, 
          verts[i3].x, verts[i3].y, 
          verts[i4].x, verts[i4].y
        );
      }
      i1 = i3;
    } 
    while (i1 !== 0); 

    pop();
  }

  fill(255);
  textSize(16);
  text("Click for new one", 2, 18);
};

function mousePressed() {
  redraw();
}

function keyPressed() {
  if (key==' ') {
    redraw();
  }
}