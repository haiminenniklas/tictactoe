var started = false;
var round = 1;


let Player = function(number){

    this.score = 0;
    this.placements = [];
    this.number = number;

    this.hasPlaced = (number) => {
        for(var i = 0; i < this.placements.length; i++){
            if((i + 1) == number)
                return true;
        }
        return false;
    }

}

let players = {
    first: new Player(1),
    second: new Player(2)
};

var turn = 1;

const gameDiv = document.getElementById("game");
const settingsDiv = document.getElementsByClassName("settings")[0];

function start(){

    started  = true;
    round = 1;
    turn = 1;

    players.first = new Player(1);
    players.second = new Player(2);

    for(var i = 1; i < 11; i++){
        if(document.getElementById(i.toString()) !== null){
            document.getElementById(i.toString()).innerText = "";
        }
    }

    gameDiv.style.display = "block";
    gameDiv.scrollIntoView({behavior: 'smooth'});

    document.getElementById("startBtn").value = "Start Over";

}

function choose(number){

    if(started == false) return;

    let current = getCurrentPlayer();
    if(current.placements.includes(number) || getOpponent(current.number).placements.includes(number)){
        return;
    }

    current.placements.push(number);

    if(current.number == 1){
        document.getElementById(number).innerText = "X";
    } else {
        document.getElementById(number).innerText = "O";
    }

    if(checkForWin(current)){
        win(current);
    } else {
        changeTurn();
    }


}

function win(player){

    document.getElementById("win-message").style.display = "block";
    document.getElementById("win-message").innerHTML = "<h3> Player " + player.number + " Won! </h3>";
    started = false;

}

function checkForWin(player){

    if(player.placements.includes(1) && player.placements.includes(2) && player.placements.includes(3)) return true;
    else if(player.placements.includes(4) && player.placements.includes(5) && player.placements.includes(6)) return true;
    else if(player.placements.includes(7) && player.placements.includes(8) && player.placements.includes(9)) return true;
    else if(player.placements.includes(1) && player.placements.includes(5) && player.placements.includes(9)) return true;
    else if(player.placements.includes(1) && player.placements.includes(4) && player.placements.includes(7)) return true;
    else if(player.placements.includes(2) && player.placements.includes(5) && player.placements.includes(8)) return true;
    else if(player.placements.includes(3) && player.placements.includes(6) && player.placements.includes(9)) return true;

}

function changeTurn(){
    if (turn == 1)
        turn = 2;
    else
        turn = 1;
}

function getCurrentPlayer(){
    if(turn == 1)
        return players.first;
    else
        return players.second;
}

function getOpponent(number){
    if(number == 1)
        return players.second;
    else
        return players.first;
}