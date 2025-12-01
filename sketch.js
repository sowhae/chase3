// Pizza Game

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

  // Draw pizza
  fill(220, 180, 120);
  strokeWeight(20);
  stroke(200, 160, 100);
  circle(400, 300, 280);

  noStroke();
  fill(200, 60, 40);
  circle(400, 300, 240);

  // Draw toppings palette
  for (let i = 0; i < toppings.length; i++) {
    fill(toppings[i].color);
    circle(toppings[i].x, toppings[i].y, 50);
  }

  // Draw placed toppings
  for (let i = 0; i < placedToppings.length; i++) {
    fill(placedToppings[i].color);
    circle(placedToppings[i].x, placedToppings[i].y, 35);
  }

  // Draw dragging topping
  if (dragging != null) {
    fill(dragging.color);
    circle(mouseX, mouseY, 35);
  }
}

function mousePressed() {
  for (let i = 0; i < toppings.length; i++) {
    let d = dist(mouseX, mouseY, toppings[i].x, toppings[i].y);
    if (d < 25) {
      dragging = { name: toppings[i].name, color: toppings[i].color };
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
