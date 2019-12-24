var restart = document.querySelector(".btn-primary");

var square = document.querySelectorAll("td");


function clear(){

    for (var i = 0 ; i<square.length ; i++)
    {
        square[i].textContent= '';
    }
}

restart.addEventListener("click",clear);

function changeMarker(){

    if (this.textContent === ''){
        this.textContent = 'X';
    }
    
    else if (this.textContent === 'X'){
        this.textContent = 'O';
    }
    else{
        this.textContent = '';
    }
    


}

for (var j = 0; j<square.length; j++){
    square[j].addEventListener("click", changeMarker);
}