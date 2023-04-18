console.log("hello world");
//how to create an array in javascript?
//how to create a custom object in javascript?

var tile66 = {
    value1: 6,
    value2: 6
};
var tile65 = {
    value1: 6,
    value2: 5
};
var tile64 = {
    value1: 6,
    value2: 4
};
var tile63 = {
    value1: 6,
    value2: 3
};
var tile62 = {
    value1: 6,
    value2: 2
};
var tile61 = {
    value1: 6,
    value2: 1
};
var tile60 = {
    value1: 6,
    value2: 0
};
var tile55 = {
    value1: 5,
    value2: 5
};
var tile54 = {
    value1: 5,
    value2: 4
};
var tile53 = {
    value1: 5,
    value2: 3
};
var tile52 = {
    value1: 5,
    value2: 2
};
var tile51 = {
    value1: 5,
    value2: 1
};
var tile50 = {
    value1: 5,
    value2: 0
};
var tile44 = {
    value1: 4,
    value2: 4
};
var tile43 = {
    value1: 4,
    value2: 3
};
var tile42 = {
    value1: 4,
    value2: 2
};
var tile41 = {
    value1: 4,
    value2: 1
};
var tile40 = {
    value1: 4,
    value2: 0
};
var tile33 = {
    value1: 3,
    value2: 3
};
var tile32 = {
    value1: 3,
    value2: 2
};
var tile31 = {
    value1: 3,
    value2: 1
};
var tile30 = {
    value1: 3,
    value2: 0
};
var tile22 = {
    value1: 2,
    value2: 2
};
var tile21 = {
    value1: 2,
    value2: 1
};
var tile20 = {
    value1: 2,
    value2: 0
};
var tile11 = {
    value1: 1,
    value2: 1
};
var tile10 = {
    value1: 1,
    value2: 0
};
var tile00 = {
    value1: 0,
    value2: 0
};

var tileSet = [tile00, tile10, tile11, tile20, tile21, tile22, tile30, tile31, tile32, tile33,
    tile40, tile41, tile42, tile43, tile44, tile50, tile51, tile52, tile53, tile54, tile55,
    tile60, tile61, tile62, tile63, tile64, tile65, tile66];

function randomRange(myMin, myMax) {

    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
  
  }

var playerTiles = [];
var computerTiles = [];
var randomIndex = 0;

var auxTileSet = [];

//create aux copy of tileset for generating player and computer tiles
for(var i = 0; i <= 27; i++){
    auxTileSet.push(tileSet[i]);
}

function checkTile(id){
    var numbersArray = id.split('-');
    var tile = {
        value1: numbersArray[0],
        value2: numbersArray[1]
    }
    var isValid = false;
    if(tile.value1 === valueLeft || tile.value1 === valueRight
        || tile.value2 === valueLeft || tile.value2 === valueRight){
            isValid = true;
        }
    var noTilesPlayed = true;
    for(var i =0 ; i < tilesPlayed.length; i++){
        if(tilesPlayed[i] != null){
            noTilesPlayed = false;
        }
    }
    if(isValid || noTilesPlayed){
        return true;
    };
    return false;
}

function displayPlayerTile(tileToBeAdded){
    var lowerValue;
    var higherValue;
    var tileFileName = "";
    console.log(tileToBeAdded.value1);
    console.log(tileToBeAdded.value2);
    if(tileToBeAdded.value1 < tileToBeAdded.value2){
        lowerValue = tileToBeAdded.value1;
        higherValue = tileToBeAdded.value2
    }
    else{
        lowerValue = tileToBeAdded.value2;
        higherValue = tileToBeAdded.value1;
    }
    tileFileName = lowerValue + "-" + higherValue + " tile.svg";
    var img = document.createElement('img');
    img.src = tileFileName;
    var id = lowerValue + "-" + higherValue;
    img.id = id;
    img.width = 50;
    img.addEventListener("click", function(event){
        event.target.id;
        var validTile = checkTile(id);
        if (validTile){
            img.remove();
            playTileHandler(id);
        }
    });
    document.getElementById('playerTiles').appendChild(img);
}

// generate player tiles
for(var i = 0; i <= 9; i++){
    randomIndex = randomRange(0, auxTileSet.length - 1);
    var tileToBeAdded = auxTileSet[randomIndex];
    playerTiles.push(tileToBeAdded);
    auxTileSet.splice(randomIndex, 1);
    displayPlayerTile(tileToBeAdded);
}

//generate computer tiles
for(var i = 0; i <= 9; i++){
    randomIndex = randomRange(0, auxTileSet.length - 1);
    var tileToBeAdded = auxTileSet[randomIndex];
    computerTiles.push(tileToBeAdded);
    auxTileSet.splice(randomIndex, 1);
}

var indexLeft = -1;
var indexRight = -1;
var valueLeft = -1;
var valueRight = -1;
var tilesPlayed = Array.apply(null, Array(playerTiles.length + computerTiles.length +1));

//determine who starts first
var playerBiggestDouble = 0;
var computerBiggestDouble = 0;
for(var i = 0; i <= playerTiles.length - 1; i++){
    var playerTile = playerTiles[i];
    var computerTile = computerTiles[i];
    if (playerTile.value1 == playerTile.value2){
        if(playerTile.value1 > playerBiggestDouble) 
            playerBiggestDouble = playerTile.value1;
    }
    if (computerTile.value1 == computerTile.value2){
        if(computerTile.value1 > computerBiggestDouble) 
            computerBiggestDouble = computerTile.value1;
    }
}

function findIndexOfTile(tileSet, tile){
    for(var i = 0; i < tileSet.length; i++){
        if(tile.value1 == tileSet[i].value1 && tile.value2 == tileSet[i].value2 ||
            tile.value2 == tileSet[i].value1 && tile.value1 == tileSet[i].value2){
            return i;
        }
    }
    return -1;
}

function computerStartsGame(){
    var firstTile = {
        value1: computerBiggestDouble,
        value2: computerBiggestDouble
    };
    tilesPlayed[10] = firstTile;
    indexLeft = indexRight = 10;
    valueLeft = valueRight = computerBiggestDouble;
    var indexToRemove = findIndexOfTile(computerTiles, firstTile);
    computerTiles.splice(indexToRemove, 1);
    console.log("computer plays " + firstTile.value1 + firstTile.value2);
    displayTile(firstTile.value1, firstTile.value2);
}


if (playerBiggestDouble > computerBiggestDouble) {
    console.log("player start");
}
else{
    console.log("computer start");
    computerStartsGame();
}

function displayTile(value1, value2){
    var lowerValue;
    var higherValue;
    var tileFileName = "";
    if(value1 < value2){
        lowerValue = value1;
        higherValue = value2;
    }
    else {
        lowerValue = value2;
        higherValue = value1;
    }
    tileFileName = lowerValue + "-" + higherValue + " tile.svg";
    var img = document.createElement('img');
    img.src = tileFileName;
    img.width = 50;
    document.getElementById('tilesPlayed').appendChild(img);
}


function playTileHandler(id){
    var textTileInput = "";
    if(textTileInput == "pass"){
        console.log("player passes")
        algorithm();
    }
    else{
        var numbersArray = id.split('-');
        var noTilesPlayed = true;
        var tilePlayed = {
            value1: numbersArray[0],
            value2: numbersArray[1]
        };
        for(var i = 0; i < tilesPlayed.length; i++){
            if(tilesPlayed[i] != null){
                noTilesPlayed = false;
            }
        }
        var validTile = false;
        if(noTilesPlayed){
            validTile = true;
            tilesPlayed[10] = tilePlayed;
            indexLeft = indexRight = 10;
            valueLeft = valueRight = tilePlayed.value1;
            var indexToRemove = findIndexOfTile(playerTiles, tilePlayed);
            playerTiles.splice(indexToRemove, 1);
            displayTile(tilePlayed.value1, tilePlayed.value2);
        }
        else{
            if(valueLeft == tilePlayed.value1){
                tilesPlayed[indexLeft - 1] = tilePlayed;
                indexLeft = indexLeft - 1;
                valueLeft = tilePlayed.value2;
                validTile = true;
                var indexToRemove = findIndexOfTile(playerTiles, tilePlayed);
                playerTiles.splice(indexToRemove, 1);
                displayTile(tilePlayed.value1, tilePlayed.value2);
            }
            else if(valueLeft == tilePlayed.value2){
                tilesPlayed[indexLeft -1] = tilePlayed;
                indexLeft = indexLeft - 1;
                valueLeft = tilePlayed.value1;
                validTile = true;
                var indexToRemove = findIndexOfTile(playerTiles, tilePlayed);
                playerTiles.splice(indexToRemove, 1);
                displayTile(tilePlayed.value1, tilePlayed.value2);
            }
            else if(valueRight == tilePlayed.value1){
                tilesPlayed[indexRight + 1] = tilePlayed;
                indexRight = indexRight + 1;
                valueRight = tilePlayed.value2;
                validTile = true;
                var indexToRemove = findIndexOfTile(playerTiles, tilePlayed);
                playerTiles.splice(indexToRemove, 1);
                displayTile(tilePlayed.value1, tilePlayed.value2);
            }
            else if(valueRight == tilePlayed.value2){
                tilesPlayed[indexRight + 1] = tilePlayed;
                indexRight = indexRight + 1;
                valueRight = tilePlayed.value1;
                validTile = true;
                var indexToRemove = findIndexOfTile(playerTiles, tilePlayed);
                playerTiles.splice(indexToRemove, 1);
                displayTile(tilePlayed.value1, tilePlayed.value2);
            }
        }
        console.log("you played " + tilePlayed.value1 + tilePlayed.value2);
        if (validTile){
            algorithm();
        }
    }
}

//lista de candidati
//prioritate: 
//1.piesele care blocheaza
//2.dublele
//3.piesele cu suma maxima
function algorithm(){
    var candidateBlockTiles = [];
    var candidateTiles = [];
    var candidateDoubleTiles = [];
    //
    //compute candidates lists
    //
    for(var i = 0; i <= computerTiles.length - 1; i++){
        var computerTile = computerTiles[i];
        if(computerTile.value1 == valueLeft){
            if(computerTile.value2 == valueRight){
                candidateBlockTiles.push(computerTile);
            }
            else if (computerTile.value1 == computerTile.value2){
                candidateDoubleTiles.push(computerTile);
            }
            else {
                candidateTiles.push(computerTile);
            }
        }
        else if(computerTile.value1 == valueRight){
            if(computerTile.value2 == valueLeft){
                candidateBlockTiles.push(computerTile);
            }
            else if (computerTile.value1 == computerTile.value2){
                candidateDoubleTiles.push(computerTile);
            }
            else{
                candidateTiles.push(computerTile);
            }
        }
        else if(computerTile.value2 == valueLeft){
            if (computerTile.value1 == valueRight){
                candidateBlockTiles.push(computerTile);
            }
            else if (computerTile.value1 == computerTile.value2){
                candidateDoubleTiles.push(computerTile);
            }
            else{
                candidateTiles.push(computerTile);
            }
        }
        else if(computerTile.value2 == valueRight){
            if(computerTile.value1 == valueLeft){
                candidateBlockTiles.push(computerTile);
            }
            else if(computerTile.value1 == computerTile.value2){
                candidateDoubleTiles.push(computerTile);
            }
            else{
                candidateTiles.push(computerTile);
            }
        }
    }
    //
    //if there are block tiles, we play the maximum sum one
    //
    var maximumBlockTile = null;
    var maximumDoubleTile = null;
    var maximumTile = null;
    if (candidateBlockTiles.length != 0){
        var tileSum = -1;
        for(var i = 0; i < candidateBlockTiles.length; i++){
            var aux = candidateBlockTiles[i].value1 + candidateBlockTiles[i].value2;
            if(aux > tileSum){
                tileSum = aux;
                maximumBlockTile = candidateBlockTiles[i];
            }
        }
        tilesPlayed[indexLeft - 1] = maximumBlockTile;
        indexLeft = indexLeft - 1;
        valueLeft = valueRight;
        var indexToRemove = findIndexOfTile(computerTiles, maximumBlockTile);
        computerTiles.splice(indexToRemove, 1);
        console.log("computer plays " + maximumBlockTile.value1 + maximumBlockTile.value2);
        displayTile(maximumBlockTile.value1, maximumBlockTile.value2);
    }
    //
    //if there are no maximum block tiles, so there are no block tiles, then we look for the double tiles
    //we choose the maximum sum double tile
    //
    if(maximumBlockTile == null && candidateDoubleTiles.length != 0){
        var tileSum = -1;
        for(var i = 0; i < candidateDoubleTiles.length; i++){
            var aux = candidateDoubleTiles[i].value1 + candidateDoubleTiles[i].value2;
            if(aux > tileSum){
                tileSum = aux;
                maximumDoubleTile = candidateDoubleTiles[i];
            }
        }
        if(valueLeft == maximumDoubleTile.value1){
            tilesPlayed[indexLeft - 1] = maximumDoubleTile;
            indexLeft = indexLeft - 1;
            var indexToRemove = findIndexOfTile(computerTiles, maximumDoubleTile);
            computerTiles.splice(indexToRemove, 1);
            console.log("computer plays " + maximumDoubleTile.value1 + maximumDoubleTile.value2);
            displayTile(maximumDoubleTile.value1, maximumDoubleTile.value2);
        }
        else if (valueRight == maximumDoubleTile.value2){
            tilesPlayed[indexRight + 1] = maximumDoubleTile;
            indexRight = indexRight + 1;
            var indexToRemove = findIndexOfTile(computerTiles, maximumDoubleTile);
            computerTiles.splice(indexToRemove, 1);
            console.log("computer plays " + maximumDoubleTile.value1 + maximumDoubleTile.value2);
            displayTile(maximumDoubleTile.value1, maximumDoubleTile.value2);
        }
    }
    //if there are no block tiles and double tiles, then we play the maximum sum tile remaining
    if(maximumBlockTile == null && maximumDoubleTile == null && candidateTiles != 0){
        var tileSum = -1;
        for(var i = 0; i < candidateTiles.length; i++){
            var aux = candidateTiles[i].value1 + candidateTiles[i].value2;
            if(aux > tileSum){
                tileSum = aux;
                maximumTile = candidateTiles[i];
            }
        }
        if(maximumTile.value1 == valueLeft){
            tilesPlayed[indexLeft - 1] = maximumTile;
            indexLeft = indexLeft - 1;
            valueLeft = maximumTile.value2;
            var indexToRemove = findIndexOfTile(computerTiles, maximumTile);
            computerTiles.splice(indexToRemove, 1);
            console.log("computer plays " + maximumTile.value1 + maximumTile.value2);
            displayTile(maximumTile.value1, maximumTile.value2);
        }
        else if(maximumTile.value1 == valueRight){
            tilesPlayed[indexRight + 1] = maximumTile;
            indexRight = indexRight + 1;
            valueRight = maximumTile.value2;
            var indexToRemove = findIndexOfTile(computerTiles, maximumTile);
            computerTiles.splice(indexToRemove, 1);
            console.log("computer plays " + maximumTile.value1 + maximumTile.value2);
            displayTile(maximumTile.value1, maximumTile.value2);
        }
        else if(maximumTile.value2 == valueLeft){
            tilesPlayed[indexLeft - 1] = maximumTile;
            indexLeft = indexLeft - 1;
            valueLeft = maximumTile.value1;
            var indexToRemove = findIndexOfTile(computerTiles, maximumTile);
            computerTiles.splice(indexToRemove, 1);
            console.log("computer plays " + maximumTile.value1 + maximumTile.value2);
            displayTile(maximumTile.value1, maximumTile.value2);
        }
        else if(maximumTile.value2 == valueRight){
            tilesPlayed[indexRight + 1] = maximumTile;
            indexRight = indexRight + 1;
            valueRight = maximumTile.value1;
            var indexToRemove = findIndexOfTile(computerTiles, maximumTile);
            computerTiles.splice(indexToRemove, 1);
            console.log("computer plays " + maximumTile.value1 + maximumTile.value2);
            displayTile(maximumTile.value1, maximumTile.value2);
        }
    }
    //
    //if there is no block tiles and double tiles, and there are also no regular tile candidates, than the computer passes its turn
    //
    if(maximumBlockTile == null && maximumDoubleTile == null && maximumTile == null){
        console.log("computer passes");
    }

}


