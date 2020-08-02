var restart = document.querySelector(".restartBtn");
var squares = document.querySelector("#table").querySelectorAll("td");
var xTurn = true;
var AImode = false;

//start game, make game appear
function start(){
    document.querySelector('#table').classList.remove('d-none');
    document.getElementById('buttons-div').classList.toggle('d-none');
    AImode = false
}

// make new game
function clear(){
    if(AImode){
        clearAI()
    }
    else{
        squares.forEach(square=>{
            square.textContent= '';
        });
        xTurn = true;
        document.getElementById('turn').innerHTML = "X's turn";
    }
}

// add event listener to restart button
restart.addEventListener("click", clear);


// change the content of the board
changeMarker = e => {
    if (e.textContent === ''){
        if (xTurn){
            e.textContent = 'X';
            if(AImode){
                document.querySelector('#loading').classList.remove('d-none');
                document.getElementById('turn').innerHTML = "My turn";
                
            }else{
                document.getElementById('turn').innerHTML = "O's turn";
            }
        }
        else{
            e.textContent = 'O';
            document.getElementById('turn').innerHTML = "X's turn";
            if(AImode) 
                document.querySelector('#loading').classList.add('d-none');

        }
        console.log(`(${e.cellIndex}, ${e.parentNode.rowIndex}) -> ${xTurn? 'X' : 'O'}`);
        xTurn = !xTurn;

        Victory(checkWin());
        if(AImode){
            setTimeout(() => {
                playAI()
            },100);
            
        }
    }
}

// add event listeners for clicking
squares.forEach(square=>{
    square.addEventListener("click", ()=>changeMarker(square));
});

// checks if the game is complete
checkWin = () => {
    let kvp = {};
    kvp["v1"] = kvp["v2"] = kvp["v3"] = kvp["h1"] = kvp["h2"] = kvp["h3"] = kvp["d1"] = kvp["d2"] =  0;
    let filled = 0
    // for (let x = 0; x < 3; x++) {
    //     for (let y = 0; y < 3; y++) {
    //     }
    // }
    let gameBoard
    
    if(AImode)
        gameBoard = tableAI
    else
        gameBoard = table


    if(gameBoard.rows[0].cells[0].innerHTML==='X'){
        kvp["h1"] += 1;
        kvp["v1"] += 1;
        kvp["d1"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[0].cells[0].innerHTML==='O'){
        
        kvp["h1"] -= 1;
        kvp["v1"] -= 1;
        kvp["d1"] -= 1;
        filled += 1;
    }

    if(gameBoard.rows[1].cells[0].innerHTML==='X'){
        kvp["h2"] += 1;
        kvp["v1"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[1].cells[0].innerHTML==='O'){
        kvp["h2"] -= 1;
        kvp["v1"] -= 1;
        filled += 1;
    }

    if(gameBoard.rows[2].cells[0].innerHTML==='X'){
        kvp["h3"] += 1;
        kvp["v1"] += 1;
        kvp["d2"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[2].cells[0].innerHTML==='O'){
        kvp["h3"] -= 1;
        kvp["v1"] -= 1;
        kvp["d2"] -= 1;
        filled += 1;
    }
    
    if(gameBoard.rows[0].cells[1].innerHTML==='X'){
        kvp["h1"] += 1;
        kvp["v2"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[0].cells[1].innerHTML==='O'){
        kvp["h1"] -= 1;
        kvp["v2"] -= 1;
        filled += 1;
    }

    if(gameBoard.rows[1].cells[1].innerHTML==='X'){
        kvp["h2"] += 1;
        kvp["v2"] += 1;
        kvp["d1"] += 1;
        kvp["d2"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[1].cells[1].innerHTML==='O'){
        kvp["h2"] -= 1;
        kvp["v2"] -= 1;
        kvp["d1"] -= 1;
        kvp["d2"] -= 1;
        filled += 1;
    }
    
    if(gameBoard.rows[2].cells[1].innerHTML==='X'){
        kvp["h3"] += 1;
        kvp["v2"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[2].cells[1].innerHTML==='O'){
        kvp["h3"] -= 1;
        kvp["v2"] -= 1;
        filled += 1;
    }

    if(gameBoard.rows[0].cells[2].innerHTML==='X'){
        kvp["h1"] += 1;
        kvp["v3"] += 1;
        kvp["d2"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[0].cells[2].innerHTML==='O'){
        kvp["h1"] -= 1;
        kvp["v3"] -= 1;
        kvp["d2"] -= 1;
        filled += 1;
    }

    if(gameBoard.rows[1].cells[2].innerHTML==='X'){
        kvp["h2"] += 1;
        kvp["v3"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[1].cells[2].innerHTML==='O'){
        kvp["h2"] -= 1;
        kvp["v3"] -= 1;
        filled += 1;
    }

    if(gameBoard.rows[2].cells[2].innerHTML==='X'){
        kvp["h3"] += 1;
        kvp["v3"] += 1;
        kvp["d1"] += 1;
        filled += 1;
    }
    else if(gameBoard.rows[2].cells[2].innerHTML==='O'){
        kvp["h3"] -= 1;
        kvp["v3"] -= 1;
        kvp["d1"] -= 1;
        filled += 1;
    }

    for(let key in kvp){
        if (kvp[key]<-2){
            
            return({winner: 'O', key});
        }
        else if (kvp[key]>2){
            
            return({winner: 'X', key});
        }
        
    }

    if (filled >= 9){
        return({winner: 'Tie'});
    } 

   
}

// display the winner
Victory = (result) => {
    if(result){
        if(result.winner!== 'Tie'){
            document.getElementById('turn').innerHTML = `<h1>${result.winner}'s VICTORY!<h1>`
            drawVictoryLine(result.key);
            setTimeout(() => {
                if(!alert(`${result.winner}'s VICTORY!`)){window.location.reload();}
            },100);
        }
        else{
            document.getElementById('turn').innerHTML = '<h1>DRAW!!! NO ONE WINS!!<h1>'
            setTimeout(() => {
                if(!alert('TIE!')){window.location.reload();}
            },100);
        }
}
}

// draws victory line
let drawVictoryLine = line => {
    let a,b,c,d;
    switch (line) {
        case 'v1':
            a=85; b=0; c=85; d=460;
            break;
        case 'v2':
            a=230; b=0; c=230; d=460;
            break;
        case 'v3':
            a=385; b=0; c=385; d=460;
            break;
        case 'h1':
            a=0; b=85; c=460; d=85;
            break;
        case 'h2':
            a=0; b=230; c=460; d=230;
            break;
        case 'h3':
            a=0; b=385; c=460; d=385;
            break;
        case 'd1':
            a=0; b=0; c=460; d=460;
            break;
        case 'd2':
            a=0; b=460; c=460; d=0;
            break;
        default:
            break;
    }


    new p5(( sketch ) => {
            sketch.setup = () => {
            sketch.createCanvas(456, 456);
        };
    
        sketch.draw = () => {
            sketch.line(a, b, c, d);
        };
    });

    if(AImode){
        $('canvas').css({ 
            "position": "absolute",
            "background-color": "rgba(0, 0, 0, 0)",
            "top":`${$('#tableAI').position().top}px`, 
            "left":`${$('#tableAI').position().left}px`,
            "width": `${$('#tableAI').css("width")}`,
            "height": `${$('#tableAI').css("height")}`
        })
    }
    else{

        $('canvas').css({ 
            "position": "absolute",
            "background-color": "rgba(0, 0, 0, 0)",
            "top":`${$('#table').position().top}px`, 
            "left":`${$('#table').position().left}px`,
            "width": `${$('#table').css("width")}`,
            "height": `${$('#table').css("height")}`
        })
    }
}
