// Pizza Game

let screen = 'start';
let crustType = 'regular';
let sauce = '';
let toppings = [];
let placedToppings = [];
let dragging = null;
let bakeTime = 0;

function setup() {
  createCanvas(800, 600);

  toppings.push({ name: 'pepperoni', color: [200, 50, 50], x: 60, y: 120 });
  toppings.push({ name: 'olive', color: [50, 100, 50], x: 60, y: 210 });
  toppings.push({ name: 'mushroom', color: [150, 120, 90], x: 60, y: 300 });
  toppings.push({ name: 'cheese', color: [255, 220, 100], x: 60, y: 390 });
}

function draw() {
  background(240, 230, 210);

  // show different screens
  if (screen == 'start') {
    showStartScreen();
  } else if (screen == 'making') {
    showMakingScreen();
  } else if (screen == 'baking') {
    showBakingScreen();
  } else if (screen == 'done') {
    showDoneScreen();
  }
}

// START SCREEN
function showStartScreen() {
  fill(100);
  textSize(60);
  textAlign(CENTER);
  text('PIZZA GAME', width / 2, 200);

  fill(200, 120, 50);
  rect(250, 300, 300, 80);
  fill(255);
  textSize(36);
  text('START', width / 2, 350);
}

// MAKING PIZZA SCREEN
function showMakingScreen() {
  fill(210, 180, 150);
  rect(0, 0, 140, height);

  for (let i = 0; i < toppings.length; i++) {
    fill(toppings[i].color);
    circle(toppings[i].x, toppings[i].y, 50);
    fill(80);
    textSize(14);
    textAlign(CENTER);
    text(toppings[i].name, toppings[i].x, toppings[i].y + 45);
  }

  fill(210, 180, 150);
  rect(width - 160, 0, 160, height);

  if (crustType == 'regular') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 140, 60, 120, 50);
  fill(0);
  textSize(16);
  text('Regular', width - 80, 90);

  if (crustType == 'thin') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 140, 120, 120, 50);
  fill(0);
  text('Thin', width - 80, 150);

  if (sauce == 'red') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 140, 200, 120, 50);
  fill(0);
  text('Red', width - 80, 230);

  if (sauce == 'green') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 140, 260, 120, 50);
  fill(0);
  text('Green', width - 80, 290);

  if (sauce != '') {
    fill(220, 100, 50);
    rect(width - 140, height - 80, 120, 60);
    fill(255);
    textSize(20);
    text('BAKE', width - 80, height - 45);
  }

  drawPizza();

  for (let i = 0; i < placedToppings.length; i++) {
    fill(placedToppings[i].color);
    circle(placedToppings[i].x, placedToppings[i].y, 35);
  }

  if (dragging != null) {
    fill(dragging.color);
    circle(mouseX, mouseY, 35);
  }
}

function drawPizza() {
  fill(220, 180, 120);
  if (crustType == 'thin') {
    strokeWeight(8);
  } else {
    strokeWeight(20);
  }
  stroke(200, 160, 100);
  circle(400, 300, 280);

  noStroke();
  if (sauce == 'red') {
    fill(200, 60, 40);
    circle(400, 300, 240);
  } else if (sauce == 'green') {
    fill(100, 160, 80);
    circle(400, 300, 240);
  }
}

function showBakingScreen() {
  background(255, 150, 80);

  fill(80);
  rect(150, 100, 500, 400);

  fill(100, 80, 70);
  rect(200, 150, 400, 300);

  fill(200, 150, 90);
  strokeWeight(15);
  stroke(180, 130, 70);
  circle(400, 300, 220);

  noStroke();
  if (sauce == 'red') {
    fill(180, 50, 35);
  } else {
    fill(90, 140, 70);
  }
  circle(400, 300, 180);

  for (let i = 0; i < placedToppings.length; i++) {
    fill(placedToppings[i].color);
    circle(placedToppings[i].x, placedToppings[i].y, 30);
  }

  fill(255);
  textSize(40);
  textAlign(CENTER);
  text('BAKING', width / 2, 520);

  fill(100);
  rect(250, 540, 300, 30);
  fill(255, 180, 60);
  rect(250, 540, bakeTime * 2, 30);

  bakeTime = bakeTime + 1;
  if (bakeTime >= 150) {
    screen = 'done';
  }
}

function showDoneScreen() {
  background(255, 240, 220);

  fill(100);
  textSize(50);
  textAlign(CENTER);
  text('DONE!', width / 2, 80);

  fill(200, 150, 90);
  strokeWeight(20);
  stroke(180, 130, 70);
  circle(400, 300, 300);

  noStroke();
  if (sauce == 'red') {
    fill(180, 50, 35);
  } else {
    fill(90, 140, 70);
  }
  circle(400, 300, 260);

  for (let i = 0; i < placedToppings.length; i++) {
    fill(placedToppings[i].color);
    circle(placedToppings[i].x, placedToppings[i].y, 40);
  }

  fill(100, 200, 100);
  rect(250, 500, 300, 60);
  fill(0);
  textSize(24);
  text('MAKE ANOTHER', width / 2, 538);
}

function mousePressed() {
  if (screen == 'start') {
    if (mouseX > 250 && mouseX < 550 && mouseY > 300 && mouseY < 380) {
      screen = 'making';
    }
  }
  else if (screen == 'making') {
    for (let i = 0; i < toppings.length; i++) {
      let d = dist(mouseX, mouseY, toppings[i].x, toppings[i].y);
      if (d < 25) {
        dragging = { name: toppings[i].name, color: toppings[i].color };
      }
    }

    if (mouseX > width - 140 && mouseX < width - 20) {
      if (mouseY > 60 && mouseY < 110) {
        crustType = 'regular';
      }
      if (mouseY > 120 && mouseY < 170) {
        crustType = 'thin';
      }
      if (mouseY > 200 && mouseY < 250) {
        sauce = 'red';
      }
      if (mouseY > 260 && mouseY < 310) {
        sauce = 'green';
      }
      if (sauce != '' && mouseY > height - 80 && mouseY < height - 20) {
        screen = 'baking';
        bakeTime = 0;
      }
    }
  }
  else if (screen == 'done') {
    if (mouseX > 250 && mouseX < 550 && mouseY > 500 && mouseY < 560) {
      screen = 'making';
      crustType = 'regular';
      sauce = '';
      placedToppings = [];
      bakeTime = 0;
    }
  }
}

function mouseReleased() {
  if (dragging != null) {
    let d = dist(mouseX, mouseY, 400, 300);
    if (d < 140) {
      placedToppings.push({ name: dragging.name, color: dragging.color, x: mouseX, y: mouseY });
    }
    dragging = null;
  }
}