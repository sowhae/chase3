let toppings = [];
let dragging = null;

function setup() {
  createCanvas(800, 600);

  toppings.push({ name: 'pepperoni', color: [200, 50, 50], x: 60, y: 120 });
  toppings.push({ name: 'olive', color: [50, 100, 50], x: 60, y: 210 });
  toppings.push({ name: 'mushroom', color: [150, 120, 90], x: 60, y: 300 });
  toppings.push({ name: 'cheese', color: [255, 220, 100], x: 60, y: 390 });
}

function draw() {
  background(240);

  for (let i = 0; i < toppings.length; i++) {
    fill(toppings[i].color);
    circle(toppings[i].x, toppings[i].y, 50);
  }

  if (dragging != null) {
    fill(dragging.color);
    circle(mouseX, mouseY, 50);
  }
}

function mousePressed() {
  for (let i = 0; i < toppings.length; i++) {
    let d = dist(mouseX, mouseY, toppings[i].x, toppings[i].y);
    if (d < 25) {
      dragging = { color: toppings[i].color, index: i };
    }
  }
}

function mouseReleased() {
  if (dragging != null) {
    toppings[dragging.index].x = mouseX;
    toppings[dragging.index].y = mouseY;
    dragging = null;
  }
}
