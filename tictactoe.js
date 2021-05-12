const boxs = Array.from(document.getElementsByClassName('game-cell'));
console.log(boxs) //Elements --> Array
const playText = document.getElementById("playText");
const restartBtn = document.getElementById("reset");
const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "✖";
var counter = 0;
let gameLive = true;
let currentPlayer = X_TEXT; //Assume X_TEXT PLAYS FIRST
//Select each div element and adds up events to it
const drawBoard = () => {
    boxs.forEach((box) => {
        box.addEventListener("click", boxClicked)
    });
};
//event function
const boxClicked = (e) => {
        var index = e.target.id
        console.log(index)
        counter++
        console.log("count:" + counter)
        if (spaces[index] == null && gameLive == true) {
            spaces[index] = currentPlayer;
            e.target.innerText = currentPlayer;
            //Returns particular player won
            if (hasPlayerWon()) {
                gameLive = false;
                playText.innerText = `${currentPlayer} has won!`
                return;
            }
            //swap X TO O or vice versa
            if (currentPlayer == X_TEXT) {
                currentPlayer = O_TEXT;
            } else {
                currentPlayer = X_TEXT;
            }
        }
        //Draw condition 
        if (counter == 9) {
            playText.innerText = `Match Drawn!!`
        }
    }
    //Checks who won the game
const hasPlayerWon = () => {
        //from top left, check across, down, and diagonal
        if (spaces[0] === currentPlayer) {
            if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
                console.log(`${currentPlayer} wins up top`);
                return true;
            }
            if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
                console.log(`${currentPlayer} wins on the left`);
                return true;
            }
            if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
                console.log(`${currentPlayer} wins on the diagonal`);
                return true;
            }
        }
        //from bottom check up and across
        if (spaces[8] === currentPlayer) {
            if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
                console.log(`${currentPlayer} wins on the right`);
                return true;
            }
            if (spaces[7] === currentPlayer && spaces[6] === currentPlayer) {
                console.log(`${currentPlayer} wins on the bottom`);
                return true;
            }
        }
        //from middle check middle vertical and middle horizontal
        if (spaces[4] === currentPlayer) {
            if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
                console.log(`${currentPlayer} wins on the middle horizontal`);
                return true;
            }
            if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
                console.log(`${currentPlayer} wins on the middle vertical`);
                return true;
            }
            if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
                console.log(`${currentPlayer} wins on the diagonally`);
                return true;
            }
        }
    }
    //RESET THE GAME 
restartBtn.addEventListener("click", () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    });
    counter = 0;
    boxs.forEach((box) => {
        box.innerText = "";
    });
    playText.innerHTML = `Let's Play!!`;
    gameLive = true;
    currentPlayer = X_TEXT;
});
drawBoard();