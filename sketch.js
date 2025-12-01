// Pizza Game

let screen = 'start';
let sauce = '';
let toppings = [];
let placedToppings = [];
let dragging = null;

function setup() {
  createCanvas(800, 600);

  toppings.push({ name: 'pepperoni', color: [200, 50, 50], x: 60, y: 120 });
  toppings.push({ name: 'olive', color: [50, 100, 50], x: 60, y: 210 });
  toppings.push({ name: 'mushroom', color: [150, 120, 90], x: 60, y: 300 });
  toppings.push({ name: 'cheese', color: [255, 220, 100], x: 60, y: 390 });
}

function draw() {
  background(240, 230, 210);

  if (screen == 'start') {
    showStartScreen();
  } else if (screen == 'making') {
    showMakingScreen();
  } else if (screen == 'done') {
    showDoneScreen();
  }
}

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

  if (sauce == 'red') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 140, 100, 120, 50);
  fill(0);
  textSize(16);
  text('Red', width - 80, 130);

  if (sauce == 'white') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 140, 160, 120, 50);
  fill(0);
  text('White', width - 80, 190);

  if (sauce != '') {
    fill(220, 100, 50);
    rect(width - 140, height - 80, 120, 60);
    fill(255);
    textSize(20);
    text('DONE', width - 80, height - 45);
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
  strokeWeight(20);
  stroke(200, 160, 100);
  circle(400, 300, 280);

  noStroke();
  if (sauce == 'red') {
    fill(200, 60, 40);
    circle(400, 300, 240);
  } else if (sauce == 'white') {
    fill(240, 230, 200);
    circle(400, 300, 240);
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
    fill(240, 230, 200);
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
  } else if (screen == 'making') {
    for (let i = 0; i < toppings.length; i++) {
      let d = dist(mouseX, mouseY, toppings[i].x, toppings[i].y);
      if (d < 25) {
        dragging = { name: toppings[i].name, color: toppings[i].color };
      }
    }

    if (mouseX > width - 140 && mouseX < width - 20) {
      if (mouseY > 100 && mouseY < 150) {
        sauce = 'red';
      }
      if (mouseY > 160 && mouseY < 210) {
        sauce = 'white';
      }
      if (sauce != '' && mouseY > height - 80 && mouseY < height - 20) {
        screen = 'done';
      }
    }
  } else if (screen == 'done') {
    if (mouseX > 250 && mouseX < 550 && mouseY > 500 && mouseY < 560) {
      screen = 'making';
      sauce = '';
      placedToppings = [];
    }
  }
}

function mouseReleased() {
  if (dragging != null) {
    let d = dist(mouseX, mouseY, 400, 300);
    if (d < 140) {
      placedToppings.push({
        name: dragging.name,
        color: dragging.color,
        x: mouseX,
        y: mouseY
      });
    }
    dragging = null;
  }
}
