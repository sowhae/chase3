// Pizza Game by Kayley Park

// game screens
let screen = 'start';

// pizza settings
let crustType = 'regular';
let sauce = '';

// pizza position
let pizzaX = 400;
let pizzaY = 300;

// toppings
let toppings = [];
let placedToppings = [];
let dragging = null;

// baking timer
let bakeTime = 0;

function setup() {
  createCanvas(800, 600);

  // create topping options
  toppings.push({ name: 'pepperoni', color: [200, 50, 50], x: 50, y: 150 });
  toppings.push({ name: 'olive', color: [50, 100, 50], x: 50, y: 220 });
  toppings.push({ name: 'mushroom', color: [150, 120, 90], x: 50, y: 290 });
  toppings.push({ name: 'pepper', color: [255, 200, 0], x: 50, y: 360 });
  toppings.push({ name: 'cheese', color: [255, 220, 100], x: 50, y: 430 });
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
  textSize(40);
  textAlign(CENTER);
  text('PIZZA GAME', width / 2, 150);

  textSize(20);
  text('by Kayley Park', width / 2, 200);

  // draw start button
  fill(200, 120, 50);
  rect(300, 280, 200, 60);
  fill(255);
  textSize(24);
  text('START', width / 2, 315);
}

// MAKING PIZZA SCREEN
function showMakingScreen() {
  // left sidebar
  fill(210, 180, 150);
  rect(0, 0, 120, height);

  fill(100);
  textSize(14);
  textAlign(CENTER);
  text('TOPPINGS', 60, 30);

  // show toppings you can pick
  for (let i = 0; i < toppings.length; i++) {
    fill(toppings[i].color);
    circle(toppings[i].x, toppings[i].y, 30);
    fill(80);
    textSize(10);
    text(toppings[i].name, toppings[i].x, toppings[i].y + 30);
  }

  // right sidebar
  fill(210, 180, 150);
  rect(width - 180, 0, 180, height);

  fill(100);
  textSize(12);
  text('CRUST:', width - 90, 60);

  // crust buttons
  if (crustType == 'regular') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 150, 70, 120, 30);
  fill(0);
  textSize(12);
  text('Regular', width - 90, 88);

  if (crustType == 'thin') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 150, 110, 120, 30);
  fill(0);
  text('Thin', width - 90, 128);

  // sauce buttons
  fill(100);
  textSize(12);
  text('SAUCE:', width - 90, 170);

  if (sauce == 'red') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 150, 180, 120, 30);
  fill(0);
  text('Red', width - 90, 198);

  if (sauce == 'green') {
    fill(100, 200, 100);
  } else {
    fill(200);
  }
  rect(width - 150, 220, 120, 30);
  fill(0);
  text('Green', width - 90, 238);

  // bake button
  if (sauce != '') {
    fill(220, 100, 50);
    rect(width - 150, height - 80, 120, 50);
    fill(255);
    textSize(16);
    text('BAKE', width - 90, height - 50);
  }

  // draw the pizza
  drawPizza();

  // draw toppings on pizza
  for (let i = 0; i < placedToppings.length; i++) {
    fill(placedToppings[i].color);
    circle(placedToppings[i].x, placedToppings[i].y, 25);
  }

  // draw topping being dragged
  if (dragging != null) {
    fill(dragging.color);
    circle(mouseX, mouseY, 25);
  }
}

// draw the pizza base
function drawPizza() {
  // crust
  fill(220, 180, 120);
  if (crustType == 'thin') {
    strokeWeight(5);
  } else {
    strokeWeight(12);
  }
  stroke(200, 160, 100);
  circle(pizzaX, pizzaY, 240);

  // sauce
  noStroke();
  if (sauce == 'red') {
    fill(200, 60, 40);
    circle(pizzaX, pizzaY, 200);
  } else if (sauce == 'green') {
    fill(100, 160, 80);
    circle(pizzaX, pizzaY, 200);
  }
}

// BAKING SCREEN
function showBakingScreen() {
  background(255, 150, 80);

  // oven
  fill(80);
  rect(150, 100, 500, 400);

  // oven window
  fill(100, 80, 70);
  rect(200, 150, 400, 300);

  // pizza inside
  fill(200, 150, 90);
  strokeWeight(10);
  stroke(180, 130, 70);
  circle(400, 300, 200);

  // sauce
  noStroke();
  if (sauce == 'red') {
    fill(180, 50, 35);
  } else {
    fill(90, 140, 70);
  }
  circle(400, 300, 170);

  // toppings
  for (let i = 0; i < placedToppings.length; i++) {
    fill(placedToppings[i].color);
    let x = placedToppings[i].x - pizzaX + 400;
    let y = placedToppings[i].y - pizzaY + 300;
    circle(x, y, 20);
  }

  // baking text
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text('BAKING...', width / 2, 520);

  // timer bar
  fill(100);
  rect(250, 540, 300, 20);
  fill(255, 180, 60);
  rect(250, 540, bakeTime * 2, 20);

  // count up timer
  bakeTime = bakeTime + 1;
  if (bakeTime >= 150) {
    screen = 'done';
  }
}

// DONE SCREEN
function showDoneScreen() {
  background(255, 240, 220);

  fill(100);
  textSize(32);
  textAlign(CENTER);
  text('YOUR PIZZA IS READY!', width / 2, 60);

  // show finished pizza
  fill(200, 150, 90);
  strokeWeight(12);
  stroke(180, 130, 70);
  circle(pizzaX, pizzaY, 260);

  noStroke();
  if (sauce == 'red') {
    fill(180, 50, 35);
  } else {
    fill(90, 140, 70);
  }
  circle(pizzaX, pizzaY, 220);

  // show toppings
  for (let i = 0; i < placedToppings.length; i++) {
    fill(placedToppings[i].color);
    circle(placedToppings[i].x, placedToppings[i].y, 30);
  }

  // info
  fill(100);
  textSize(16);
  text('Crust: ' + crustType, width / 2, 500);
  text('Sauce: ' + sauce, width / 2, 520);
  text('Toppings: ' + placedToppings.length, width / 2, 540);

  // make another button
  fill(100, 200, 100);
  rect(300, 560, 200, 40);
  fill(0);
  textSize(16);
  text('MAKE ANOTHER', width / 2, 582);
}

// when mouse is clicked
function mousePressed() {
  // start screen - check if start button clicked
  if (screen == 'start') {
    if (mouseX > 300 && mouseX < 500 && mouseY > 280 && mouseY < 340) {
      screen = 'making';
    }
  }

  // making screen
  else if (screen == 'making') {
    // check if clicked on a topping
    for (let i = 0; i < toppings.length; i++) {
      let d = dist(mouseX, mouseY, toppings[i].x, toppings[i].y);
      if (d < 15) {
        dragging = { name: toppings[i].name, color: toppings[i].color };
      }
    }

    // check crust buttons
    if (mouseX > width - 150 && mouseX < width - 30) {
      if (mouseY > 70 && mouseY < 100) {
        crustType = 'regular';
      }
      if (mouseY > 110 && mouseY < 140) {
        crustType = 'thin';
      }
    }

    // check sauce buttons
    if (mouseX > width - 150 && mouseX < width - 30) {
      if (mouseY > 180 && mouseY < 210) {
        sauce = 'red';
      }
      if (mouseY > 220 && mouseY < 250) {
        sauce = 'green';
      }
    }

    // check bake button
    if (sauce != '' && mouseX > width - 150 && mouseX < width - 30 && mouseY > height - 80 && mouseY < height - 30) {
      screen = 'baking';
      bakeTime = 0;
    }
  }

  // done screen - check make another button
  else if (screen == 'done') {
    if (mouseX > 300 && mouseX < 500 && mouseY > 560 && mouseY < 600) {
      // reset everything
      screen = 'making';
      crustType = 'regular';
      sauce = '';
      placedToppings = [];
      bakeTime = 0;
    }
  }
}

// when mouse is released
function mouseReleased() {
  if (dragging != null) {
    // check if dropped on pizza
    let d = dist(mouseX, mouseY, pizzaX, pizzaY);
    if (d < 120) {
      placedToppings.push({ name: dragging.name, color: dragging.color, x: mouseX, y: mouseY });
    }
    dragging = null;
  }
}