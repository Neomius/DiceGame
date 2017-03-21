
var defaultGameData = {
  meta: {
    size: 4,
    validDices:
    ["",
      "&#9856",
      "&#9857",
      "&#9858",
      "&#9859",
      "&#9860",
      "&#9861"],

    validColors:
    ["#FFFFFF",
      "#CC0000",
      "#00CC00",
      "#0000CC"]
  }
}

var gameData = {};
var gridValue = 0;

function createDefaultJsonDice(id) {
  var dice = {
    type: "normal",
    numValue: 0,
    numberOfMarks: 0,
    color: "#FFFFFF",
    charCode: "",
    id: id
  }
  return dice;
}


function fnLoad() {
  gameData = defaultGameData;
  addEvent(document.getElementById("game"), "click", fnChoose); //Add listener for click on tiles
  fnNewGame();
}

function addEvent(element, eventName, callback) {
  if (element.addEventListener) {
    element.addEventListener(eventName, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventName, callback);
  }
}

//Handle click and update game
function fnChoose(e) {
  if (e.target && e.target.nodeName == "TD") {
    var targetElement = document.getElementById(e.target.id);
    var id = targetElement.id;
    id = id.slice(2);
    var col = (id - 1) % gameData.meta.size + 1;
    var row = (id - col) / gameData.meta.size + 1;
    var shift = e.shiftKey;
    var ctrl = e.ctrlKey;
    var alt = e.altKey;
    var modifier = (e.shiftKey === true) ? -1 : 1;

    if (e.ctrlKey) {
        var currentColor = gameData.game["row" + row]["col" + col]["dice"].color;
        var colorIndex = (gameData.meta.validColors.indexOf(currentColor) + modifier + gameData.meta.validColors.length) % gameData.meta.validColors.length;
        targetElement.style.backgroundColor = gameData.meta.validColors[colorIndex];
        gameData.game["row" + row]["col" + col]["dice"].color = gameData.meta.validColors[colorIndex];
    } else {
      var currentCharCode = gameData.game["row" + row]["col" + col]["dice"].charCode;
      var i = (gameData.meta.validDices.indexOf(currentCharCode) + modifier + gameData.meta.validDices.length) % gameData.meta.validDices.length;
      targetElement.innerHTML = gameData.meta.validDices[i];
      gameData.game["row" + row]["col" + col]["dice"].charCode = gameData.meta.validDices[i];
    }
  }
}

//Generate new game
function fnNewGame() {
  var gameUL = document.getElementById("game");
  var answer = document.getElementById("answer");

  //Reset potential running game by clearing game HTML and resteting GameData
  if (gameUL.innerHTML !== '') {
    gameUL.innerHTML = null;
    gridValue = 0;
    gameData = defaultGameData;
  }


  //Read game data from JSON model
  gridValue = gameData.meta.size;

  //Generate game
  var i, j, li, k = 0,
    classLists;

  gameData["game"] = {};

  for (i = 1; i <= gridValue; i += 1) {
    gameData.game["row" + i] = {}; //Add table row to json
    tr = document.createElement('tr'); //create new table row
    for (j = 1; j <= gridValue; j += 1) {
      k += 1;
      gameData.game["row" + i]["col" + j] = {}; // Add table cell to GameData
      gameData.game["row" + i]["col" + j]["dice"] = createDefaultJsonDice((i - 1) * gameData.meta.size + j); //Add default dice with id
      li = document.createElement('td'); //Create new cell
      li.setAttribute("id", 'li' + k); // Set attribute id=lik
      li.innerHTML = gameData.game["row" + i]["col" + j]["dice"].charCode;

      classLists = 'td row' + i + ' col' + j; //Set attribute td and rowi and colj

      li.className = classLists;
      tr.appendChild(li);
    }
    gameUL.appendChild(tr);
    console.log(gameData);

    //answer.innerHTML = updateAnswer();
  }
}
/*
function updateAnswer(){
  var answer = 0;
  for (var i = 0; i < gameData.meta.size; i++){
    for (var j = 0; i < gameData.meta.size; i++){
      answer = answer + diceValue(gameData.game["row" + i]["col" + j]["dice"].charCode);
    }
  }
  return answer;
}

function diceValue(charCode){
switch(charCode) {
    case "":
        return 0;
        break;
    case "&#9856":
        return 1;
        break;
    case "&#9857":
        return 2;
        break;
    case "&#9858":
        return 3;
        break;
    case "&#9859":
        return 4;
        break;
    case "&#9860":
        return 5;
        break;
    case "&#9861":
        return 6;
        break;
    default:
        return 0;
  }

}
  */



