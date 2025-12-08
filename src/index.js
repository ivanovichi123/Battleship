import "./style.css";
import { Ship } from "./ship.js";
import { Player } from "./player.js";

//Function that changes the DOM
function userInterface() {
  //Function that creates the grids
  const createGrid = (theEvent) => {
    //Select the space for the grid of the ships of the player
    const playerGrid = document.getElementById("realGrid1");

    //For loops that creates the grid elements
    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        //Create a square of the grid
        let aBox = document.createElement("button");
        //Set the id
        aBox.id = `[${j},${i}]`;
        //Append the square
        playerGrid.append(aBox);
      }
    }

    //Select the grid that displays the attacks of the player
    const gridAttacks = document.getElementById("realGrid2");

    //For loops that creates the grid elements
    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        //Create a square of the grid
        let bBox = document.createElement("button");
        //Set the id
        bBox.id = `[A,${j},${i}]`;
        //Add an event listener
        bBox.addEventListener("click", theEvent);
        //Establish the style to change the cursor
        bBox.style.cursor = "pointer";
        //Append the square
        gridAttacks.append(bBox);
      }
    }
  };

  //Function that renders the ship in the grid of the player
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

  //Function that renders the attack in the grid for attacks
  const putAttack = (id, symbol) => {
    //Select the square that receives the attack
    let theElement = document.getElementById(id);
    //Check if a ship was hit
    if (symbol === "A") {
      theElement.style.backgroundColor = "red";
    }
    //Change the text
    theElement.textContent = symbol;
  };

  //Function that changes the text for the next player
  const turnText = (theName) => {
    //Select the element
    let theChangeText = document.getElementById("theText");
    //Change the name
    theChangeText.textContent = `It is the turn of the ${theName}...`;
  };

  //Functions that renders the buttons for start and restart
  const initializeButtons = (startEvent, restartEvent) => {
    //Select the buttons
    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    //Change the style to change the cursor
    startButton.style.cursor = "pointer";
    restartButton.style.cursor = "pointer";
    //Add their respective event listener
    startButton.addEventListener("click", startEvent);
    restartButton.addEventListener("click", restartEvent);
  };

  //Function that cleans the grids
  const cleanGrid = () => {
    //For loops that goes through every square in the player grid
    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        //Get the element
        let restartSquare = document.getElementById(`[${j},${i}]`);
        //Set their default style
        restartSquare.textContent = "";
        restartSquare.style.backgroundColor = "white";
      }
    }

    //For loops that goes through every square in the attack grid
    for (let i = 9; i >= 0; i--) {
      for (let j = 0; j < 10; j++) {
        //Get the element
        let restartSquare = document.getElementById(`[A,${j},${i}]`);
        //Set their default element
        restartSquare.textContent = "";
        restartSquare.style.backgroundColor = "white";
      }
    }
  };

  //Return the functions
  return {
    createGrid,
    placeShipRender,
    putAttack,
    turnText,
    initializeButtons,
    cleanGrid,
  };
}

//Functions that controls the game
function theGame() {
  //Create the player and their respective boards
  const realPlayer = new Player("Human");
  const theComputer = new Player("Computer");
  let thePBoard = realPlayer.getGameBoard;
  let theCBoard = theComputer.getGameBoard;

  //Create the ships of the human player
  const fiveSizeShipPlayer = new Ship(5, 0, false);
  const fourSizeShipPlayer = new Ship(4, 0, false);
  const threeSizeShip1Player = new Ship(3, 0, false);
  const threeSizeShip2Player = new Ship(3, 0, false);
  const twoSizeShipPlayer = new Ship(2, 0, false);
  //Make a list to contain the ships
  let shipsList = [
    fiveSizeShipPlayer,
    fourSizeShipPlayer,
    threeSizeShip1Player,
    threeSizeShip2Player,
    twoSizeShipPlayer,
  ];

  //Create the ship of the computer
  const fiveSizeShipComputer = new Ship(5, 0, false);
  const fourSizeShipComputer = new Ship(4, 0, false);
  const threeSizeShip1Computer = new Ship(3, 0, false);
  const threeSizeShip2Computer = new Ship(3, 0, false);
  const twoSizeShipComputer = new Ship(2, 0, false);
  //Make a list to contain the ships
  let computerShipsList = [
    fiveSizeShipComputer,
    fourSizeShipComputer,
    threeSizeShip1Computer,
    threeSizeShip2Computer,
    twoSizeShipComputer,
  ];

  //Function that creates the grid
  const createGrid = (theEvent, theInterface) => {
    //Call the interface to make the grid
    theInterface.createGrid(theEvent);
  };

  //Function that receives the coordinates to place the ships
  const placeShips = (theInterface) => {
    //For loop that goes through every ship
    for (let i = 0; i < 5; i++) {
      //Prompts that receive the coordinates for finish and start
      let coordinateBegin = prompt(
        `Put the coordinates of beginning for the ship of ${shipsList[i].getLength} spaces (xy -> 52), the vertical squares are axis x, and the horizontal are axis y`,
        "55",
      );
      let coordinateFinish = prompt(
        `Put the coordinates of finish for the ship of ${shipsList[i].getLength} spaces (xy -> 54), the vertical squares are axis x, and the horizontal are axis y`,
        "57",
      );

      //Check if the coordinates are valid (The grid is 10 * 10, so the values must be smaller than 99 and bigger than 0)
      if (
        coordinateBegin > 99 ||
        coordinateBegin < 0 ||
        coordinateFinish > 99 ||
        coordinateFinish < 0
      ) {
        //If the coordinates are not valid, call the prompts another time
        coordinateBegin = prompt(
          `Put VALID coordinates of beginning for the ship of ${shipsList[i].getLength} spaces (xy -> 52), the vertical squares are axis x, and the horizontal are axis y`,
          "55",
        );
        coordinateFinish = prompt(
          `Put VALID coordinates of finish for the ship of ${shipsList[i].getLength} spaces (xy -> 54), the vertical squares are axis x, and the horizontal are axis y`,
          "57",
        );
      }

      //Check if the prompts were cancel
      if (coordinateBegin === null || coordinateFinish === null) {
        return true;
      }

      //Change the values of the strings receive to numbers
      let coordinateBeginGood = [
        Number(coordinateBegin[0]),
        Number(coordinateBegin[1]),
      ];
      let coordinateFinishGood = [
        Number(coordinateFinish[0]),
        Number(coordinateFinish[1]),
      ];

      //Place the ship and store the return value to see if there was an error
      let checkErrors = thePBoard.placeShip(
        shipsList[i],
        coordinateBeginGood,
        coordinateFinishGood,
      );

      //While loop that repeats if there was an error placing the ship
      while (checkErrors === "Error") {
        //Call again the prompts
        coordinateBegin = prompt(
          `AN ERROR HAPPEN, please put valid coordinates of beginning for the ship of ${shipsList[i].getLength} spaces (xy -> 52), the vertical squares are axis x, and the horizontal are axis y`,
          "55",
        );
        coordinateFinish = prompt(
          `AN ERROR HAPPEN, please put valid coordinates of finish for the ship of ${shipsList[i].getLength} spaces (xy -> 54), the vertical squares are axis x, and the horizontal are axis y`,
          "57",
        );

        //Check if one of the prompts were cancel
        if (coordinateBegin === null || coordinateFinish === null) {
          return true;
        }

        //Change the values of the strings receive to numbers
        coordinateBeginGood = [
          Number(coordinateBegin[0]),
          Number(coordinateBegin[1]),
        ];
        coordinateFinishGood = [
          Number(coordinateFinish[0]),
          Number(coordinateFinish[1]),
        ];

        //Place the ship and store the return value to see if there was an error
        checkErrors = thePBoard.placeShip(
          shipsList[i],
          coordinateBeginGood,
          coordinateFinishGood,
        );
      }

      //Call the interface to render the ship in the grid
      theInterface.placeShipRender(
        coordinateBeginGood,
        coordinateFinishGood,
        `ship${shipsList[i].getLength}`,
      );
    }

    //For loop that places the ship of the computer
    for (let i = 0; i < 5; i++) {
      //Variables for the coordinates and to check for errors
      let goodCoordinates = 0;
      let checkErrors = 0;

      //Do while that get the coordinates and check if there was an error
      do {
        //Get the coordinates for the start and end
        goodCoordinates = calculateCoordinates(computerShipsList[i].getLength);
        //Place the ship and store the return value
        checkErrors = theCBoard.placeShip(
          computerShipsList[i],
          goodCoordinates[0],
          goodCoordinates[1],
        );
        //Repeat the loop if there was an error
      } while (checkErrors === "Error");

      console.log(
        `Start coordinate for ${computerShipsList[i].getLength}`,
        goodCoordinates[0],
      );
      console.log(
        `Finish coordinate for ${computerShipsList[i].getLength}`,
        goodCoordinates[1],
      );
    }
    return false;
  };

  //Function that receive the attack of the player
  const getAttack = (
    theActivePlayer,
    theInterface,
    coordinateStart,
    coordinateFinish,
    theId,
  ) => {
    //Call the gameboard function and store the result
    let whatHappen = theCBoard.receiveAttack(coordinateStart, coordinateFinish);
    //Get the element that communicates the events
    let changeEvent = document.getElementById("theEvents");

    //Check if the attack was a miss
    if (whatHappen === "M") {
      //Call the interface to change the square of the grid
      theInterface.putAttack(theId, "M");
      //Change the event message
      changeEvent.textContent = "The " + theActivePlayer + " miss";
      return "a";

      //Check if the attack hit a ship
    } else if (whatHappen === "A") {
      //Call the interface to change the square of the grid
      theInterface.putAttack(theId, "A");
      //Change the event message
      changeEvent.textContent = "The " + theActivePlayer + " hit a ship";
      return "a";

      //Check if the attack sunk a ship
    } else if (typeof whatHappen === "number") {
      //Call the interface to change the square of the grid
      theInterface.putAttack(theId, "A");
      //Change the event message
      changeEvent.textContent = "You sunk a ship!!";
      return "a";

      //If all the if`s are false, that means all the ships were sunk
    } else {
      //Call the interface to change the square of the grid
      theInterface.putAttack(theId, "A");
      //Change the event message
      changeEvent.textContent = "The " + theActivePlayer + " WIN!!";
      return "Win";
    }
  };

  //Function that receive the attack of the computer
  const computerAttack = (theInterface, coordinateX, coordinateY) => {
    //Call the gameboard function and store the return value
    let whatHappen = thePBoard.receiveAttack(coordinateX, coordinateY);

    //Check if the coordinates were already hit
    if (whatHappen !== "You already hit in here") {
      //Select the element that communicate the events
      let changeEvent = document.getElementById("theEvents");

      //Check if the attack was a miss
      if (whatHappen === "M") {
        //Change the event
        changeEvent.textContent =
          "The computer miss in " + "[" + coordinateX + "," + coordinateY + "]";
        //Return, the first value is if the coordinate was already use, and the second one if the computer has not win
        return [false, true];

        //Check if the attack hit a ship
      } else if (whatHappen === "A") {
        //Call the interface to render the attack
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        //Change the event
        changeEvent.textContent =
          "The computer hit a ship in " +
          "[" +
          coordinateX +
          "," +
          coordinateY +
          "]";
        //Return, the first value is if the coordinate was already use, and the second one if the computer has not win
        return [false, true];

        //Check if the attack sunk a ship
      } else if (typeof whatHappen === "number") {
        //Call the interface to render the attack
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        //Change the event
        changeEvent.textContent = "The computer sunk a ship";
        //Return, the first value is if the coordinate was already use, and the second one if the computer has not win
        return [false, true];

        //Check if the computer win
      } else {
        //Call the interface to render the attack
        theInterface.putAttack(`[${coordinateX},${coordinateY}]`, "A");
        //Change the event
        changeEvent.textContent = "The computer WIN!!";
        //Return, the first value is if the coordinate was already use, and the second one if the computer has not win
        return [false, false];
      }
    }
    //Return, the first value is if the coordinate was already use, and the second one if the computer has not win
    return [true, false];
  };

  //Function that reset the game
  const cleanGrids = (theInterface) => {
    //Restart the gameboard
    thePBoard.cleanGameboard();
    theCBoard.cleanGameboard();
    //Restart the ships
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
    //Restart the interface
    theInterface.cleanGrid();
  };

  //Function that creates the coordinates for the placement of the computer ships
  const calculateCoordinates = (length) => {
    //Get the start coordinate
    let startCoordinate = randomNumbers(9, 0);
    //Variable that stores the ned coordinate
    let finishCoordinate = 0;
    //Determine the coordinates for the four available directions
    let upCoordinate = [startCoordinate[0], startCoordinate[1] + (length - 1)];

    let downCoordinate = [
      startCoordinate[0],
      startCoordinate[1] - (length - 1),
    ];

    let rightCoordinate = [
      startCoordinate[0] + (length - 1),
      startCoordinate[1],
    ];

    let leftCoordinate = [
      startCoordinate[0] - (length - 1),
      startCoordinate[1],
    ];

    //Store the possible coordinates
    let coordinateList = [
      upCoordinate,
      downCoordinate,
      rightCoordinate,
      leftCoordinate,
    ];
    //Variable that stores the coordinates that can actually be use
    let goodCoordinateList = [];

    //For loop that check if the available coordinates stay in the grid
    for (let i = 0; i < 4; i++) {
      //Check if the coordinates stay in the 10 * 10 space
      if (
        coordinateList[i][0] < 10 &&
        coordinateList[i][1] < 10 &&
        coordinateList[i][0] >= 0 &&
        coordinateList[i][1] >= 0
      ) {
        //Save the coordinate in the good list
        goodCoordinateList.push(coordinateList[i]);
      }
    }
    //Get a random number base on the quantity of coordinates that can be use
    let newNumbers = randomNumbers(goodCoordinateList.length - 1, 0);
    //The finish coordinate is a random coordinate from the list
    finishCoordinate = goodCoordinateList[newNumbers[0]];
    //Return the start and end coordinate
    return [startCoordinate, finishCoordinate];
  };

  //Functions that creates two random numbers
  const randomNumbers = (max, min) => {
    //Create a random number that stays in the range
    let coordinateX = Math.floor(Math.random() * (max - min + 1) + min);
    let coordinateY = Math.floor(Math.random() * (max - min + 1) + min);
    //Return the two random numbers
    return [coordinateX, coordinateY];
  };

  //Return the functions
  return { placeShips, createGrid, getAttack, computerAttack, cleanGrids };
}

//Function that controls what happen in the game
function gameController() {
  //Store the function that controls the game
  const theActualGame = theGame();
  //Store the function that controls the interface
  const theInterface = userInterface();
  //Create the grid
  theActualGame.createGrid(theEvent, theInterface);
  //Establish that there is not an active game
  let activeGame = false;
  //Establish that the game is reset
  let theRestart = true;

  //Initialize the start and reset buttons
  theInterface.initializeButtons(startEvent, restartEvent);

  //Set the players and their names
  let players = [
    {
      theName: "Human",
    },
    {
      theName: "Computer",
    },
  ];

  //Set the active player as the human
  let activePlayer = players[0];

  //Function that starts the game
  const startGame = () => {
    //Call the game function that places the ships and store the return value
    let checkError = theActualGame.placeShips(theInterface);
    //Check if there was an error (The prompts were cancel)
    if (checkError === true) {
      return true;
    }
    //Establish the active player
    activePlayer = players[0];
    return false;
  };

  //Function that changes the turns
  const changeTurns = () => {
    //If the active player is the human change it to the computer
    if (activePlayer.theName === players[0].theName) {
      activePlayer = players[1];
      //If the active player is the computer change it to the human
    } else {
      activePlayer = players[0];
    }
    //Change the text that indicates the active player
    theInterface.turnText(activePlayer.theName);
  };

  //Function for the event listener of the start button
  function startEvent() {
    //Check if the game is inactive and if the game is in reset mode
    if (activeGame === false && theRestart === true) {
      //Set the restart as false, since a new game is beginning
      theRestart = false;
      //Set the game as active, since a new game is beginning
      activeGame = true;
      //Start the game and store the return value
      let checkError = startGame();

      //Check if there was an error (The prompts were cancel)
      if (checkError === true) {
        //Restart the grids
        restartEvent();
        return;
      }

      //Select the text
      let theText = document.getElementById("theText");
      //Change the text to establish the active player
      theText.textContent = "It is the turn of the Human";
      //Select the event text
      let theEvent = document.getElementById("theEvents");
      //Change the event text
      theEvent.textContent = "Waiting for your move";
    }
  }

  //Function for the event listener of the reset button
  function restartEvent() {
    //Check if the game is active or if the restart is false
    if (activeGame === true || theRestart === false) {
      //Establish the restart as true
      theRestart = true;
      //Reset the grids
      theActualGame.cleanGrids(theInterface);
      //The game is not active
      activeGame = false;
      //Select the event text
      let theEvent = document.getElementById("theEvents");
      //Change the text of the event
      theEvent.textContent = "Waiting (You need to click in start)...";
      //Select the text
      let theText = document.getElementById("theText");
      //Erase the content in the text
      theText.textContent = "";
    }
  }

  //Function for the event listener of the squares of the attack grid
  function theEvent() {
    //Check if the active player is the human and if the game is active
    if (activePlayer.theName === players[0].theName && activeGame === true) {
      //Get the id of the square
      let theCoordinate = this.id;
      //Select the coordinate to change its text
      let theCoordinateText = document.getElementById(this.id);
      //Check if the coordinate does not has been already use
      if (
        theCoordinateText.textContent !== "M" &&
        theCoordinateText.textContent !== "A"
      ) {
        //Call the function of the Game to receive the attack and store the return value
        let theResult = theActualGame.getAttack(
          activePlayer.theName,
          theInterface,
          theCoordinate[3],
          theCoordinate[5],
          theCoordinate,
        );
        //Check if the human player win the game
        if (theResult === "Win") {
          //The game is no longer active
          activeGame = false;
          return;
        }
        //Change turns
        changeTurns();

        //If the active player is now the computer call his attack
        if (activePlayer.theName === players[1].theName) {
          //Call the function for the attack of the computer
          computerTurnDelay();
        }
      }
    }
  }

  //Function that determines the coordinates of attack of the computer
  const computerTurn = () => {
    //Store an array with two values, the first one tells if the coordinates were already use and the second one if the computer has not win
    let theContinue = [true, false];

    //While loop that repeats if the coordinates were already use
    while (theContinue[0] === true) {
      //Create two random numbers
      let coordinateX = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      let coordinateY = Math.floor(Math.random() * (9 - 0 + 1) + 0);
      //Call the function for the computer attack and store the return value
      theContinue = theActualGame.computerAttack(
        theInterface,
        coordinateX,
        coordinateY,
      );
    }
    //Check if the computer has win
    if (theContinue[1] === false) {
      //The game is no longer active
      activeGame = false;
      return;
    }
    //Change turns
    changeTurns();
  };

  //Function that starts the attack of the computer
  const computerTurnDelay = () => {
    //Call the function that creates the coordinates after a pause of 1 second
    setTimeout(() => {
      computerTurn();
    }, 1000);
  };
}

//Call the function to start the page and the game
gameController();
