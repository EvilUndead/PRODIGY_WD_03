const cells = document.querySelectorAll(".cell");
const statustxt = document.querySelector("#status");
const restartBtn = document.querySelector("#restart");
const win = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
let options = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let running = false;
start();

function start(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statustxt.innerHTML = player+"'s turn";
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("index");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = player;
    cell.textContent = player;
}
function changePlayer(){
    player = (player == "X") ? "O" : "X";
    statustxt.innerHTML = player+"'s turn";
}
function checkWinner(){
    let won = false;
    for(let i = 0; i < win.length; i++){
        const cond = win[i];
        const cellA = options[cond[0]];
        const cellB = options[cond[1]];
        const cellC = options[cond[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            won = true;
            break;
        }
    }

    if(won){
        statustxt.innerHTML = player+" wins!";
        document.getElementById("st").innerHTML="#restart{visibility: visible;}"
        running = false;
    }
    else if(!options.includes("")){
        statustxt.innerHTML = "Draw!";
        document.getElementById("st").innerHTML="#restart{visibility: visible;}"
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    player = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statustxt.innerHTML = player+"'s turn";
    cells.forEach(cell => cell.textContent = "");
    document.getElementById("st").innerHTML="#restart{visibility: hidden;}"
    running = true;
}
