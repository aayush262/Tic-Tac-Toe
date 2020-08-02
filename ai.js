const tableAI = document.querySelector("#tableAI")
const squaresAI = tableAI.querySelectorAll("td");


//start game, make game appear
function startAI(){
    document.querySelector('#tableAI').classList.remove('d-none');
    document.getElementById('buttons-div').classList.toggle('d-none');
    document.getElementById('turn').innerHTML = "Your turn";
    AImode = true
    playAI()
}

// make clear the table
function clearAI(){
    squaresAI.forEach(square=>{
        square.textContent= '';
    });
    xTurn = true;
    document.getElementById('turn').innerHTML = "Your turn";
}



// add event listeners for clicking
squaresAI.forEach(square=>{
    square.addEventListener("click", ()=>changeMarker(square));
});





// min-max algorithm
const max = () => { 
    // Possible values for maxv are:
    // -1 - loss
    // 0  - a tie
    // 1  - win
    
    // We're initially setting it to -2 as worse than the worst case:
    let maxv = -2

    let px = null
    let py = null

    let result = null
    if (checkWin()){
        result = checkWin().winner

    }

    // If the game came to an end, the function needs to return
    // the evaluation function of the end. That can be:
    // -1 - loss
    // 0  - a tie
    // 1  - win

    if  (result === 'X')
        return [-1, 0, 0]
    else if (result === 'O')
        return [1, 0, 0]
    else if (result === 'Tie')
        return [0, 0, 0]


    for (let i = 0; i<3; i++ ){
        for (let j = 0; j<3; j++ ){
            if (tableAI.rows[i].cells[j].innerHTML === ''){
                // On the empty field player 'O' makes a move and calls Min
                // That's one branch of the game tree.
                tableAI.rows[i].cells[j].innerHTML = 'O'
                 let [m, min_i, min_j] = min()
          

                // Fixing the maxv value if needed
                if (m > maxv){
                    maxv = m
                    px = i
                    py = j
                }
                // Setting back the field to empty
                console.log('[I AND J]', i, j)
                tableAI.rows[i].cells[j].innerHTML = ''
            }
        }
    }
    return [maxv, px, py]

}

const min = () => { 
    // Possible values for minv are:
    // -1 - win
    // 0  - a tie
    // 1  - loss

    // We're initially setting it to 2 as worse than the worst case:
    let minv = 2

    let qx = null
    let qy = null

    let result = null
    if (checkWin()){
        result = checkWin().winner

    }
   


    if (result === 'X')
        return [-1, 0, 0]
    else if (result === 'O')
        return [1, 0, 0]
    else if (result === 'Tie')
        return [0, 0, 0]



    for (let k = 0; k<3; k++ ){
        for (let l = 0; l<3; l++ ){
            if (tableAI.rows[k].cells[l].innerHTML === ''){
                // On the empty field player 'X' makes a move and calls Min
                // That's one branch of the game tree.
                tableAI.rows[k].cells[l].innerHTML = 'X'
                    let [m, min_i, min_j] = max()
                // Fixing the minv value if needed
                if (m < minv){
                    minv = m
                    qx = k
                    qy = l
                }
                // Setting back the field to empty
                console.log('[K AND L]', k, l)

                tableAI.rows[k].cells[l].innerHTML = ''
            }
        }
    }
    return [minv, qx, qy]

}

const playAI = () => {



      

        if (xTurn){

        
            // let start = performance.now()
            // let [m, qx, qy] = min()
            // let end = performance.now()
            // console.log(`Evaluation time: ${(end - start)/1000}s`)
            // console.log(`Recommended move: X = ${qx}, Y = ${qy}`)

         
          

        }

        // If it's AI's turn
        else{
            let start = performance.now()
           
            let [m, px, py] = max()
            let end = performance.now()
            console.log(`Evaluation time: ${(end - start)/1000}s`)

 
            changeMarker(tableAI.rows[px].cells[py])
        }

 
        
}