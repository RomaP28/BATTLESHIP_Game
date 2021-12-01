//view принимает данные из объкта model и выводит на экран корабли и сообщения;
var view = {
  displayMessage: function (msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

// model моделирует поле, позицию кораблей получает данные из объкта controller данные если игрок попал или промахнулся и отправляет данные в объект view для графического отображения;
var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    { locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] },
  ],
  fire: function (guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var locations = ship.locations;
      var index = locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          view.displayMessage("You sank my bottleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },
  isSunk: function (ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
};
//conroller принимает ввод игрока расшифровывает и отправляет в объект model;
var controller = {
  guesses: 0,
  parseGuess: function (guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
      alert("Oops, please enter a letter and a number on the board.");
    } else {
      firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert("Oops, that isn't on the board.");
      } else if (
        row < 0 ||
        row >= model.boardSize ||
        column < 0 ||
        column >= model.boardSize
      ) {
        alert("Oops, that's off the board.");
      } else {
        return row + column;
      }
    }
    return null;
  },
};

// console.log(controller.parseGuess("A0"));
// console.log(controller.parseGuess("B6"));
// console.log(controller.parseGuess("G3"));
// console.log(controller.parseGuess("H0"));
// console.log(controller.parseGuess("A7"));
