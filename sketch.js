// Pizza Game

let screen = 'start';
let sauce = '';
let toppings = [];

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER);
}

function draw() {
  background(220);

  if (screen == 'start') {
    // title
    fill(0);
    textSize(50);
    text('PIZZA GAME', 400, 200);

    // start button
    fill(255, 100, 50);
    rect(300, 300, 200, 80);
    fill(255);
    textSize(30);
    text('START', 400, 350);
  }

  if (screen == 'game') {
    // pizza
    fill(200, 150, 100);
    circle(400, 300, 250);

    // sauce
    if (sauce == 'red') {
      fill(200, 50, 50);
      circle(400, 300, 200);
    }
    if (sauce == 'green') {
      fill(100, 150, 80);
      circle(400, 300, 200);
    }

    // toppings on pizza
    for (let i = 0; i < toppings.length; i++) {
      fill(toppings[i].c);
      circle(toppings[i].x, toppings[i].y, 40);
    }

    // red sauce button
    fill(200, 50, 50);
    rect(50, 50, 100, 50);
    fill(255);
    textSize(16);
    text('Red', 100, 80);

    // green sauce button
    fill(100, 150, 80);
    rect(50, 120, 100, 50);
    fill(255);
    text('Green', 100, 150);

    // pepperoni button
    fill(200, 50, 50);
    rect(650, 50, 100, 50);
    fill(255);
    text('Pepperoni', 700, 80);

    // olive button
    fill(50, 100, 50);
    rect(650, 120, 100, 50);
    fill(255);
    text('Olive', 700, 150);

    // mushroom button
    fill(150, 120, 90);
    rect(650, 190, 100, 50);
    fill(255);
    text('Mushroom', 700, 220);
  }
}

function mousePressed() {
  // start button
  if (screen == 'start') {
    if (mouseX > 300 && mouseX < 500 && mouseY > 300 && mouseY < 380) {
      screen = 'game';
    }
  }

  if (screen == 'game') {
    // red sauce
    if (mouseX > 50 && mouseX < 150 && mouseY > 50 && mouseY < 100) {
      sauce = 'red';
    }

    // green sauce
    if (mouseX > 50 && mouseX < 150 && mouseY > 120 && mouseY < 170) {
      sauce = 'green';
    }

    // pepperoni
    if (mouseX > 650 && mouseX < 750 && mouseY > 50 && mouseY < 100) {
      let x = random(300, 500);
      let y = random(200, 400);
      toppings.push({ x: x, y: y, c: color(200, 50, 50) });
    }

    // olive
    if (mouseX > 650 && mouseX < 750 && mouseY > 120 && mouseY < 170) {
      let x = random(300, 500);
      let y = random(200, 400);
      toppings.push({ x: x, y: y, c: color(50, 100, 50) });
    }

    // mushroom
    if (mouseX > 650 && mouseX < 750 && mouseY > 190 && mouseY < 240) {
      let x = random(300, 500);
      let y = random(200, 400);
      toppings.push({ x: x, y: y, c: color(150, 120, 90) });
    }
  }
}
