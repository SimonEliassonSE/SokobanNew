let totalCounts = 0;
const element = document.querySelector("#count");
let currentPlayerXPosition = 11;
let currentPlayerYPosition = 11;

function createGameBoard() {
  document.getElementById("container").style.display = "grid";
  document.getElementById("container").style.gridTemplateRows =
    "repeat(16, 55px)";
  document.getElementById("container").style.gridTemplateColumns =
    "repeat(19, 55px)";

  for (let y = 0; y < tileMap01.height; y++) {
    for (let x = 0; x < tileMap01.width; x++) {
      let map = document.createElement("div");
      let tileId = x + "," + y;
      map.id = tileId;

      if (tileMap01.mapGrid[y][x][0] === "W") {
        map.classList.add(Tiles.Wall);
      } else if (tileMap01.mapGrid[y][x][0] === "B") {
        map.classList.add(Entities.Block);
      } else if (tileMap01.mapGrid[y][x][0] === "P") {
        map.classList.add(Entities.Character);
      } else if (tileMap01.mapGrid[y][x][0] === "G") {
        map.classList.add(Tiles.Goal);
      } else {
        map.classList.add(Tiles.Space);
      }

      document.getElementById("container").appendChild(map);
    }
  }
}
createGameBoard();

document.addEventListener(
  "keydown",
  (event) => {
    event.preventDefault();
    if (event.repeat) return;

    totalCounts++;
    element.innerHTML = totalCounts + "";

    let xMove = 0;
    let yMove = 0;

    switch (event.key) {
      case "ArrowUp":
        yMove = -1;
        break;
      case "ArrowDown":
        yMove = 1;
        break;
      case "ArrowLeft":
        xMove = -1;
        break;
      case "ArrowRight":
        xMove = 1;
        break;
    }

    function checkFinishedBlocks() {
      let allFinishedBlocks = document.getElementsByClassName(
        "tile-goal entity-block"
      ).length;
      console.log(allFinishedBlocks);
      if (allFinishedBlocks === 6) {
        alert("Well done, you won!");
      }
    }

    let newPXcord = currentPlayerXPosition + xMove;
    let newPYcord = currentPlayerYPosition + yMove;

    if (
      document
        .getElementById(`${newPXcord},${newPYcord}`)
        .classList.contains(Tiles.Wall)
    ) {
      return;
    }

    if (
      document
        .getElementById(`${newPXcord},${newPYcord}`)
        .classList.contains(Entities.Block)
    ) {
      if (
        document
          .getElementById(`${newPXcord + xMove},${newPYcord + yMove}`)
          .classList.contains(Entities.Block) ||
        document
          .getElementById(`${newPXcord + xMove},${newPYcord + yMove}`)
          .classList.contains(Tiles.Wall)
      ) {
        return;
      }
      document
        .getElementById(`${newPXcord},${newPYcord}`)
        .classList.remove(Entities.Block);
      document
        .getElementById(`${newPXcord + xMove},${newPYcord + yMove}`)
        .classList.add(Entities.Block);
    }

    document
      .getElementById(`${currentPlayerXPosition},${currentPlayerYPosition}`)
      .classList.remove(Entities.Character);

    document
      .getElementById(`${newPXcord},${newPYcord}`)
      .classList.add(Entities.Character);
    currentPlayerXPosition = newPXcord;
    currentPlayerYPosition = newPYcord;
    checkFinishedBlocks();
  },
  false
);
