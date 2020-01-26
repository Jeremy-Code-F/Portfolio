//TODO: draw a line between the winning spaces when a victory happens

let gameReady = false;

let playerTurn = false;
let aiTurn = true;

function markBoardPlace(e){
    if(gameReady && playerTurn == true){
        //e.innerText = "O";
        e.className += " OMark";
    
        playerTurn = false;
        aiTurn = true;

        let originalBoard = [];
        let boardSpaces = document.getElementsByClassName("boardSpace");
        for(var i = 0; i < boardSpaces.length; i++){
            if(boardSpaces[i].innerText == "O" || boardSpaces[i].className.includes("OMark")){
                originalBoard.push("O");
            }else if(boardSpaces[i].innerText == "X"){
                originalBoard.push("X");
            }else{
                originalBoard.push(boardSpaces[i].id);
            }
        }

        let humanWon = detectWinningMoves(originalBoard, humanPlayer)
        if(humanWon){
            alert("You won!")
            disableGame();
        }
        aiMove();
    }
}

var aiPlayer = "X";
var humanPlayer = "O";
function aiMove(){
    //Minimax algorithm

    let originalBoard = [];
    let boardSpaces = document.getElementsByClassName("boardSpace");
    for(var i = 0; i < boardSpaces.length; i++){
        if(boardSpaces[i].innerText == "O" || boardSpaces[i].className.includes("OMark")){
            originalBoard.push("O");
        }else if(boardSpaces[i].innerText == "X" || boardSpaces[i].className.includes("XMark")){
            originalBoard.push("X");
        }else{
            originalBoard.push(boardSpaces[i].id);
        }
    }

    let bestSpot = minimaxAlg(originalBoard, aiPlayer);
    let targetBoardSpace = document.getElementById(bestSpot.index);
    //targetBoardSpace.innerText = "X";
    targetBoardSpace.className += " XMark";
    originalBoard[bestSpot.index] = "X";
    let aiWon = detectWinningMoves(originalBoard, aiPlayer)
    
    if(aiWon){
        alert("Ai just won");
        disableGame();
    }

    aiTurn = false;
    playerTurn = true;
    let currentMoveLabel = document.getElementById("currentMoveLabel");
    currentMoveLabel.innerText = "Human Move.";
}

function readyGame(){
    let currentMoveLabel = document.getElementById("currentMoveLabel");
    currentMoveLabel.innerText = "Play your move.";
    gameReady = true;
    playerTurn = true;
    aiTurn = false;


    //Set 'Play button to be a reset button'
    let playButton = document.getElementById("playButton");
    playButton.className = "btn btn-success";
    playButton.innerText = "Reset";
    playButton.setAttribute("onClick", "resetGame()");
    //aiMove();
}

function disableGame(){
    let boardSpaces = document.getElementsByClassName("boardSpace");
    for(var i = 0; i < boardSpaces.length; i++){
        boardSpaces[i].setAttribute("onClick", "");
    }
}


function resetGame(){
    let boardSpaces = document.getElementsByClassName("boardSpace");
    for(var i = 0; i < boardSpaces.length; i++){
        boardSpaces[i].innerText = "";
        boardSpaces[i].className = "col-md-4 boardOutline boardSpace";
        boardSpaces[i].setAttribute("onClick", "markBoardPlace(this)");
    }
    readyGame();
}


function minimaxAlg(newBoard, player){
    let availableSpot = emptyIndexies(newBoard);

    if(detectWinningMoves(newBoard, humanPlayer)){
        return {score:-10};
    }else if(detectWinningMoves(newBoard, aiPlayer)){
        return {score:10};
    }else if(availableSpot.length == 0){
        return {score:0};
    }

    let moves = [];
    for(var i = 0; i < availableSpot.length; i++){
        let move = {};
        move.index = newBoard[availableSpot[i]];

        newBoard[availableSpot[i]] = player;

        if (player == aiPlayer){
            var result = minimaxAlg(newBoard, humanPlayer);
            move.score = result.score;
        }
        else{
            var result = minimaxAlg(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availableSpot[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
}

function detectWinningMoves(board, player){
    if (
           (board[0] == player && board[1] == player && board[2] == player) ||
           (board[3] == player && board[4] == player && board[5] == player) ||
           (board[6] == player && board[7] == player && board[8] == player) ||
           (board[0] == player && board[3] == player && board[6] == player) ||
           (board[1] == player && board[4] == player && board[7] == player) ||
           (board[2] == player && board[5] == player && board[8] == player) ||
           (board[0] == player && board[4] == player && board[8] == player) ||
           (board[2] == player && board[4] == player && board[6] == player)
           ) {
           return true;
       } else {
           return false;
       }
   }