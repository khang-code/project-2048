var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();

}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 2048) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("4096");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code === "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code === "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (e.code === "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num !== 0);
}

function slide(row) {

    row = filterZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] === row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);

    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
         updateTile(tile,num);


        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row)
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {

        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] === 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}
function isgameover() { let gameover = true;
    for (let r = 0;r < 4; r++)  {for (let c = 0; c < 4; c++) {
            return false;
        }
        if (c !== 3 && grid[r][c] === grid[r][c + 1]) {
            return false;
        }
        if (r !== 3 && grid[r][c] === grid[r + 1][c]) {
            return false;
        }
    }
    return true;
}
let gameover = isgameover();
 if (gameover) {document.writeln('game over!')}
 function isgamewin(){
     for (let r = 0;r < 4; r++){ for (let c = 0; c < 4; c++) {if (grid[r][c] ===4096){
     return true;}
     }
     }
     return false;
 }
 let gamewon = isgamewin();
 if (gamewon) {document.writeln('you win now go outside!')}