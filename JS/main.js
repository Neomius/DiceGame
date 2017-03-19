
var defaultGameData = {
  meta: { 
    size: 4,
    validDices: 
              [  "",
                "&#9856",
                "&#9857",
                "&#9858",
                "&#9859",
                "&#9860",
                "&#9861"],

  validColors:
              [ "",
                "&#9856",
                "&#9857",
                "&#9858",
                "&#9859",
                "&#9860",
                "&#9861"]
  }
};
var gameData = {};


var charArray = [
                "",
                "&#9856",
                "&#9857",
                "&#9858",
                "&#9859",
                "&#9860",
                "&#9861",]

var gridValue = 0;

function createDefaultJsonDice(id){
  var dice = {
                type: "normal",
                numValue: 0,
                numberOfMarks: 0,
                color: "#FFF",
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
        var col = (id-1) % gameData.meta.size +1;
        var row = (id - col) / gameData.meta.size + 1;
        
        var currentCharCode = gameData.game["row" + row]["col" + col]["dice"].charCode;
        var i = (charArray.indexOf(currentCharCode)+1) % charArray.length;
        targetElement.innerHTML = charArray[i]; 
        gameData.game["row" + row]["col" + col]["dice"].charCode = charArray[i];

        //TODO Use Shift click to be able to change the color of dices. Example code below.
        //Shift = Loop backwards
        //Ctrl = Change color
        //Alt = ????
        //Shift+Ctrl = Loop colors backwards

        /*
        $(selector).click(function(e) {
          if(e.shiftKey) {
            //Shift-Click
          }
          if(e.ctrlKey) {
            //Ctrl+Click
          }
          if(e.altKey) {
            //Alt+Click
          }
        });
        */        
    }
}

//Generate new game
function fnNewGame() {
    var gameUL = document.getElementById("game");
    
    //Reset eventual running game by clearing game HTML
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
            gameData.game["row" + i]["col" + j] ={}; // Add table cell to GameData
            gameData.game["row" + i]["col" + j]["dice"] = createDefaultJsonDice((i-1)*gameData.meta.size + j); //Add default dice with id
            li = document.createElement('td'); //Create new cell
            li.setAttribute("id", 'li' + k); // Set attribute id=lik
            li.innerHTML = gameData.game["row" + i]["col" + j]["dice"].charCode;

            classLists = 'td row' + i + ' col' + j; //Set attribute td and rowi and colj

            li.className = classLists;
            tr.appendChild(li);
        }
        gameUL.appendChild(tr);
        console.log(gameData);
    }
}



