class Gameboard {
  #theGrid;

  constructor() {
    this.#theGrid = [];
    for (let i = 0; i < 10; i++) {
      this.#theGrid[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#theGrid[i][j] = 0;
      }
    }
  }

  get getGrid() {
    return this.#theGrid;
  }

  placeShip(theShip, coordinateStart, coordinateFinish) {
    let s = theShip;
    let x = 0;
    let y = 0;
    if(coordinateStart[0] !== coordinateFinish[0] && coordinateStart[1] !== coordinateFinish[1] || coordinateStart[0] < 0 || coordinateStart[1] < 0 || coordinateFinish[0] < 0 || coordinateFinish[1] < 0) {
      throw new Error("Oh no");
    }
    if (coordinateStart[0] === coordinateFinish[0]) {
      if (coordinateStart[1] > coordinateFinish[1]) {
        if (
          coordinateStart[1] - coordinateFinish[1] + 1 < s.getLength ||
          coordinateStart[1] - coordinateFinish[1] + 1 > s.getLength
        ) {
          throw new Error("Oh no");
        }
        y = coordinateStart[1];
        while (y >= coordinateFinish[1]) {
          if(this.#theGrid[coordinateStart[0]][y] !== 0) {
            this.#anotherShipExists(coordinateStart, [coordinateStart[0], y + 1]);
            return;
          }
          this.#theGrid[coordinateStart[0]][y] = s;
          y -= 1;
        }
      } else {
        if (
          coordinateFinish[1] - coordinateStart[1] + 1 < s.getLength ||
          coordinateFinish[1] - coordinateStart[1] + 1 > s.getLength
        ) {
          throw new Error("Oh no");
        }
        y = coordinateStart[1];
        while (y <= coordinateFinish[1]) {
          if(this.#theGrid[coordinateStart[0]][y] !== 0) {
            this.#anotherShipExists(coordinateStart, [coordinateStart[0], y - 1]);
            return;
          }
          this.#theGrid[coordinateStart[0]][y] = s;
          y += 1;
        }
      }
    } else {
      if (coordinateStart[0] > coordinateFinish[0]) {
        if (
          coordinateStart[0] - coordinateFinish[0] + 1 < s.getLength ||
          coordinateStart[0] - coordinateFinish[0] + 1 > s.getLength
        ) {
          throw new Error("Oh no");
        }
        x = coordinateStart[0];
        while (x >= coordinateFinish[0]) {
          if(this.#theGrid[x][coordinateFinish[1]] !== 0) {
            this.#anotherShipExists(coordinateStart, [x + 1, coordinateFinish[1]]);
            return;
          }
          this.#theGrid[x][coordinateFinish[1]] = s;
          x -= 1;
        }
      } else {
        if (
          coordinateFinish[0] - coordinateStart[0] + 1 < s.getLength ||
          coordinateFinish[0] - coordinateStart[0] + 1 > s.getLength
        ) {
          throw new Error("Oh no");
        }
        x = coordinateStart[0];
        while (x <= coordinateFinish[0]) {
          if(this.#theGrid[x][coordinateFinish[1]] !== 0) {
            this.#anotherShipExists(coordinateStart, [x - 1, coordinateFinish[1]]);
            return;
          }
          this.#theGrid[x][coordinateFinish[1]] = s;
          x += 1;
        }
      }
    }
  }







  #anotherShipExists(origin, actual) {
    console.log(origin);
    console.log(actual);
    let x = 0;
    let y = 0;
    if (origin[0] === actual[0]) {
      if (origin[1] > actual[1]) {
        y = actual[1];
        while (y <= origin[1]) {
          this.#theGrid[origin[0]][y] = 0;
          y += 1;
        }
      } else {
        y = origin[1];
        while (y <= actual[1]) {
          this.#theGrid[origin[0]][y] = 0;
          y += 1;
        }
      }
    } else {
      if (actual[0] > origin[0]) {
        x = actual[0];
        while (x <= origin[0]) {
          this.#theGrid[x][origin[1]] = 0;
          x += 1;
        }
      } else {
        x = origin[0];
        while (x <= actual[0]) {
          this.#theGrid[x][origin[1]] = 0;
          x += 1;
        }
      }
    }
    throw new Error ("Oh no");
  }
}

export { Gameboard };
