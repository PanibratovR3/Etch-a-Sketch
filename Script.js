let currentBackgroundColour = "rgb(0,0,0)";
const DEFAULTCOLOR = "#bfbfbf";
let currentBackgroundColourFlag = true;
let randomColourFlag = false;
let eraserFlag = false;
function mouseEnterHandler(event) {
  event.target.classList.toggle("hover");
}

let size = 10;
function mouseLeaveHandler(event) {
  event.target.classList.toggle("default");
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function drawGrid(size) {
  let screen = document.querySelector(".sketch-screen");
  for (let i = 0; i < size; i++) {
    let column = document.createElement("div");
    column.classList.add("column");
    for (let j = 0; j < size; j++) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.style.border = "2px solid black";
      row.addEventListener("mouseenter", mouseEnterHandler);
      row.addEventListener("mouseleave", mouseLeaveHandler);
      column.appendChild(row);
    }
    screen.appendChild(column);
  }
}

const btnSize = document.querySelector(".size");
btnSize.addEventListener("click", () => {
  let newSize = parseInt(prompt("Enter the size of grid.", "100"));
  if (isNaN(newSize)) {
    alert("Error! Number was not entered.");
  } else if (newSize > 100 || newSize < 1) {
    alert("Error! Number must be between 1 and 100.");
  } else {
    size = newSize;
    let columns = document.querySelectorAll(".column");
    columns.forEach((column) => column.parentNode.removeChild(column));
    drawGrid(size);
    draw(currentBackgroundColour);
  }
});

const btnBlack = document.querySelector(".black");
btnBlack.addEventListener("click", () => {
  currentBackgroundColour = "rgb(0,0,0)";
  currentBackgroundColourFlag = true;
  randomColourFlag = false;
  let buttons = document.querySelectorAll(".sketch-control>button");
  buttons.forEach((button) => {
    if (button.classList.contains("black")) {
      button.style.backgroundColor = "gold";
    } else {
      button.style.backgroundColor = "white";
    }
  });
});

const btnRandom = document.querySelector(".random");
btnRandom.addEventListener("click", () => {
  currentBackgroundColourFlag = false;
  randomColourFlag = true;
  let buttons = document.querySelectorAll(".sketch-control>button");
  buttons.forEach((button) => {
    if (button.classList.contains("random")) {
      button.style.backgroundColor = "gold";
    } else {
      button.style.backgroundColor = "white";
    }
  });
});

const btnReset = document.querySelector(".reset");
btnReset.addEventListener("click", () => {
  let rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    row.style.backgroundColor = "#bfbfbf";
  });
  let columns = document.querySelectorAll(".column");
  columns.forEach((column) => column.parentNode.removeChild(column));
  drawGrid(size);
  draw(currentBackgroundColour);
  let buttons = document.querySelectorAll(".sketch-control>button");
  buttons.forEach((button) => {
    if (button.classList.contains("reset")) {
      button.style.backgroundColor = "gold";
    } else {
      button.style.backgroundColor = "white";
    }
  });
});

const btnErase = document.querySelector(".erase");
btnErase.addEventListener("click", () => {
  currentBackgroundColourFlag = false;
  randomColourFlag = false;
  eraserFlag = true;
  let buttons = document.querySelectorAll(".sketch-control>button");
  buttons.forEach((button) => {
    if (button.classList.contains("erase")) {
      button.style.backgroundColor = "gold";
    } else {
      button.style.backgroundColor = "white";
    }
  });
});

function draw() {
  const cells = document.querySelectorAll(".row");
  cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      if (currentBackgroundColourFlag) {
        event.target.style.backgroundColor = currentBackgroundColour;
      } else if (randomColourFlag) {
        let randomColour = `rgb(${random(0, 256)},${random(0, 256)},${random(
          0,
          256
        )})`;
        event.target.style.backgroundColor = randomColour;
      } else if (eraserFlag) {
        event.target.style.backgroundColor = DEFAULTCOLOR;
      }
      event.target.removeEventListener("mouseenter", mouseEnterHandler);
      event.target.removeEventListener("mouseleave", mouseLeaveHandler);
    });
  });
}

drawGrid(size);
draw();
