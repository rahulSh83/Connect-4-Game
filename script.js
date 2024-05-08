
var playerOne="1";
var playerTwo="2";
var currentPlayer = playerOne;

var gameOver = false;
var board;
var currentColumns;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++){
        let rows = [];
        for(let c = 0; c < columns; c++){
            //JS
            rows.push(' ');

            //HTML
            // <div id="0-0" class="tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);   

        }
        board.push(rows);
    }
}

function setPiece () {
    if(gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumns[c];
    if(r < 0){
        return;
    }

    board[r][c]=currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(currentPlayer == playerOne){
        tile.classList.add("one-piece");
        currentPlayer=playerTwo;
    }
    else{
        tile.classList.add("two-piece");
        currentPlayer=playerOne;
    }

    r -= 1;
    currentColumns[c] = r;

    checkWinner();
}

function checkWinner() {
    //horizontaly
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns-3; c++){
            if (board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //vertically
    for(let c=0; c < columns; c++){
        for(let r=0; r < rows-3; r++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //anti-diagonally
    for(let r=0; r < rows-3; r++){
        for(let c=0; c < columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //diagonally
    for(let r=3; r < rows; r++){
        for(let c=0; c < columns-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c){
    let winner = document.getElementById("winner");
    if(board[r][c]==playerOne){
        winner.innerText = "One wins";
    }
    else{
        winner.innerText = "Two wins";
    }

    gameOver = true;
}