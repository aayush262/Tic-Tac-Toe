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
        alert(`${victor}'s VICTORY!`);
        clear();
    },10);
}


let drawVictoryLine = line => {
    switch (line) {
        case 'v1':
            document.querySelector('#table').appendChild(createLine(180, 200, 180, 550));
            break;
        case 'v2':
            document.querySelector('#table').appendChild(createLine(310, 200, 310, 550));
            break;
        case 'v3':
            document.querySelector('#table').appendChild(createLine(530, 200, 530, 550));
            break;
        case 'h1':
            document.querySelector('#table').appendChild(createLine(180, 200, 180, 200));
            break;
        case 'h2':
            document.querySelector('#table').appendChild(createLine(180, 370, 180, 370));
            break;
        case 'h3':
            document.querySelector('#table').appendChild(createLine(180, 550, 180, 550));
            break;
        case 'd1':
            document.querySelector('#table').appendChild(createLine(180, 200, 530, 550));
            break;
        case 'd2':
            document.querySelector('#table').appendChild(createLine(530, 200, 180, 550));
            break;
        default:
            break;
    }
}

function createLineElement(x, y, length, angle) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid black; '
               + 'width: ' + length + 'px; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad); '
               + '-o-transform: rotate(' + angle + 'rad); '  
               + '-ms-transform: rotate(' + angle + 'rad); '  
               + 'position: absolute; '
               + 'top: ' + y + 'px; '
               + 'left: ' + x + 'px; ';
    line.setAttribute('style', styles);  
    return line;
}

function createLine(x1, y1, x2, y2) {
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha);
}

