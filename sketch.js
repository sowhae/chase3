// Pizza Topping Drag & Drop Prototype

let toppings = [];
let placedToppings = [];
let dragging = null;
let hovering = false;

function setup() {
  createCanvas(800, 600);

  toppings.push({ name: 'pepperoni', color: [200, 50, 50], x: 60, y: 120 });
  toppings.push({ name: 'olive', color: [50, 100, 50], x: 60, y: 210 });
  toppings.push({ name: 'mushroom', color: [150, 120, 90], x: 60, y: 300 });
  toppings.push({ name: 'cheese', color: [255, 220, 100], x: 60, y: 390 });
  toppings.push({ name: 'bell pepper', color: [220, 180, 50], x: 60, y: 480 });
}

function draw() {
  background(240, 230, 210);

  // Title
  fill(100);
  textSize(32);
  textAlign(CENTER);
  text('Drag & Drop Pizza Toppings', width / 2, 40);

  textSize(16);
  fill(120);
  text('Drag toppings from the left onto the pizza', width / 2, 70);

  // Left panel with topping buttons
  fill(210, 180, 150);
  rect(0, 100, 140, height - 100);

  // Draw topping buttons
  for (let i = 0; i < toppings.length; i++) {
    let d = dist(mouseX, mouseY, toppings[i].x, toppings[i].y);

    // Highlight on hover
    if (d < 25 && dragging == null) {
      strokeWeight(3);
      stroke(100, 200, 255);
    } else {
      noStroke();
    }

    fill(toppings[i].color);
    circle(toppings[i].x, toppings[i].y, 50);

    noStroke();
    fill(80);
    textSize(14);
    textAlign(CENTER);
    text(toppings[i].name, toppings[i].x, toppings[i].y + 45);
  }

  // Draw pizza base
  drawPizza();

  // Draw placed toppings
  for (let i = 0; i < placedToppings.length; i++) {
    fill(placedToppings[i].color);
    noStroke();
    circle(placedToppings[i].x, placedToppings[i].y, 35);
  }

  // Draw dragging topping
  if (dragging != null) {
    // Check if hovering over pizza
    let d = dist(mouseX, mouseY, 400, 300);
    hovering = d < 140;

    // Visual feedback
    if (hovering) {
      fill(dragging.color[0], dragging.color[1], dragging.color[2], 200);
      strokeWeight(2);
      stroke(100, 255, 100);
    } else {
      fill(dragging.color[0], dragging.color[1], dragging.color[2], 150);
      strokeWeight(2);
      stroke(255, 100, 100);
    }

    circle(mouseX, mouseY, 35);

    // Drop zone indicator
    if (hovering) {
      noFill();
      strokeWeight(3);
      stroke(100, 255, 100, 150);
      circle(mouseX, mouseY, 50);
    }
  }

  // Instructions
  fill(100);
  textSize(14);
  textAlign(LEFT);
  text('✓ Click and drag toppings', 20, height - 40);
  text('✓ Drop on pizza to place', 20, height - 20);

  // Stats
  textAlign(RIGHT);
  text('Toppings placed: ' + placedToppings.length, width - 20, height - 20);
}

function drawPizza() {
  // Pizza crust
  fill(220, 180, 120);
  strokeWeight(20);
  stroke(200, 160, 100);
  circle(400, 300, 280);

  // Pizza sauce
  noStroke();
  fill(200, 60, 40);
  circle(400, 300, 240);

  // Highlight drop zone when dragging
  if (dragging != null) {
    noFill();
    strokeWeight(3);
    stroke(100, 200, 255, 100);
    circle(400, 300, 280);
  }
}

function mousePressed() {
  // Check if clicking on a topping button
  for (let i = 0; i < toppings.length; i++) {
    let d = dist(mouseX, mouseY, toppings[i].x, toppings[i].y);
    if (d < 25) {
      dragging = {
        name: toppings[i].name,
        color: toppings[i].color
      };
      break;
    }
  }
}

function mouseReleased() {
  if (dragging != null) {
    let d = dist(mouseX, mouseY, 400, 300);

    // If dropped on pizza, place the topping
    if (d < 140) {
      placedToppings.push({
        name: dragging.name,
        color: dragging.color,
        x: mouseX,
        y: mouseY
      });
    }

    dragging = null;
    hovering = false;
  }
}

// Double-click to clear all toppings
function doubleClicked() {
  placedToppings = [];
}
