import { Ship } from "./ship";

//Create the class for the gameboard that will store the ships
class Gameboard {
  #theGrid; //The grid that has the position fo the ships
  #totalShips; //The total of ships in the grid

  //Constructor
  constructor() {
    //The grid is an array
    this.#theGrid = [];
    //For loop that makes the grid an array of 10 * 10
    for (let i = 0; i < 10; i++) {
      //Select the index of the array
      this.#theGrid[i] = [];
      //For loop that creates 10 elements in the array
      for (let j = 0; j < 10; j++) {
        //Every element starts with a zero
        this.#theGrid[i][j] = 0;
      }
    }
    //Set the total of ships as zero
    this.#totalShips = 0;
  }

  //Return the grid
  get getGrid() {
    return this.#theGrid;
  }

  //Function that places a ship in the grid
  placeShip(theShip, coordinateStart, coordinateFinish) {
    //Store the ship in a new variable
    let s = theShip;
    //Variables to keep track of the coordinates
    let x = 0;
    let y = 0;
    //Variable that tells if the while loop is in the first iteration
    let first = true;
    //Check if the two coordinates do not match, because to put a ship in horizontal and vertical way you need one parte of the coordinate finish and start to be the same
    //and also check if the coordinates are inside the grid
    if (
      (coordinateStart[0] !== coordinateFinish[0] &&
        coordinateStart[1] !== coordinateFinish[1]) ||
      coordinateStart[0] < 0 ||
      coordinateStart[1] < 0 ||
      coordinateFinish[0] < 0 ||
      coordinateFinish[1] < 0 ||
      coordinateStart[0] > 9 ||
      coordinateStart[1] > 9 ||
      coordinateFinish[0] > 9 ||
      coordinateFinish[1] > 9
    ) {
      //Throw an error
      return "Error";
    }

    //Check if the coordinate "x" is the same in the start and finish, meaning the ship is place vertically
    if (coordinateStart[0] === coordinateFinish[0]) {
      //Check if coordinate "y" in the start is bigger than the end, meaning the ship is place from top to bottom
      if (coordinateStart[1] > coordinateFinish[1]) {
        //Check if the coordinates match the size of the ship
        if (
          coordinateStart[1] - coordinateFinish[1] + 1 < s.getLength ||
          coordinateStart[1] - coordinateFinish[1] + 1 > s.getLength
        ) {
          //Throw an error
          return "Error";
        }

        //The value of the coordinate "y" is at the start
        y = coordinateStart[1];
        //While loop that continues until "y" is lesser than the coordinate finish
        while (y >= coordinateFinish[1]) {
          //Check if the space of the grid is not a zero
          if (this.#theGrid[coordinateStart[0]][y] !== 0) {
            //Another ship exist in this coordinate
            this.#anotherShipExists(
              coordinateStart,
              [coordinateStart[0], y + 1],
              first,
            );
            return "Error";
          }
          //Put the variable of the ship in the coordinate that correspond to it
          this.#theGrid[coordinateStart[0]][y] = s;
          //Coordinate "y" goes one space down
          y -= 1;
          //The first loop of the while finish
          first = false;
        }
        //Increase the total of ships
        this.#totalShips += 1;
      } else {
        //Check if the coordinates match the size of the ship
        if (
          coordinateFinish[1] - coordinateStart[1] + 1 < s.getLength ||
          coordinateFinish[1] - coordinateStart[1] + 1 > s.getLength
        ) {
          //Throw an error
          return "Error";
        }

        //The value of the coordinate "y" is at the start
        y = coordinateStart[1];
        //While loop that continues until "y" is bigger than the coordinate finish
        while (y <= coordinateFinish[1]) {
          //Check if the space of the grid is not a zero
          if (this.#theGrid[coordinateStart[0]][y] !== 0) {
            //Another ship exist in this coordinate
            this.#anotherShipExists(
              coordinateStart,
              [coordinateStart[0], y - 1],
              first,
            );
            return "Error";
          }
          //Put the variable of the ship in the coordinate that correspond to it
          this.#theGrid[coordinateStart[0]][y] = s;
          //Coordinate "y" goes one space up
          y += 1;
          //The first loop of the while finish
          first = false;
        }
        //Increase the total of ships
        this.#totalShips += 1;
      }
    } else {
      //Check if coordinate "x" in the start is bigger than the end, meaning the ship is place right to left
      if (coordinateStart[0] > coordinateFinish[0]) {
        //Check if the coordinates match the size of the ship
        if (
          coordinateStart[0] - coordinateFinish[0] + 1 < s.getLength ||
          coordinateStart[0] - coordinateFinish[0] + 1 > s.getLength
        ) {
          //Throw an error
          return "Error";
        }

        //The value of the coordinate "x" is at the start
        x = coordinateStart[0];
        //While loop that continues until "x" is lesser than the coordinate finish
        while (x >= coordinateFinish[0]) {
          //Check if the space of the grid is not a zero
          if (this.#theGrid[x][coordinateFinish[1]] !== 0) {
            //Another ship exist in this coordinate
            this.#anotherShipExists(
              coordinateStart,
              [x + 1, coordinateFinish[1]],
              first,
            );
            return "Error";
          }
          //Put the variable of the ship in the coordinate that correspond to it
          this.#theGrid[x][coordinateFinish[1]] = s;
          //Coordinate "x" goes one space to the left
          x -= 1;
          //The first loop of the while finish
          first = false;
        }
        //Increase the total of ships
        this.#totalShips += 1;
      } else {
        //Check if the coordinates match the size of the ship
        if (
          coordinateFinish[0] - coordinateStart[0] + 1 < s.getLength ||
          coordinateFinish[0] - coordinateStart[0] + 1 > s.getLength
        ) {
          //Throw an error
          return "Error";
        }

        //The value of the coordinate "x" is at the start
        x = coordinateStart[0];
        //While loop that continues until "x" is bigger than the coordinate finish
        while (x <= coordinateFinish[0]) {
          //Check if the space of the grid is not a zero
          if (this.#theGrid[x][coordinateFinish[1]] !== 0) {
            //Another ship exist in this coordinate
            this.#anotherShipExists(
              coordinateStart,
              [x - 1, coordinateFinish[1]],
              first,
            );
            return "Error";
          }
          //Put the variable of the ship in the coordinate that correspond to it
          this.#theGrid[x][coordinateFinish[1]] = s;
          //Coordinate "x" goes one space to the right
          x += 1;
          //The first loop of the while finish
          first = false;
        }
        //Increase the total of ships
        this.#totalShips += 1;
      }
    }
  }

  //Function that handles the logic if another ship was in the coordinates in the placing of the ship
  #anotherShipExists(origin, actual, firstMove) {
    //Check if the first move is false, meaning that it was trigger at one moment in the while
    if (firstMove === false) {
      //Variables for the coordinate "x" and "y"
      let x = 0;
      let y = 0;

      //Check if the origin "x" and actual "x" are the same, meaning the ship was place vertically
      if (origin[0] === actual[0]) {
        //Check if the start "y" is bigger than the finish "y", meaning the ship was place from top to bottom
        if (origin[1] > actual[1]) {
          //Variable "y" equal to the coordinate before the coordinate with the other ship
          y = actual[1];
          //While loop that stops when "y" is bigger than the start coordinate
          while (y <= origin[1]) {
            //Set the coordinate as zero
            this.#theGrid[origin[0]][y] = 0;
            //Go one space up
            y += 1;
          }

          //The ship was place from bottom to top
        } else {
          //Variable "y" equal to the starting coordinate
          y = origin[1];
          //While loop that stops when "y" is bigger than the coordinate before the coordinate with the other ship
          while (y <= actual[1]) {
            //Set the coordinate as zero
            this.#theGrid[origin[0]][y] = 0;
            //Go one space up
            y += 1;
          }
        }

        //The ship was place horizontally
      } else {
        //Check if the start "x" is bigger than the finish "x", meaning the ship was place from right to left
        if (actual[0] > origin[0]) {
          //Variable "x" equal to the coordinate before the coordinate with the other ship
          x = actual[0];
          //While loop that stops when "x" is bigger than the start coordinate
          while (x <= origin[0]) {
            //Set the coordinate as zero
            this.#theGrid[x][origin[1]] = 0;
            //Go one space to the right
            x += 1;
          }

          //The ship was place from left to right
        } else {
          //Variable "x" equal to the starting coordinate
          x = origin[0];
          //While loop that stops when "x" is bigger than the coordinate before the coordinate with the other ship
          while (x <= actual[0]) {
            //Set the coordinate as zero
            this.#theGrid[x][origin[1]] = 0;
            //Go one space to the right
            x += 1;
          }
        }
      }
      //Throw an error
      return "Error";

      //If the function was trigger in the first loop of while
    } else {
      //Throw an error
      return "Error";
    }
  }

  //Function that receives two coordinates and establish if it was a hit or a miss
  receiveAttack(coordinateX, coordinateY) {
    if (
      coordinateX > 9 ||
      coordinateY > 9 ||
      coordinateX < 0 ||
      coordinateY < 0
    ) {
      return "That space does not exist";
    }
    //Check if the coordinate is a zero
    if (this.#theGrid[coordinateX][coordinateY] === 0) {
      //Set the place as a miss
      this.#theGrid[coordinateX][coordinateY] = "M";
      return "M";

      //Check if the coordinate already has a letter
    } else if (
      this.#theGrid[coordinateX][coordinateY] === "M" ||
      this.#theGrid[coordinateX][coordinateY] === "A"
    ) {
      return "You already hit in here";

      //The coordinate has a ship
    } else {
      //Make a new variable that is equal to the ship in the coordinate
      let theShip = this.#theGrid[coordinateX][coordinateY];
      //Change the value of the coordinate as "A", meaning there was a hit
      this.#theGrid[coordinateX][coordinateY] = "A";
      //Call the hit function for the ship
      theShip.hit();

      //Check if the ship is sunk
      if (theShip.getSunk === true) {
        //Decrease the number of ships in the gameboard
        this.#totalShips -= 1;
        //Check if the total of ships is zero
        if (this.#totalShips === 0) {
          //All the ships has been sunk
          return `All the ships have been sunk`;
        } else {
          //Only one ship was sunk
          return theShip.getLength;
        }
      }
      return "A";
    }
  }

  cleanGameboard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.#theGrid[i][j] = 0;
      }
    }
    this.#totalShips = 0;
  }

}

export { Gameboard };
