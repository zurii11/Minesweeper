let cellW = 20;
let canvasW = cellW*16;
let canvasH = cellW*16;
let cells = [];
let bombs = [];
let maxBombs = 40;

const State = {
    Unopened: "Unopened",
    Opened: "Opened",
    Flagged: "Flagged"
}

function setup() {
    createCanvas(canvasW, canvasH);
    createCells(16, 16);
}

function draw() {
    background(255, 232, 253);

    for(let row of cells) {
        for(let cell of row) {
            cell.show();
        }
    }
}

function createCells(rows, cols) {
    generateBombs(maxBombs, rows*cols);

    let totalIterations = 0;

    for(let y = 0; y < rows; y++) {
        let row = [];

        for(let x = 0; x < cols; x++) {
            let hasBomb;
            if(bombs.includes(totalIterations)) {
                hasBomb = true;
            } else {
                hasBomb = false;
            }
            row.push(new Cell(createVector(x * cellW, y * cellW), cellW, hasBomb));
            console.log(`on iteration ${totalIterations} hasBomb is ${hasBomb}`);
            totalIterations++;
        }

        cells.push(row);
    }

    getContents();
    console.log(cells);
    console.log(cells.length);
}

function generateBombs(numOfBombs, range) {
    for(let i = 0; i < numOfBombs; i++) {
        while(true) {
            let bombIndex = round(random(0, range));
            
            if(bombs.includes(bombIndex)) {
                continue;
            } else {
                bombs.push(bombIndex);
                break;
            }

            break;
        }
    }

    console.log(bombs);
    console.log(bombs.length);
}

function getContents() {
    for(let row = 0; row < cells.length; row++) {
        for(let col = 0; col < cells[row].length; col++) {
            if(!cells[row][col].hasBomb) {
                let counter = 0;

                for(let rowOff = -1; rowOff <= 1; rowOff++) {
                    for(let colOff = -1; colOff <= 1; colOff++) {
                        let i = row + rowOff;
                        let j = col + colOff;
                        if(i > -1 && i < 16 && j > -1 && j < 16) {
                            let adjacentCell = cells[row + rowOff][col + colOff];
                            if(adjacentCell.hasBomb) {
                                counter++;
                            }        
                        }
                    }
                }
                
                cells[row][col].content = counter;
                console.log(cells[row][col].content = counter);
            }
        }
    } 
}

function mousePressed() {
    for(let row of cells) {
        for(let cell of row) {
            if(cell.checkPress(mouseX, mouseY)) {
                cell.reveal();
            }
        }
    }
}