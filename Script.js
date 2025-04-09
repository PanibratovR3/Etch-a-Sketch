function drawGrid(size) {
  let screen = document.querySelector(".sketch-screen");
  for (let i = 0; i < size; i++) {
    let column = document.createElement("div");
    column.classList.add("column");
    for (let j = 0; j < size; j++) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.style.border = "2px solid black";
      row.addEventListener("mouseenter", (event) =>
        event.target.classList.toggle("hover")
      );
      row.addEventListener("mouseleave", (event) => {
        event.target.classList.toggle("default");
      });
      column.appendChild(row);
    }
    screen.appendChild(column);
  }
}

drawGrid(10);

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
  }
});
