let currentBackgroundColour = "rgb(0,0,0)";
let currentBackgroundColourFlag = true;
let randomColourFlag = false;
function mouseEnterHandler(event) {
  event.target.classList.toggle("hover");
}

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
  let gridSize = parseInt(prompt("Enter the size of grid.", "100"));
  console.log(gridSize);
  if (isNaN(gridSize)) {
    alert("Error! Number was not entered.");
  } else if (gridSize > 100 || gridSize < 1) {
    alert("Error! Number must be between 1 and 100.");
  } else {
    let columns = document.querySelectorAll(".column");
    columns.forEach((column) => column.parentNode.removeChild(column));
    drawGrid(gridSize);
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
drawGrid(10);
draw();

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
