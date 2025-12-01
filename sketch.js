// Kayley Park - Pizza Game
// Game States
const STATES = {
  START: 'start',
  BUILDING: 'building',
  BAKING: 'baking',
  FINISHED: 'finished'
};

let gameState = STATES.START;

// Pizza Configuration
let doughType = 'regular'; // 'thin' or 'regular'
let sauceType = null; // 'red' or 'green'

// Pizza Center
const pizzaX = 400;
const pizzaY = 300;
const pizzaRadius = 120;

// Toppings Data
let availableToppings = [];
let placedToppings = [];
let draggedTopping = null;

// Baking Animation
let bakeProgress = 0;
let bakeTime = 180; // frames (3 seconds at 60fps)

function setup() {
  createCanvas(800, 600);
  initializeToppings();
}

function initializeToppings() {
  // Define available toppings with positions in sidebar
  availableToppings = [
    { name: 'pepperoni', color: '#d32f2f', x: 50, y: 150, size: 25, emoji: '🍕' },
    { name: 'olive', color: '#1b5e20', x: 50, y: 220, size: 20, emoji: '🫒' },
    { name: 'mushroom', color: '#8d6e63', x: 50, y: 290, size: 25, emoji: '🍄' },
    { name: 'pepper', color: '#fbc02d', x: 50, y: 360, size: 25, emoji: '🫑' },
    { name: 'tomato', color: '#e53935', x: 50, y: 430, size: 22, emoji: '🍅' },
    { name: 'basil', color: '#2e7d32', x: 50, y: 500, size: 20, emoji: '🌿' }
  ];
}

function draw() {
  background(240, 230, 210);

  if (gameState === STATES.START) {
    drawStartScreen();
  } else if (gameState === STATES.BUILDING) {
    drawBuildingScreen();
  } else if (gameState === STATES.BAKING) {
    drawBakingScreen();
  } else if (gameState === STATES.FINISHED) {
    drawFinishedScreen();
  }
}

function drawStartScreen() {
  // Title
  fill(180, 100, 50);
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text('🍕 PIZZA GAME 🍕', width / 2, 150);

  textSize(24);
  fill(100, 70, 40);
  text('by Kayley Park', width / 2, 200);

  // Start Button
  let btnW = 200;
  let btnH = 60;
  let btnX = width / 2 - btnW / 2;
  let btnY = 300;

  if (mouseX > btnX && mouseX < btnX + btnW &&
      mouseY > btnY && mouseY < btnY + btnH) {
    fill(220, 140, 60);
  } else {
    fill(200, 120, 50);
  }

  rect(btnX, btnY, btnW, btnH, 10);

  fill(255);
  textSize(32);
  text('START', width / 2, btnY + btnH / 2);

  // Instructions
  textSize(16);
  fill(100);
  textAlign(CENTER);
  text('Create your perfect pizza!', width / 2, 450);
}

function drawBuildingScreen() {
  // Left Sidebar - Toppings
  fill(210, 180, 150);
  rect(0, 0, 120, height);

  fill(100, 70, 40);
  textSize(18);
  textAlign(CENTER);
  text('TOPPINGS', 60, 30);

  // Draw available toppings
  for (let topping of availableToppings) {
    drawTopping(topping.x, topping.y, topping);

    // Label
    fill(80);
    textSize(12);
    text(topping.name, topping.x, topping.y + 35);
  }

  // Right Sidebar - Controls
  fill(210, 180, 150);
  rect(width - 180, 0, 180, height);

  fill(100, 70, 40);
  textSize(18);
  textAlign(CENTER);
  text('BUILD YOUR PIZZA', width - 90, 30);

  // Dough Selection
  textSize(14);
  text('DOUGH:', width - 90, 60);

  drawButton(width - 150, 75, 120, 35, 'Regular', doughType === 'regular');
  drawButton(width - 150, 120, 120, 35, 'Thin', doughType === 'thin');

  // Sauce Selection
  textSize(14);
  text('SAUCE:', width - 90, 180);

  drawButton(width - 150, 195, 120, 35, 'Red Sauce', sauceType === 'red');
  drawButton(width - 150, 240, 120, 35, 'Green Pesto', sauceType === 'green');

  // Bake Button
  if (sauceType !== null) {
    drawButton(width - 150, height - 100, 120, 50, 'BAKE!', false, color(216, 67, 21));
  } else {
    fill(150);
    rect(width - 150, height - 100, 120, 50, 8);
    fill(200);
    textSize(16);
    text('Choose sauce\nfirst!', width - 90, height - 75);
  }

  // Pizza Area
  drawPizza();

  // Draw placed toppings
  for (let topping of placedToppings) {
    drawTopping(topping.x, topping.y, topping);
  }

  // Draw dragged topping
  if (draggedTopping) {
    drawTopping(mouseX, mouseY, draggedTopping);
  }
}

function drawPizza() {
  push();
  translate(pizzaX, pizzaY);

  // Shadow
  fill(0, 0, 0, 30);
  ellipse(5, 5, pizzaRadius * 2 + 10);

  // Crust
  fill(220, 180, 120);
  if (doughType === 'thin') {
    strokeWeight(8);
  } else {
    strokeWeight(15);
  }
  stroke(200, 160, 100);
  ellipse(0, 0, pizzaRadius * 2);

  // Sauce
  if (sauceType === 'red') {
    fill(200, 60, 40);
    noStroke();
    ellipse(0, 0, pizzaRadius * 1.7);
  } else if (sauceType === 'green') {
    fill(100, 160, 80);
    noStroke();
    ellipse(0, 0, pizzaRadius * 1.7);
  }

  pop();
}

function drawTopping(x, y, topping) {
  // Draw emoji-based topping
  textAlign(CENTER, CENTER);
  textSize(topping.size * 1.5);
  text(topping.emoji, x, y);
}

function drawButton(x, y, w, h, label, isActive, activeColor) {
  if (activeColor === undefined) {
    activeColor = color(76, 175, 80);
  }

  if (isActive) {
    fill(activeColor);
  } else if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    fill(180, 160, 140);
  } else {
    fill(200, 180, 160);
  }

  rect(x, y, w, h, 8);

  fill(isActive ? 255 : 80);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function drawBakingScreen() {
  background(255, 150, 80);

  // Oven
  fill(80, 60, 50);
  rect(150, 100, 500, 400, 20);

  // Oven Window
  fill(100, 80, 70);
  rect(200, 150, 400, 300, 10);

  // Pizza in oven (slightly darker as it bakes)
  let darkness = map(bakeProgress, 0, bakeTime, 0, 50);
  push();
  translate(400, 300);

  // Glow effect
  if (bakeProgress > bakeTime * 0.7) {
    fill(255, 200, 100, 100);
    ellipse(0, 0, pizzaRadius * 2.5);
  }

  // Crust
  fill(220 - darkness, 180 - darkness, 120 - darkness * 0.5);
  strokeWeight(doughType === 'thin' ? 8 : 15);
  stroke(200 - darkness, 160 - darkness, 100 - darkness);
  ellipse(0, 0, pizzaRadius * 2);

  // Sauce
  if (sauceType === 'red') {
    fill(200 - darkness * 0.5, 60, 40);
  } else {
    fill(100 - darkness * 0.3, 160 - darkness * 0.3, 80 - darkness * 0.3);
  }
  noStroke();
  ellipse(0, 0, pizzaRadius * 1.7);

  // Toppings (slightly smaller/darker)
  for (let topping of placedToppings) {
    let offsetX = topping.x - pizzaX;
    let offsetY = topping.y - pizzaY;
    textAlign(CENTER, CENTER);
    textSize(topping.size * 1.3);
    text(topping.emoji, offsetX, offsetY);
  }

  pop();

  // Progress Bar
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text('BAKING...', width / 2, 520);

  fill(100);
  rect(250, 540, 300, 30, 15);
  fill(255, 180, 60);
  rect(250, 540, map(bakeProgress, 0, bakeTime, 0, 300), 30, 15);

  // Update progress
  bakeProgress++;
  if (bakeProgress >= bakeTime) {
    gameState = STATES.FINISHED;
  }
}

function drawFinishedScreen() {
  background(255, 240, 220);

  // Title
  fill(180, 100, 50);
  textSize(42);
  textAlign(CENTER);
  textStyle(BOLD);
  text('🎉 YOUR PIZZA IS READY! 🎉', width / 2, 60);

  // Final Pizza Display
  push();
  translate(pizzaX, pizzaY - 20);

  // Shadow
  fill(0, 0, 0, 20);
  ellipse(5, 5, pizzaRadius * 2.4 + 10);

  // Crust (slightly browned)
  fill(200, 150, 90);
  strokeWeight(doughType === 'thin' ? 8 : 15);
  stroke(180, 130, 70);
  ellipse(0, 0, pizzaRadius * 2.4);

  // Sauce
  if (sauceType === 'red') {
    fill(180, 50, 35);
  } else {
    fill(90, 140, 70);
  }
  noStroke();
  ellipse(0, 0, pizzaRadius * 2);

  // Toppings
  for (let topping of placedToppings) {
    let offsetX = topping.x - pizzaX;
    let offsetY = topping.y - pizzaY;
    textAlign(CENTER, CENTER);
    textSize(topping.size * 1.8);
    text(topping.emoji, offsetX, offsetY);
  }

  pop();

  // Pizza Stats
  fill(100, 70, 40);
  textSize(18);
  textStyle(NORMAL);
  text('Dough: ' + (doughType === 'thin' ? 'Thin Crust' : 'Regular'), width / 2, 480);
  text('Sauce: ' + (sauceType === 'red' ? 'Red Tomato' : 'Green Pesto'), width / 2, 505);
  text('Toppings: ' + placedToppings.length, width / 2, 530);

  // Make Another Button
  drawButton(width / 2 - 100, 550, 200, 50, 'MAKE ANOTHER!', false, color(76, 175, 80));
}

function mousePressed() {
  if (gameState === STATES.START) {
    // Check Start Button
    let btnX = width / 2 - 100;
    let btnY = 300;
    if (mouseX > btnX && mouseX < btnX + 200 &&
        mouseY > btnY && mouseY < btnY + 60) {
      gameState = STATES.BUILDING;
    }
  } else if (gameState === STATES.BUILDING) {
    // Check topping selection
    for (let topping of availableToppings) {
      let d = dist(mouseX, mouseY, topping.x, topping.y);
      if (d < 30) {
        draggedTopping = { ...topping };
        return;
      }
    }

    // Check dough buttons
    if (mouseX > width - 150 && mouseX < width - 30) {
      if (mouseY > 75 && mouseY < 110) {
        doughType = 'regular';
      } else if (mouseY > 120 && mouseY < 155) {
        doughType = 'thin';
      }
    }

    // Check sauce buttons
    if (mouseX > width - 150 && mouseX < width - 30) {
      if (mouseY > 195 && mouseY < 230) {
        sauceType = 'red';
      } else if (mouseY > 240 && mouseY < 275) {
        sauceType = 'green';
      }
    }

    // Check bake button
    if (sauceType !== null &&
        mouseX > width - 150 && mouseX < width - 30 &&
        mouseY > height - 100 && mouseY < height - 50) {
      gameState = STATES.BAKING;
      bakeProgress = 0;
    }
  } else if (gameState === STATES.FINISHED) {
    // Check Make Another button
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > 550 && mouseY < 600) {
      // Reset game
      doughType = 'regular';
      sauceType = null;
      placedToppings = [];
      draggedTopping = null;
      gameState = STATES.BUILDING;
    }
  }
}

function mouseReleased() {
  if (gameState === STATES.BUILDING && draggedTopping) {
    // Check if dropped on pizza
    let d = dist(mouseX, mouseY, pizzaX, pizzaY);
    if (d < pizzaRadius) {
      // Place topping on pizza
      placedToppings.push({
        ...draggedTopping,
        x: mouseX,
        y: mouseY
      });
    }
    draggedTopping = null;
  }
}