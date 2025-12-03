import "./style.css";
import { Ship } from "./ship";
import { Player } from "./player";

function userInterface() {
  const createGrid = (theEvent) => {
    const playerGrid = document.getElementById("realGrid1");
    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        let aBox = document.createElement("button");
        aBox.id = `[${j},${i}]`;
        playerGrid.append(aBox);
      }
    }

    const gridAttacks = document.getElementById("realGrid2");
    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        let bBox = document.createElement("button");
        bBox.id = `[A,${j},${i}]`;
        bBox.addEventListener("click", theEvent);
        bBox.style.cursor = "pointer";
        gridAttacks.append(bBox);
      }
    }
  };

  const placeShipRender = (coordinateStart, coordinateFinish, theId) => {
    let theElement = 0;
    //Variables to keep track of the coordinates
    let x = 0;
    let y = 0;
    //Check if the coordinate "x" is the same in the start and finish, meaning the ship is place vertically
    if (coordinateStart[0] === coordinateFinish[0]) {
      //Check if coordinate "y" in the start is bigger than the end, meaning the ship is place from top to bottom
      if (coordinateStart[1] > coordinateFinish[1]) {
        //The value of the coordinate "y" is at the start
        y = coordinateStart[1];
        //While loop that continues until "y" is lesser than the coordinate finish
        while (y >= coordinateFinish[1]) {
          let ship = document.createElement("button");
          ship.id = theId;
          //Put the variable of the ship in the coordinate that correspond to it
          theElement = document.getElementById(`[${coordinateStart[0]},${y}]`);
          theElement.append(ship);
          //Coordinate "y" goes one space down
          y -= 1;
        }
      } else {
        //The value of the coordinate "y" is at the start
        y = coordinateStart[1];
        //While loop that continues until "y" is bigger than the coordinate finish
        while (y <= coordinateFinish[1]) {
          let ship = document.createElement("button");
          ship.id = theId;
          //Put the variable of the ship in the coordinate that correspond to it
          theElement = document.getElementById(`[${coordinateStart[0]},${y}]`);
          theElement.append(ship);
          //Coordinate "y" goes one space up
          y += 1;
        }
      }
    } else {
      //Check if coordinate "x" in the start is bigger than the end, meaning the ship is place right to left
      if (coordinateStart[0] > coordinateFinish[0]) {
        //The value of the coordinate "x" is at the start
        x = coordinateStart[0];
        //While loop that continues until "x" is lesser than the coordinate finish
        while (x >= coordinateFinish[0]) {
          let ship = document.createElement("button");
          ship.id = theId;
          //Put the variable of the ship in the coordinate that correspond to it
          theElement = document.getElementById(`[${x},${coordinateFinish[1]}]`);
          theElement.append(ship);
          //Coordinate "x" goes one space to the left
          x -= 1;
        }
      } else {
        //The value of the coordinate "x" is at the start
        x = coordinateStart[0];
        //While loop that continues until "x" is bigger than the coordinate finish
        while (x <= coordinateFinish[0]) {
          let ship = document.createElement("button");
          ship.id = theId;
          //Put the variable of the ship in the coordinate that correspond to it
          theElement = document.getElementById(`[${x},${coordinateFinish[1]}]`);
          theElement.append(ship);
          //Coordinate "x" goes one space to the right
          x += 1;
        }
      }
    }
  };

  const putAttack = (id, symbol) => {
    let theElement = document.getElementById(id);
    if (symbol === "A") {
      theElement.style.backgroundColor = "red";
    }
    theElement.textContent = symbol;
  };

  const turnText = (theName) => {
    let theChangeText = document.getElementById("theText");
    theChangeText.textContent = `It is the turn of the ${theName}...`;
  };

  return { createGrid, placeShipRender, putAttack, turnText };
}

function theGame() {
  const realPlayer = new Player("Human");
  const theComputer = new Player("Computer");
  let thePBoard = realPlayer.getGameBoard;
  let theCBoard = theComputer.getGameBoard;
  const fiveSizeShipPlayer = new Ship(5, 0, false);
  const fourSizeShipPlayer = new Ship(4, 0, false);
  const threeSizeShip1Player = new Ship(3, 0, false);
  const threeSizeShip2Player = new Ship(3, 0, false);
  const twoSizeShipPlayer = new Ship(2, 0, false);
  const fiveSizeShipComputer = new Ship(5, 0, false);
  const fourSizeShipComputer = new Ship(4, 0, false);
  const threeSizeShip1Computer = new Ship(3, 0, false);
  const threeSizeShip2Computer = new Ship(3, 0, false);
  const twoSizeShipComputer = new Ship(2, 0, false);

  //   const theInterface = userInterface();

  const createGrid = (theEvent, theInterface) => {
    theInterface.createGrid(theEvent);
  };

  const placeShips = (theInterface) => {
    thePBoard.placeShip(fiveSizeShipPlayer, [3, 7], [3, 3]);
    theInterface.placeShipRender([3, 7], [3, 3], "ship5");
    thePBoard.placeShip(fourSizeShipPlayer, [6, 7], [9, 7]);
    theInterface.placeShipRender([6, 7], [9, 7], "ship4");
    thePBoard.placeShip(threeSizeShip1Player, [7, 2], [7, 4]);
    theInterface.placeShipRender([7, 2], [7, 4], "ship3");
    thePBoard.placeShip(threeSizeShip2Player, [1, 5], [1, 7]);
    theInterface.placeShipRender([1, 5], [1, 7], "ship3");
    thePBoard.placeShip(twoSizeShipPlayer, [3, 1], [4, 1]);
    theInterface.placeShipRender([3, 1], [4, 1], "ship2");
    theCBoard.placeShip(fiveSizeShipComputer, [3, 2], [7, 2]);
    theCBoard.placeShip(fourSizeShipComputer, [5, 6], [5, 9]);
    theCBoard.placeShip(threeSizeShip1Computer, [7, 6], [7, 8]);
    theCBoard.placeShip(threeSizeShip2Computer, [3, 5], [3, 7]);
    theCBoard.placeShip(twoSizeShipComputer, [1, 5], [2, 5]);
  };

  const getAttack = (
    theActivePlayer,
    theInterface,
    coordinateStart,
    coordinateFinish,
    theId,
  ) => {
    let whatHappen = theCBoard.receiveAttack(coordinateStart, coordinateFinish);
    // console.log("Human what happen ", whatHappen);
    let changeEvent = document.getElementById("theEvents");
    if (whatHappen === "M") {
      theInterface.putAttack(theId, "M");
      changeEvent.textContent = "The " + theActivePlayer + " miss";
    } else if (whatHappen === "A") {
      theInterface.putAttack(theId, "A");
      changeEvent.textContent = "The " + theActivePlayer + " hit a ship";
    } else if (typeof whatHappen === "number") {
      theInterface.putAttack(theId, "A");
      alert("You sunk a ship");
    } else {
      theInterface.putAttack(theId, "A");
      alert("You win");
    }
  };

  const computerAttack = (theInterface, coordinateX, coordinateY) => {
    let whatHappen = thePBoard.receiveAttack(coordinateX, coordinateY);
    console.log("Computer what happen ", whatHappen);
    if (whatHappen !== "You already hit in here") {
      let changeEvent = document.getElementById("theEvents");
      if (whatHappen === "M") {
        changeEvent.textContent =
          "The computer miss in " + "[" + coordinateX + "," + coordinateY + "]";
        return false;
      } else if (whatHappen === "A") {
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        changeEvent.textContent =
          "The computer hit a ship in " +
          "[" +
          coordinateX +
          "," +
          coordinateY +
          "]";
        return false;
      } else if (typeof whatHappen === "number") {
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        alert("The computer sunk a ship");
        return false;
      } else {
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        alert("The computer win");
        return false;
      }
    }
    return true;
  };

  return { placeShips, createGrid, getAttack, computerAttack };
}

function gameController() {
  const theActualGame = theGame();
  const theInterface = userInterface();
  theActualGame.createGrid(theEvent, theInterface);
  theActualGame.placeShips(theInterface);

  let players = [
    {
      theName: "Human",
    },
    {
      theName: "Computer",
    },
  ];

  let activePlayer = players[0];

  const changeTurns = () => {
    if (activePlayer.theName === players[0].theName) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
    theInterface.turnText(activePlayer.theName);
  };

  function theEvent() {
    if (activePlayer.theName === players[0].theName) {
      let theCoordinate = this.id;
      theActualGame.getAttack(
        activePlayer.theName,
        theInterface,
        theCoordinate[3],
        theCoordinate[5],
        theCoordinate,
      );
      changeTurns();
      if (activePlayer.theName === players[1].theName) {
        computerTurn();
      }
    }
  }

  const computerTurn = () => {
    let theContinue = true;
    while (theContinue === true) {
      let coordinateX = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      let coordinateY = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      console.log("CoordinateX", coordinateX);
      console.log("CoordinateY", coordinateY);
      theContinue = theActualGame.computerAttack(
        theInterface,
        coordinateX,
        coordinateY,
      );
    }
    changeTurns();
  };
}

gameController();
