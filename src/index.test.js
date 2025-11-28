import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

//Variables to check
const theShip1 = new Ship(3, 0, false);
const theShip2 = new Ship(2, 0, false);
const theGameboard = new Gameboard();

//Test for the ship class
test("The ship 1 receives a hit", () => {
  theShip1.hit();
  expect(theShip1.getTBH).toBe(1);
});

test("The ship 2 receives a hit", () => {
  theShip2.hit();
  expect(theShip2);
});

test("The ship 1 is sunk", () => {
  theShip1.hit();
  theShip1.hit();
  expect(theShip1.getSunk).toBe(true);
});

test("The ship 2 is sunk", () => {
  theShip2.hit();
  expect(theShip2.getSunk).toBe(true);
});

//Create new ships
const theShip3 = new Ship(3, 0, false);
const theShip4 = new Ship(2, 0, false);
const theShip5 = new Ship(4, 0, false);
const theShip6 = new Ship(3, 0, false);

//Tests to check the gameboard placeShip function
test("The Ship 3 in coordinate start [5,5] and final [5,3]", () => {
  theGameboard.placeShip(theShip3, [5, 5], [5, 3]);
  let theGrid = theGameboard.getGrid;
  expect(theGrid[5][5].getLength).toBe(3);
  expect(theGrid[5][4].getLength).toBe(3);
  expect(theGrid[5][3].getLength).toBe(3);
});

test("The Ship 4 in coordinate start [3,3] and final [2,3]", () => {
  theGameboard.placeShip(theShip4, [3, 3], [2, 3]);
  let theGrid = theGameboard.getGrid;
  expect(theGrid[3][3].getLength).toBe(2);
  expect(theGrid[2][3].getLength).toBe(2);
});

test("The Ship 5 coordinates are smaller than his length in start [0,10] and final [1,10]", () => {
  expect(() => theGameboard.placeShip(theShip5, [0, 10], [1, 10])).toThrow(
    Error,
  );
});

test("The Ship 5 in coordinate start [1,4] and final [-2,4] cannot be possible", () => {
  expect(() => theGameboard.placeShip(theShip5, [1, 4], [-2, 4])).toThrow(
    Error,
  );
});

test("The Ship 5 can not be put diagonally in coordinate start [7,7] and final [10,10]", () => {
  expect(() => theGameboard.placeShip(theShip5, [7, 7], [10, 10])).toThrow(
    Error,
  );
});

test("The Ship 5 can not be put diagonally in coordinate start [7,7] and final [8,6]", () => {
  expect(() => theGameboard.placeShip(theShip5, [7, 7], [8, 6])).toThrow(Error);
});

test("The Ship 5 can not be put diagonally in coordinate start [7,7] and final [6,8]", () => {
  expect(() => theGameboard.placeShip(theShip5, [7, 7], [6, 8])).toThrow(Error);
});

test("The Ship 5 can not be put diagonally in coordinate start [9,7] and final [7,5]", () => {
  expect(() => theGameboard.placeShip(theShip5, [9, 7], [7, 5])).toThrow(Error);
});

test("The Ship 5 can not be put diagonally in coordinate start [0,0] and final [3,3]", () => {
  expect(() => theGameboard.placeShip(theShip5, [0, 0], [3, 3])).toThrow(Error);
});

test("The Ship 5 can not be put in random coordinates start [3,4] and final [7,4]", () => {
  expect(() => theGameboard.placeShip(theShip5, [3, 4], [7, 4])).toThrow(Error);
});

test("The Ship 5 can not be put in coordinates already in use in coordinate start [1,3] and final [4,3]", () => {
  expect(() => theGameboard.placeShip(theShip5, [1, 3], [4, 3])).toThrow(Error);
});

test("The Ship 5 error of putting him in an existing coordinate erase the already put pointers", () => {
  let theGrid = theGameboard.getGrid;
  expect(theGrid[1][3]).toBe(0);
  expect(theGrid[2][3].getLength).toBe(2);
  expect(theGrid[3][3].getLength).toBe(2);
  expect(theGrid[4][3]).toBe(0);
});

test("The Ship 5 can not be put in coordinates already in use in coordinate start [5,7] and final [5,4]", () => {
  expect(() => theGameboard.placeShip(theShip5, [5, 7], [5, 4])).toThrow(Error);
});

test("The Ship 5 error of putting him in an existing coordinate erase the already put pointers", () => {
  let theGrid = theGameboard.getGrid;
  expect(theGrid[5][7]).toBe(0);
  expect(theGrid[5][6]).toBe(0);
  expect(theGrid[5][5].getLength).toBe(3);
  expect(theGrid[5][4].getLength).toBe(3);
});

test("The Ship 5 can not be put in coordinates already in use in coordinate start [5,5] and final [5,2]", () => {
  expect(() => theGameboard.placeShip(theShip5, [5, 5], [5, 2])).toThrow(Error);
});

test("The Ship 6 error of putting him in an existing coordinate erase the already put pointers", () => {
  let theGrid = theGameboard.getGrid;
  expect(theGrid[5][5].getLength).toBe(3);
  expect(theGrid[5][4].getLength).toBe(3);
  expect(theGrid[5][3].getLength).toBe(3);
  expect(theGrid[5][2]).toBe(0);
});

test("The Ship 5 in coordinate start [3,1] and final [6,1]", () => {
  theGameboard.placeShip(theShip5, [3, 1], [6, 1]);
  let theGrid = theGameboard.getGrid;
  expect(theGrid[3][1].getLength).toBe(4);
  expect(theGrid[4][1].getLength).toBe(4);
  expect(theGrid[5][1].getLength).toBe(4);
  expect(theGrid[6][1].getLength).toBe(4);
});

test("The Ship 6 in coordinate start [2,7] and final [2,9]", () => {
  theGameboard.placeShip(theShip6, [2, 7], [2, 9]);
  let theGrid = theGameboard.getGrid;
  expect(theGrid[2][7].getLength).toBe(3);
  expect(theGrid[2][8].getLength).toBe(3);
  expect(theGrid[2][9].getLength).toBe(3);
});

//Test for the gameboard function of receiveAttack
test("An attack miss send to [6,9]", () => {
  expect(theGameboard.receiveAttack(6, 9)).toBe("You miss");
  let theGrid = theGameboard.getGrid;
  expect(theGrid[6][9]).toBe("M");
});

test("An attack miss send to [8,7]", () => {
  expect(theGameboard.receiveAttack(8, 7)).toBe("You miss");
  let theGrid = theGameboard.getGrid;
  expect(theGrid[8][7]).toBe("M");
});

test("An attack miss send to [8,3]", () => {
  expect(theGameboard.receiveAttack(8, 3)).toBe("You miss");
  let theGrid = theGameboard.getGrid;
  expect(theGrid[8][3]).toBe("M");
});

test("An attack miss send to [3,6]", () => {
  expect(theGameboard.receiveAttack(3, 6)).toBe("You miss");
  let theGrid = theGameboard.getGrid;
  expect(theGrid[3][6]).toBe("M");
});

test("An attack hit send to [2,3]", () => {
  expect(theGameboard.receiveAttack(2, 3)).toBe("You hit a ship!");
  let theGrid = theGameboard.getGrid;
  expect(theGrid[2][3]).toBe("A");
  expect(theGrid[3][3].getTBH).toBe(1);
});

test("An attack hit send to [2,9]", () => {
  expect(theGameboard.receiveAttack(2, 9)).toBe("You hit a ship!");
  let theGrid = theGameboard.getGrid;
  expect(theGrid[2][9]).toBe("A");
  expect(theGrid[2][8].getTBH).toBe(1);
});

test("The misses are record correctly", () => { 
  let theGrid = theGameboard.getGrid;
  expect(theGrid[3][6]).toBe("M");
  expect(theGrid[6][9]).toBe("M");
  expect(theGrid[8][7]).toBe("M");
  expect(theGrid[8][3]).toBe("M");
});

//Tests to check for sunken ships
test("Sink the ship 5", () => {
  theGameboard.receiveAttack(3,1);
  theGameboard.receiveAttack(4,1);
  theGameboard.receiveAttack(5,1);
  expect(theGameboard.receiveAttack(6,1)).toBe("You sunk a ship of 4 spaces");
  let theGrid = theGameboard.getGrid;
  expect(theGrid[3][1]).toBe("A");
  expect(theGrid[4][1]).toBe("A");
  expect(theGrid[5][1]).toBe("A");
  expect(theGrid[6][1]).toBe("A");
});

test("Sink the ship 3", () => {
  theGameboard.receiveAttack(5,5);
  theGameboard.receiveAttack(5,4);
  expect(theGameboard.receiveAttack(5,3)).toBe("You sunk a ship of 3 spaces");
  let theGrid = theGameboard.getGrid;
  expect(theGrid[5][5]).toBe("A");
  expect(theGrid[5][4]).toBe("A");
  expect(theGrid[5][3]).toBe("A");
});

test("All the ships have been sunk", () => {
  theGameboard.receiveAttack(3,3);
  theGameboard.receiveAttack(2,8);
  expect(theGameboard.receiveAttack(2,7)).toBe("All the ships have been sunk");
});
