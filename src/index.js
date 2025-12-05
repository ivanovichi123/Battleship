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

  const initializeButtons = (startEvent, restartEvent) => {
    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    startButton.style.cursor = "pointer";
    restartButton.style.cursor = "pointer";
    startButton.addEventListener("click", startEvent);
    restartButton.addEventListener("click", restartEvent);
  };

  const cleanGrid = () => {
    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        let restartSquare = document.getElementById(`[${j},${i}]`);
        restartSquare.textContent = "";
        restartSquare.style.backgroundColor = "white";
      }
    }

    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        let restartSquare = document.getElementById(`[A,${j},${i}]`);
        restartSquare.textContent = "";
        restartSquare.style.backgroundColor = "white";
      }
    }
  }

  return {
    createGrid,
    placeShipRender,
    putAttack,
    turnText,
    initializeButtons,
    cleanGrid,
  };
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
  let shipsList = [fiveSizeShipPlayer, fourSizeShipPlayer, threeSizeShip1Player, threeSizeShip2Player, twoSizeShipPlayer]
  const fiveSizeShipComputer = new Ship(5, 0, false);
  const fourSizeShipComputer = new Ship(4, 0, false);
  const threeSizeShip1Computer = new Ship(3, 0, false);
  const threeSizeShip2Computer = new Ship(3, 0, false);
  const twoSizeShipComputer = new Ship(2, 0, false);
  let computerShipsList = [fiveSizeShipComputer, fourSizeShipComputer, threeSizeShip1Computer, threeSizeShip2Computer, twoSizeShipComputer];

  const createGrid = (theEvent, theInterface) => {
    theInterface.createGrid(theEvent);
  };

  const placeShips = (theInterface) => {
    for(let i = 0; i < 5; i++) {
    let coordinateBegin = prompt(`Put the coordinates of beginning for the ship of ${shipsList[i].getLength} spaces (xy -> 52), the vertical squares are axis x, and the horizontal are axis y`, "55");
    let coordinateFinish = prompt(`Put the coordinates of finish for the ship of ${shipsList[i].getLength} spaces (xy -> 54), the vertical squares are axis x, and the horizontal are axis y`, "57");

    if(coordinateBegin > 99 || coordinateBegin < 0 || coordinateFinish > 99 || coordinateFinish < 0) {
      coordinateBegin = prompt(`Put VALID coordinates of beginning for the ship of ${shipsList[i].getLength} spaces (xy -> 52), the vertical squares are axis x, and the horizontal are axis y`, "55");
      coordinateFinish = prompt(`Put VALID coordinates of finish for the ship of ${shipsList[i].getLength} spaces (xy -> 54), the vertical squares are axis x, and the horizontal are axis y`, "57");
    }

    if(coordinateBegin === null || coordinateFinish === null) {
      return true;
    }

    let coordinateBeginGood = [Number(coordinateBegin[0]), Number(coordinateBegin[1])];
    let coordinateFinishGood = [Number(coordinateFinish[0]), Number(coordinateFinish[1])];
    let checkErrors = thePBoard.placeShip(shipsList[i], coordinateBeginGood, coordinateFinishGood);

    while(checkErrors === "Error") {
      coordinateBegin = prompt(`AN ERROR HAPPEN, please put valid coordinates of beginning for the ship of ${shipsList[i].getLength} spaces (xy -> 52), the vertical squares are axis x, and the horizontal are axis y`, "55");
      coordinateFinish = prompt(`AN ERROR HAPPEN, please put valid coordinates of finish for the ship of ${shipsList[i].getLength} spaces (xy -> 54), the vertical squares are axis x, and the horizontal are axis y`, "57");

      if(coordinateBegin === null || coordinateFinish === null) {
      return true;
      }

      coordinateBeginGood = [Number(coordinateBegin[0]), Number(coordinateBegin[1])];
      coordinateFinishGood = [Number(coordinateFinish[0]), Number(coordinateFinish[1])];
      checkErrors = thePBoard.placeShip(shipsList[i], coordinateBeginGood, coordinateFinishGood);
    }

    theInterface.placeShipRender(coordinateBeginGood, coordinateFinishGood, `ship${shipsList[i].getLength}`);
    }



    for(let i = 0; i < 5; i++) {
      let goodCoordinates = 0
      let checkErrors = 0;
      do {
        goodCoordinates = calculateCoordinates(computerShipsList[i].getLength);
        checkErrors = theCBoard.placeShip(computerShipsList[i], goodCoordinates[0], goodCoordinates[1])
      } while (checkErrors === "Error");
      console.log(`Start coordinate for ${computerShipsList[i].getLength}`, goodCoordinates[0]);
      console.log(`Finish coordinate for ${computerShipsList[i].getLength}`, goodCoordinates[1]);


    }

    // theCBoard.placeShip(fiveSizeShipComputer, [3, 2], [7, 2]);
    // theCBoard.placeShip(fourSizeShipComputer, [5, 6], [5, 9]);
    // theCBoard.placeShip(threeSizeShip1Computer, [7, 6], [7, 8]);
    // theCBoard.placeShip(threeSizeShip2Computer, [3, 5], [3, 7]);
    // theCBoard.placeShip(twoSizeShipComputer, [1, 5], [2, 5]);

    return false;
  };

  const getAttack = (
    theActivePlayer,
    theInterface,
    coordinateStart,
    coordinateFinish,
    theId,
  ) => {
    let whatHappen = theCBoard.receiveAttack(coordinateStart, coordinateFinish);
    let changeEvent = document.getElementById("theEvents");
    if (whatHappen === "M") {
      theInterface.putAttack(theId, "M");
      changeEvent.textContent = "The " + theActivePlayer + " miss";
      return "a";
    } else if (whatHappen === "A") {
      theInterface.putAttack(theId, "A");
      changeEvent.textContent = "The " + theActivePlayer + " hit a ship";
      return "a";
    } else if (typeof whatHappen === "number") {
      theInterface.putAttack(theId, "A");
      changeEvent.textContent = "You sunk a ship!!";
      return "a";
    } else {
      theInterface.putAttack(theId, "A");
      changeEvent.textContent = "The " + theActivePlayer + " WIN!!";
      return "Win";
    }
  };

  const computerAttack = (theInterface, coordinateX, coordinateY) => {
    let whatHappen = thePBoard.receiveAttack(coordinateX, coordinateY);
    if (whatHappen !== "You already hit in here") {
      let changeEvent = document.getElementById("theEvents");
      if (whatHappen === "M") {
        changeEvent.textContent =
          "The computer miss in " + "[" + coordinateX + "," + coordinateY + "]";
        return [false, true];
      } else if (whatHappen === "A") {
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        changeEvent.textContent =
          "The computer hit a ship in " +
          "[" +
          coordinateX +
          "," +
          coordinateY +
          "]";
        return [false, true];
      } else if (typeof whatHappen === "number") {
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        changeEvent.textContent = "The computer sunk a ship";
        return [false, true];
      } else {
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        changeEvent.textContent = "The computer WIN!!";
        return [false, false];
      }
    }
    return [true, false];
  };

  const cleanGrids = (theInterface) => {
    thePBoard.cleanGameboard();
    theCBoard.cleanGameboard();
    fiveSizeShipPlayer.restart();
    fourSizeShipPlayer.restart();
    threeSizeShip1Player.restart();
    threeSizeShip2Player.restart();
    twoSizeShipPlayer.restart();
    fiveSizeShipComputer.restart();
    fourSizeShipComputer.restart();
    threeSizeShip1Computer.restart();
    threeSizeShip2Computer.restart();
    twoSizeShipComputer.restart();
    theInterface.cleanGrid();
  }

  const calculateCoordinates = (length) => {
    let startCoordinate = randomNumbers(9, 0);
    let finishCoordinate = 0;
    let upCoordinate = [startCoordinate[0], startCoordinate[1] + (length - 1)];
    let downCoordinate = [startCoordinate[0], startCoordinate[1] - (length - 1)];
    let rightCoordinate = [startCoordinate[0] + (length - 1), startCoordinate[1]];
    let leftCoordinate = [startCoordinate[0] - (length - 1), startCoordinate[1]];
    let coordinateList = [upCoordinate,downCoordinate,rightCoordinate, leftCoordinate];
    let goodCoordinateList = [];
    for(let i = 0; i < 4; i++) {
      if(coordinateList[i][0] < 10 && coordinateList[i][1] < 10 && coordinateList[i][0] >= 0 && coordinateList[i][1] >= 0) {
        goodCoordinateList.push(coordinateList[i]);
      }
    }
    let newNumbers = randomNumbers(goodCoordinateList.length - 1, 0);
    finishCoordinate = goodCoordinateList[newNumbers[0]];
    return [startCoordinate, finishCoordinate];
  }

  const randomNumbers = (max, min) => {
    let coordinateX = Math.floor(Math.random() * (max - min + 1) + min);
    let coordinateY = Math.floor(Math.random() * (max - min + 1) + min);
    return [coordinateX, coordinateY];
  }

  return { placeShips, createGrid, getAttack, computerAttack, cleanGrids };
}

function gameController() {
  const theActualGame = theGame();
  const theInterface = userInterface();
  theActualGame.createGrid(theEvent, theInterface);
  let activeGame = false;
  let theRestart = true;

  theInterface.initializeButtons(startEvent, restartEvent);


  let players = [
    {
      theName: "Human",
    },
    {
      theName: "Computer",
    },
  ];

  let activePlayer = players[0];

  const startGame = () => {
    let checkError = theActualGame.placeShips(theInterface);
    if(checkError === true) {
      return true;
    }
    activePlayer = players[0];
    return false;
  };

  const changeTurns = () => {
    if (activePlayer.theName === players[0].theName) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
    theInterface.turnText(activePlayer.theName);
  };

  function startEvent() {
      if (activeGame === false && theRestart === true) {
      let checkError = startGame();
      if(checkError === true) {
        return;
      }
      theRestart = false;
      let theText = document.getElementById("theText");
      theText.textContent = "It is the turn of the Human";
      let theEvent = document.getElementById("theEvents");
      theEvent.textContent = "Waiting for your move";
      activeGame = true;
    }
  }

  function restartEvent() {
    if (activeGame === true || theRestart === false) {
      theRestart = true;
      theActualGame.cleanGrids(theInterface);
      activeGame = false;
      let theEvent = document.getElementById("theEvents");
      theEvent.textContent = "Waiting (You need to click in start)...";
      let theText = document.getElementById("theText");
      theText.textContent = "";
    }
  };


  function theEvent() {
    if (activePlayer.theName === players[0].theName && activeGame === true) {
      let theCoordinate = this.id;
      let theCoordinateText = document.getElementById(this.id);
      if (
        theCoordinateText.textContent !== "M" &&
        theCoordinateText.textContent !== "A"
      ) {
        let theResult = theActualGame.getAttack(
          activePlayer.theName,
          theInterface,
          theCoordinate[3],
          theCoordinate[5],
          theCoordinate,
        );
        if (theResult === "Win") {
          activeGame = false;
          return;
        }
        changeTurns();
        if (activePlayer.theName === players[1].theName) {
          computerTurnDelay();
        }
      }
    }
  }

  const computerTurn = () => {
    let theContinue = [true, false];
    while (theContinue[0] === true) {
      let coordinateX = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      let coordinateY = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      theContinue = theActualGame.computerAttack(
        theInterface,
        coordinateX,
        coordinateY,
      );
    }
    if(theContinue[1] === false) {
      activeGame = false;
      return;
    }
    changeTurns();
  };

  const computerTurnDelay = () => {
    setTimeout(() => {
      computerTurn();
    }, 1000);
  };
}

gameController();

//CAMBIOS POR HACER
//PASO 1: QUITAR ALERTS QUE TODO SEA TEXTO -- HECHO
//PASO 2: HACER QUE LA COMPUTADORA TARDE 2 SEGUNDOS EN PENSAR -- HECHO
//PASO 3: EVITAR QUE SE PUEDA PICAR MIENTRAS LA COMPUTADORA PIENSA, O PANELES CON MISS Y ATACK --HECHO
//PASO 4: EVITAR QUE SE PUEDA PICAR DOS VECES UN ESPACIO --HECHO
//PASO 5: DARLE FUNCIONALIDAD AL BOTON DE START Y RESTART (CUANDO SE GANE QUE SE DESHABILITEN LOS EVENT LISTENER) --EN PROCESO
//PASO 6: HACER PRUEBA PARA QUE LA COMPUTADORA GANE
//PASO 7: YA SE PUEDE CONTINUAR AL PASO 5 DE ODIN PROJECT
