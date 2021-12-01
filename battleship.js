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
  }
}

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
          { locations: ["14", "24", "34"], hits: ["", "", ""] },
          { locations: ["00", "01", "02"], hits: ["", "", ""] }],
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var locations = ship.locations;
      var index = locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if(this.isSunk(ship)){
          view.displayMessage("You sank my bottleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMiss("You missed.");
    return false;
  },
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  }
};


var controller = {
  guesses: 0,
  processGuess: function(guess) {
    var alphbet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.lenght !== 2) {
      alert("Oops, please enter a letter and a number on the board.");
    } else {
      firstChar = guess.charAt(0);
      var row = alphbet.indexOf(firstChar);
      var column = guess.CharAt(1);

      if(isNaN(row) || isNaN(column)) {
        alert ("Oops, that isn't on the board.");
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      }
    }
  }
}