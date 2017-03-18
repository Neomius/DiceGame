
var json = {
  meta: {
    size: 4
  },
};

var turn = "&#9856";

var charArray = ["&#9856",
                "&#9857",
                "&#9858",
                "&#9859",
                "&#9860",
                "&#9861",
                "&#9862"]

var gridValue = 0;

function defaultDice(){
  return dice("Normal", 1, 1, "#FFF", "&#9856") 
}


function createDefaultJsonDice(){
  var dice = {
    type: "normal",
    numValue: 1,
    numberOfMarks: 1,
    color: "#FFF",
    charCode: "&#9856"
  }
  return dice;
}


function fnLoad() {
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
        var prevTurn;
        if ((targetElement.className).indexOf("disabled") == -1) {
            targetElement.innerHTML = turn;
            targetElement.classList.add('disabled');
            targetElement.classList.add(turn);

            prevTurn = turn;
            turn = turn === "&#9856" ? "&#9857" : "&#9856";

        }
    }
}

//Generate new game
function fnNewGame() {
    var gameUL = document.getElementById("game");
    
    //Reset eventual running game by clearing game HTML
    if (gameUL.innerHTML !== '') {
        gameUL.innerHTML = null;

        turn = "&#9856";
        gridValue = 0;

        json = {
          meta: {
            size: 4
          },
        };
    }


    //Read game data from JSON model
    gridValue = json.meta.size;
    
    //Generate game
    var i, j, li, k = 0,
        classLists;
    var gridAdd = +gridValue + 1;
    json["game"] = {};

    for (i = 1; i <= gridValue; i += 1) {
        json.game["row" + i] = {}; //Add table row to json
        tr = document.createElement('tr'); //create new table row
        for (j = 1; j <= gridValue; j += 1) {
            k += 1;
            json.game["row" + i]["col" + j] ={}; // Add table cell 
            json.game["row" + i]["col" + j]["dice"] = createDefaultJsonDice(); //Add default dice
            li = document.createElement('td'); //Create new cell
            li.setAttribute("id", 'li' + k); // Set attribute id=lik

            classLists = 'td row' + i + ' col' + j; //Set attribute td and rowi and colj

            if (i === j) {
                classLists = 'td row' + i + ' col' + j + ' dia0'; //Set attribute for diagonal /
            }

            if ((i + j) === gridAdd) {
                classLists = 'td row' + i + ' col' + j + ' dia1'; //Set attribute for diagonal \
            }

            if (!isEven(gridValue) && (Math.round(gridValue / 2) === i && Math.round(gridValue / 2) === j))
                classLists = 'td row' + i + ' col' + j + ' dia0 dia1'; //Set attribute for diagonal \ and /

            li.className = classLists;
            tr.appendChild(li);


        }
        gameUL.appendChild(tr);
        console.log(json);
    }
}


function isEven(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
}


