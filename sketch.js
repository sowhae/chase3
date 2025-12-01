// Pizza Game

let sauce = '';
let toppings = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

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
  textSize(20);
  text('Red', 100, 83);

  // green sauce button
  fill(100, 150, 80);
  rect(50, 120, 100, 50);
  fill(255);
  text('Green', 90, 153);

  // pepperoni button
  fill(200, 50, 50);
  rect(650, 50, 100, 50);
  fill(255);
  text('Pepperoni', 665, 83);

  // olive button
  fill(50, 100, 50);
  rect(650, 120, 100, 50);
  fill(255);
  text('Olive', 685, 153);

  // mushroom button
  fill(150, 120, 90);
  rect(650, 190, 100, 50);
  fill(255);
  text('Mushroom', 660, 223);
}

function mousePressed() {
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
