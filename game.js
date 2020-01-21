var restart = document.querySelector(".restartBtn");
var squares = document.querySelectorAll("td");
var xTurn = true;


function start(e){
    document.querySelector('#table').classList.remove('d-none');
    e.classList.toggle('d-none');
}


function clear(){
    squares.forEach(square=>{
        square.textContent= '';
    });
    xTurn = true;
    document.getElementById('turn').innerHTML = "X's turn";
}

restart.addEventListener("click",clear);

changeMarker = e => {
    if (e.textContent === ''){
        if (xTurn){
            e.textContent = 'X';
            document.getElementById('turn').innerHTML = "O's turn";
        }
        else{
            e.textContent = 'O';
            document.getElementById('turn').innerHTML = "X's turn";
        }
        xTurn = !xTurn;
        console.log(`(${e.cellIndex}, ${e.parentNode.rowIndex}) -> ${xTurn? 'X' : 'O'}`);
        checkWin();
    }
}

squares.forEach(square=>{
    square.addEventListener("click", ()=>changeMarker(square));
});

checkWin = () => {
    let kvp = {};
    kvp["v1"] = kvp["v2"] = kvp["v3"] = kvp["h1"] = kvp["h2"] = kvp["h3"] = kvp["d1"] = kvp["d2"] = 0;
    // for (let x = 0; x < 3; x++) {
    //     for (let y = 0; y < 3; y++) {
    //     }
    // }
    if(table.rows[0].cells[0].innerHTML==='X'){
        kvp["h1"] += 1;
        kvp["v1"] += 1;
        kvp["d1"] += 1;
    }
    else if(table.rows[0].cells[0].innerHTML==='O'){
        
        kvp["h1"] -= 1;
        kvp["v1"] -= 1;
        kvp["d1"] -= 1;
    }

    if(table.rows[1].cells[0].innerHTML==='X'){
        kvp["h2"] += 1;
        kvp["v1"] += 1;
    }
    else if(table.rows[1].cells[0].innerHTML==='O'){
        kvp["h2"] -= 1;
        kvp["v1"] -= 1;
    }

    if(table.rows[2].cells[0].innerHTML==='X'){
        kvp["h3"] += 1;
        kvp["v1"] += 1;
        kvp["d2"] += 1;
    }
    else if(table.rows[2].cells[0].innerHTML==='O'){
        kvp["h3"] -= 1;
        kvp["v1"] -= 1;
        kvp["d2"] -= 1;
    }
    
    if(table.rows[0].cells[1].innerHTML==='X'){
        kvp["h1"] += 1;
        kvp["v2"] += 1;
    }
    else if(table.rows[0].cells[1].innerHTML==='O'){
        kvp["h1"] -= 1;
        kvp["v2"] -= 1;
    }

    if(table.rows[1].cells[1].innerHTML==='X'){
        kvp["h2"] += 1;
        kvp["v2"] += 1;
        kvp["d1"] += 1;
        kvp["d2"] += 1;
    }
    else if(table.rows[1].cells[1].innerHTML==='O'){
        kvp["h2"] -= 1;
        kvp["v2"] -= 1;
        kvp["d1"] -= 1;
        kvp["d2"] -= 1;
    }
    
    if(table.rows[2].cells[1].innerHTML==='X'){
        kvp["h3"] += 1;
        kvp["v2"] += 1;
    }
    else if(table.rows[2].cells[1].innerHTML==='O'){
        kvp["h3"] -= 1;
        kvp["v2"] -= 1;
    }

    if(table.rows[0].cells[2].innerHTML==='X'){
        kvp["h1"] += 1;
        kvp["v3"] += 1;
        kvp["d2"] += 1;
    }
    else if(table.rows[0].cells[2].innerHTML==='O'){
        kvp["h1"] -= 1;
        kvp["v3"] -= 1;
        kvp["d2"] -= 1;
    }

    if(table.rows[1].cells[2].innerHTML==='X'){
        kvp["h2"] += 1;
        kvp["v3"] += 1;
    }
    else if(table.rows[1].cells[2].innerHTML==='O'){
        kvp["h2"] -= 1;
        kvp["v3"] -= 1;
    }

    if(table.rows[2].cells[2].innerHTML==='X'){
        kvp["h3"] += 1;
        kvp["v3"] += 1;
        kvp["d1"] += 1;
    }
    else if(table.rows[2].cells[2].innerHTML==='O'){
        kvp["h3"] -= 1;
        kvp["v3"] -= 1;
        kvp["d1"] -= 1;
    }

    for(let key in kvp){
        if (kvp[key]<-2){
            drawVictoryLine(key);
            Victory('O');
        }
        if (kvp[key]>2){
            drawVictoryLine(key);
            Victory('X');
        }
    }
}

Victory = (victor) => {
    document.getElementById('turn').innerHTML = `<h1>${victor}'s VICTORY!<h1>`
    setTimeout(() => {
        if(!alert(`${victor}'s VICTORY!`)){window.location.reload();}
    },100);
}

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

    $('canvas').css({ 
        "position": "absolute",
        "background-color": "rgba(0, 0, 0, 0)",
        "top":`${$('#table').position().top}px`, 
        "left":`${$('#table').position().left}px`,
        "width": `${$('#table').css("width")}`,
        "height": `${$('#table').css("height")}`
    })
}

