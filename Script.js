let currentBackgroundColour = "rgb(0,0,0)";
let currentBackgroundColourFlag = true;
let randomColourFlag = false;
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
  console.log("CurrentColourFlag: ", currentBackgroundColourFlag);
  console.log("RandomColourFlag: ", randomColourFlag);
});

const btnRandom = document.querySelector(".random");
btnRandom.addEventListener("click", () => {
  currentBackgroundColourFlag = false;
  randomColourFlag = true;
  console.log("CurrentColourFlag: ", currentBackgroundColourFlag);
  console.log("RandomColourFlag: ", randomColourFlag);
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
      }
      event.target.removeEventListener("mouseenter", mouseEnterHandler);
      event.target.removeEventListener("mouseleave", mouseLeaveHandler);
    });
  });
}

drawGrid(size);
draw();
