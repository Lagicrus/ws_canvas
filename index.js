/*
 * This is index.js
 * Start by modifying the id function to return
 * information about you, then open index.html to check what
 * else you have to do, adding functions to the end of this
 * file as necessary.
 *
 * NB: all code you write this year should use strict mode, so
 * we've enabled that by default with the first line of code.
 */

'use strict';


// draws a stick figure on the canvas
// the stick figure will stand over the point X,Y (default: 100,150)
// facing is a degree in which the stick figure is facing: 0 is to the right, 90 is towards us
function drawStickFigure(el, x, y, facing) {
  var c = el.getContext("2d");

  // set our drawing style
  c.lineWidth = 2;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.strokeStyle = "#000";

  if (x == null) x = 100;
  if (y == null) y = 150;

  // the arms and the legs look the same
  drawLimbs(c, x, y);            // legs
  drawLimbs(c, x, y-40);         // arms
  drawSword(c, x, y-40, "blue");

  // body is just a line
  line(c, x, y-40, x, y-80);     // body

  // head is a circle with eyes and a smile
  circle(c, x, y-100, 20);       // head
  drawFace(c, x, y-100, facing); // face


  // helpful functions start here
  function drawLimbs(c, x, y) {
    line(c, x-20, y, x, y-40);
    line(c, x+20, y, x, y-40)
  }

  function drawSword(c, x, y, colour){
      line(c, x-20, y, x-20, y-35, colour);
      line(c, x-25, y-10, x-15, y-10, colour);
      console.log("ran");
  }

  function drawFace(c, x, y, facing) {
    // if the `facing` parameter is not given, the stick figure will face towards us
    if (facing == null) facing = 90;

    // make sure the `facing` parameter is between 0 and 360
    facing = facing % 360; // that's like the mathematical remainder after a division
    if (facing < 0) facing += 360;

    if (facing > 180) return;  // facing away from us, don't draw a face

    // we'll fake the turning of the face by shifting the eyes and the smile by an offset of up to 10 pixels
    var faceOffset = 0;
    if (facing <= 180) {
      faceOffset = (facing-90)/9;
    }

    circle(c, x-7-faceOffset, y-5, 1);  // 7 is distance from center, 5 is how high the eyes are from the head's center, 1 is eye size
    circle(c, x+7-faceOffset, y-5, 1);

    // decrease the smile size here
    var smileSize = 70; // size of smile in degrees of angle; 360 would be a full circle
    var startAngle = rad(90-smileSize/2-2*faceOffset);
    var endAngle   = rad(90+smileSize/2-2*faceOffset);
    arc(c, x-faceOffset, y, 12, startAngle, endAngle) // 12 is the radius of the smile circle
  }

  // draw a line on canvas context `c`, from point x1,y1 to point x2,y2
  function line(c, x1, y1, x2, y2, colour="black") {
    c.strokeStyle = colour;
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.stroke();
  }

  // draw a circle on canvas context `c`, centered on x,y, with radius r
  // also fill the circle with white (so it's not transparent)
  function circle(c, x, y, r) {
    c.beginPath();
    c.fillStyle="#fff";
    c.arc(x, y, r, 0, 6.3, false); // 6.3 is bigger than 2π so the arc will be a whole circle
    c.fill();
    c.stroke()
  }


  // draw an arc on canvas context `c`, cenetered on x,y, with radius r, from angleStart to angleEnd
  function arc(c, x, y, r, angleStart, angleEnd) {
    c.beginPath();
    c.arc(x, y, r, angleStart, angleEnd, false);
    c.stroke();
  }

  // convert from degrees to radians
  function rad(x) {
    return x * Math.PI / 180;
  }

}

function drawLines(canvas){
    canvas = canvas.getContext("2d");
    canvas.beginPath();
    canvas.moveTo(100, 100);
    canvas.lineTo(500, 100);
    canvas.stroke();

    canvas.moveTo(100, 200);
    canvas.lineTo(300, 200);
    canvas.stroke();

}

function drawTriangle(canvas, x1, y1, x2, y2, x3, y3){
    const c = canvas.getContext("2d");
    c.fillStyle ="green";
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineTo(x3, y3);
    c.lineTo(x1, y1);
    c.outlineColor = "#FF0000";
    c.fill();
    c.stroke();
}

function drawGrid(canvas){
    const c = canvas.getContext("2d");
    c.beginPath();
    for (let w_step = 0; w_step < canvas.width; w_step += 50){
        c.moveTo(w_step, 0);
        c.lineTo(w_step, canvas.height);
        c.stroke();
    }
    for (let h_step = 0; h_step < canvas.height; h_step += 50){
        c.moveTo(0, h_step);
        c.lineTo(canvas.width, h_step);
        c.stroke();
    }
}

function drawCzechFlag(canvas){
    const c = canvas.getContext("2d");
    c.beginPath();

    c.fillStyle = "red";
    c.rect(0, canvas.height/2, canvas.width, canvas.height/2);
    c.fill();
    c.stroke();

    c.beginPath();
    c.fillStyle = "blue";
    c.moveTo(0,0);
    c.lineTo(canvas.width/2, canvas.height/2);
    c.lineTo(0, canvas.height);
    c.fill();
    c.stroke();
}

function drawSpartacus(canvas){
    drawStickFigure(canvas, 50, 150, 180);

    let cc = canvas;
    let c = canvas.getContext("2d");

    let speed = 20;
    let distanceWalked = 0;
    let walking = false;

    let positionX = Math.floor(Math.random()*(canvas.width-100)+50);
    let positionY = Math.floor(Math.random()*(canvas.height-120)+100);
    let targetX = positionX;
    let targetY = positionY;

    canvas.addEventListener('click', setNewTarget);

    updateAndDrawCurrentState();

    function startWalking(c, canvas){
        if (walking){
            return
        }

        walking = true;
        elapsedTime();
        updateAndDrawCurrentState(c, canvas)
    }

    function stopWalking(){
        walking = false;
    }

    function updateAndDrawCurrentState(){
        console.log(c, targetX, targetY);
        console.error(canvas);
        c.clearRect(0, 0, canvas.width, canvas.height);
        cross(c, targetX, targetY);

        const distance = Math.sqrt(Math.pow(targetX-positionX, 2) + Math.pow(targetY-positionY, 2));

        if (distance<1) {
            drawStickFigure(canvas, positionX, positionY, canvas);
            distanceWalked = 0;
            stopWalking();
            return;
        }

        let walkedNow = speed * elapsedTime();
        if (walkedNow > distance){
            walkedNow = distance;
        }
        let direction = Math.acos((targetX-positionX)/distance);
        if ((targetY-positionY) < 0) {
            direction = -direction;
        }
        positionX = positionX + Math.cos(direction) * walkedNow;
        positionY = positionY + Math.sin(direction) * walkedNow;
        distanceWalked += walkedNow;

        drawStickFigure(canvas, positionX, positionY, 180);
        if (walking) requestAnimationFrame(updateAndDrawCurrentState);
    }

    function setNewTarget(event) {
        const click = getClickCoordinates(event, cc);
        // 2 is the width of the border we've given our canvas
        const c = cc.getContext("2d");
        targetX = click.left-2;
        targetY = click.top-2;
        console.log(cc);
        startWalking(c, canvas);
    }

    function cross(c, targetX, targetY){
        line(c, targetX-10, targetY, targetX+10, targetY);
        line(c, targetX, targetY-10, targetX, targetY+10);
    }

    function line(c, x1, y1, x2, y2) {
        c.beginPath();
        c.moveTo(x1,y1);
        c.lineTo(x2,y2);
        c.stroke();
    }

    function getClickCoordinates(event, element) {
        const rect = element.getBoundingClientRect();

        return {
            left: event.clientX - rect.left,
            top: event.clientY - rect.top,
        };
    }
}

let lastTime = null;
function elapsedTime() {
    if (!lastTime) lastTime = Date.now();
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastTime;
    lastTime = currentTime;
    return timeElapsed/1000;
}

function drawEyes(canvas){
    const c = canvas.getContext("2d");

    // Outer
    circle(c, canvas.width/4, canvas.height/2, canvas.width/4);
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, canvas.width/4);
    //Inner
    circle(c, canvas.width/4, canvas.height/2, canvas.width/8, "blue");
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, canvas.width/8, "blue");
    //Inner Inner
    circle(c, canvas.width/4, canvas.height/2, canvas.width/16, "black");
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, canvas.width/16, "black");

    function circle(c, x, y, r, fill="#fff") {
        c.beginPath();
        c.fillStyle = fill;
        c.arc(x, y, r, 0, 6.3, false); // 6.3 is bigger than 2π so the arc will be a whole circle
        c.fill();
        c.stroke()
    }
}

function drawSmiley(canvas){
    const c = canvas.getContext("2d");

    const radius = Math.min(canvas.width, canvas.height);

    //Face
    circle(c, canvas.width/2, canvas.height/2, radius/2, "yellow");
    // Outer
    circle(c, canvas.width/4, canvas.height/2, radius/4);
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, radius/4);
    //Inner
    circle(c, canvas.width/4, canvas.height/2, radius/8, "blue");
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, radius/8, "blue");
    //Inner Inner
    circle(c, canvas.width/4, canvas.height/2, radius/16, "black");
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, radius/16, "black");
    //Mouth
    mouth(c, canvas.width/2, canvas.height/4+canvas.height/2, radius/4);

    function mouth(c, x, y, r, fill="#fff"){
        c.beginPath();
        c.fillStyle = fill;
        c.arc(x, y, r, 0, Math.PI, false);
        c.fill();
        c.stroke()
    }

    function circle(c, x, y, r, fill="#fff") {
        c.beginPath();
        c.fillStyle = fill;
        c.arc(x, y, r, 0, Math.PI*2, false); // 6.3 is bigger than 2π so the arc will be a whole circle
        c.fill();
        c.stroke()
    }

}

function drawEmoji(canvas){

    const c = canvas.getContext("2d");
    const c_teeth = canvas.getContext("2d");

    const radius = Math.min(canvas.width, canvas.height);
    //c_teeth.globalCompositeOperation = "destination-over";

    //Teeth
    drawGrid(canvas, 15, 25);
    //Face
    circle(c, canvas.width/2, canvas.height/2, radius/2, "yellow");
    // Outer
    circle(c, canvas.width/4, canvas.height/2, radius/4);
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, radius/4);
    //Inner
    circle(c, canvas.width/4, canvas.height/2, radius/8, "blue");
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, radius/8, "blue");
    //Inner Inner
    circle(c, canvas.width/4, canvas.height/2, radius/16, "black");
    circle(c, canvas.width/4+canvas.width/2, canvas.height/2, radius/16, "black");
    //Mouth
    mouth(c_teeth, canvas.width/2, canvas.height/4+canvas.height/2, radius/4);

    function drawGrid(canvas, w_size=50, h_size=50){
        const c = canvas.getContext("2d");
        console.log(canvas.width, canvas.height);
        c.beginPath();
        for (let w_step = 0; w_step < canvas.width; w_step += w_size){
            c.moveTo(w_step, 0);
            c.lineTo(w_step, canvas.height);
            c.stroke();
        }
        for (let h_step = 0; h_step < canvas.height; h_step += h_size){
            c.moveTo(0, h_step);
            c.lineTo(canvas.width, h_step);
            c.stroke();
        }
    }

    function mouth(c, x, y, r, fill="#fff"){
        c.beginPath();
        c.fillStyle = fill;
        c.arc(x, y, r, 0, Math.PI, false);
        c.fill();
        c.stroke();
        //c.clip();
    }

    function circle(c, x, y, r, fill="#fff") {
        c.beginPath();
        c.fillStyle = fill;
        c.arc(x, y, r, 0, Math.PI*2, false); // 6.3 is bigger than 2π so the arc will be a whole circle
        c.fill();
        c.stroke();
    }

}
