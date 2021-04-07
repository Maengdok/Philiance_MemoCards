let images = ["./img/koi.jpg", "./img/wolf.jpg", "./img/spider.jpg", "./img/snake.jpg"];
let tmpImages = []
let players = [];
let card1, card2, newSpan, newInput, numberInput = 2, currentPlayer, isStarted = false;

//#region Shuffle
const shuffle = ( listImages ) => {
    let tmp = new Array(listImages.length);
    let result = [];
    let number = 1;
    let index;

    while (result.length !== listImages.length * 2) {
        index = Math.floor(Math.random() * listImages.length); 

        if (tmp[index] === undefined || tmp[index] < 2) {
            if (tmp[index] === undefined){
                tmp[index] = 1;
            }
            else {
                tmp[index]++;
            }
            result.push(listImages[index]);
            document.getElementById('memo#' + number).src = listImages[index];
            number++;
        }
    }
    tmpImages = result;
}
//#endregion

//#region Show cards
const affCards = (listImages) => {
    number = 1;

    for (let i = 0; i < listImages.length * 2; i++) {
        document.getElementById('memo#' + number).style.transform = `rotate3d(0, 1, 0, 0deg)`;
        document.getElementById('memo#' + number).src = tmpImages[number];
        document.getElementById('memo#' + number).style.boxShadow = "5px 5px 5px 5px rgba(0, 0, 0, 0.322)";
        number++;
    }
}
//#endregion

//#region Hide cards
const hideCards = (listImages) => {
    number = 1;

    for (let i = 0; i < listImages.length * 2; i++) {
        document.getElementById('memo#' + number).style.transform = `rotate3d(0, 1, 0, 180deg)`;
        document.getElementById('memo#' + number).src = "./img/black.png";        
        document.getElementById('memo#' + number).style.boxShadow = "-5px 5px 5px 5px rgba(0, 0, 0, 0.322)";
        number++;
    }
}
//#endregion

//#region start
const start = document.getElementById('start');

start.addEventListener('click', (e) => {
    start.style.display = `none`;
    hideCards(images);
    document.getElementById("player#" + 0 + "#" + players[0].name).style.color = `red`;
    document.getElementById("player#" + 0 + "#" + players[0].name).style.fontWeight = `bold`;
    document.getElementById("player#" + 0 + "#" + players[0].name).style.position = `absolute`;
    document.getElementById("player#" + 0 + "#" + players[0].name).style.top = `50%`;
    document.getElementById("player#" + 0 + "#" + players[0].name).style.left = `50%`;
    document.getElementById("player#" + 0 + "#" + players[0].name).style.transform = `translate(-50%, -50%)`;
    return isStarted = true;
})
//#endregion

//#region Capitalize Name
const capitalizedName = (playerName) => {
    if (typeof playerName !== 'string') return '';
    return playerName.charAt(0).toUpperCase() + playerName.slice(1);
}
//#endregion

//#region Display Player
const displayPlayer = () => {
    for (let i = 0; i < players.length; i++){
        newSpan = document.createElement('span');
        newSpan.innerHTML = capitalizedName(players[i].name) + ':' + players[i].score + ' ';
        newSpan.id = "player#" + i + "#" + players[i].name; 
        document.getElementById('listPlayers').appendChild(newSpan);
    }
    currentPlayer = players[0].name;
}
//#endregion

//#region enter
const enter = document.getElementById('enter');

enter.addEventListener('click', event => {
    for (let i = 1; i < numberInput; i++) {
        let player = document.getElementById('player#' + i).value;
        if (!player) {
            document.getElementById('player#' + i).style.borderColor = "red";
            players = [];
            return;
        } 
        else {
            players.push({ name: player, score: 0 });
        }
    }

    document.getElementById('players').style.display = "none";
    document.getElementById('game').style.display = "block";
    displayPlayer();
    shuffle(images);
});
//#endregion

//#region Add player
const addPlayers = document.getElementById('addPlayers');

addPlayers.addEventListener('click', event => {
    if (numberInput < 6) {   
        newInput = document.createElement('input');
        
        newInput.placeholder = "Player #" + numberInput;
        newInput.id = "player#" + numberInput;
        
        newInput.classList.add('form-control');
        newInput.classList.add("players-info");
        newInput.classList.add('col-12');
        newInput.style.position = `relative`;
        newInput.style.left = `12%`;
        newInput.style.top = `5em`;
        
        document.getElementById('nPlayers').appendChild(newInput);
        numberInput++;
    }
    else {
        addPlayers.style.display = `none`;
    }
})
//#endregion

//#region Play again
const playAgain = document.getElementsByClassName('playAgain')[0];

playAgain.addEventListener('click', event => {
    start.style.display = `block`;
    document.body.style.background = 'rgb(255, 255, 255)';
    currentPlayer = players[0].name;
    
    for (let i = 0; i < players.length; i ++) {
        players[i].score = 0;
        document.getElementById("player#" + i + "#" + players[i].name).innerHTML = capitalizedName(players[i].name) + ':' + players[i].score + ' ';
        document.getElementById("player#" + i + "#" + players[i].name).style.color = `black`;
        document.getElementById("player#" + i + "#" + players[i].name).style.position = `static`;
        document.getElementById("player#" + i + "#" + players[i].name).style.fontWeight = `normal`;
    }

    card1 = null;
    card2 = null;
    isStarted = false;
    affCards(images);
    shuffle(images);
})
//#endregion


//#region sleep
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//#endregion


//#region CHECK card
const compaire = (id) => {  
    let nId = id.split("#");
    let index = players.findIndex(player => player.name === currentPlayer);
    
    if (isStarted === true) {
        if (!card1) {
            document.getElementById(id).style.transform = `rotate3d(0, 1, 0, 0deg)`;
            document.getElementById(id).src = tmpImages[nId[1] - 1];
            document.getElementById(id).style.boxShadow = "5px 5px 5px 5px rgba(0, 0, 0, 0.322)";
            card1 = document.getElementById(id).src; 
        } 
        else {
            document.getElementById(id).style.transform = `rotate3d(0, 1, 0, 0deg)`;
            document.getElementById(id).src = tmpImages[nId[1] - 1];
            document.getElementById(id).style.boxShadow = "5px 5px 5px 5px rgba(0, 0, 0, 0.322)";
            card2 = document.getElementById(id).src;
            
            if (card1 === card2) {
                players.map( player => {
                    if(player.name === currentPlayer){
                        player.score++;
                    }
                });
                document.getElementById("player#" + index + "#" + players[index].name).innerHTML = capitalizedName(currentPlayer) + ':' + players[index].score + '  '; 
                document.body.style.background = 'green';

                if(players[index].score === 4){
                    document.getElementById("player#" + index + "#" + players[index].name).innerHTML = capitalizedName(currentPlayer) + " a gagné! Félicitations!"; 
                }
                
            } 
            else {
                if (index === players.length - 1){
                    index = 0;
                    for (let i = 0; i < players.length; i++) {
                        players[i].score = 0;
                        document.getElementById("player#" + i + "#" + players[i].name).innerHTML = capitalizedName(players[i].name) + ':' + players[i].score + ' ';
                    }
                    if (players.length > 1) {
                        document.getElementById("player#" + index + "#" + players[index].name).style.color = `red`;
                        document.getElementById("player#" + index + "#" + players[index].name).style.fontWeight = `bold`;
                        document.getElementById("player#" + index + "#" + players[index].name).style.position = `absolute`;
                        document.getElementById("player#" + index + "#" + players[index].name).style.top = `50%`;
                        document.getElementById("player#" + index + "#" + players[index].name).style.left = `50%`;
                        document.getElementById("player#" + index + "#" + players[index].name).style.transform = `translate(-50%, -50%)`;
                        
                        document.getElementById("player#" + (players.length -1) + "#" + players[players.length -1].name).style.color = `black`;
                        document.getElementById("player#" + (players.length -1) + "#" + players[players.length -1].name).style.fontWeight = `normal`;
                        document.getElementById("player#" + (players.length -1) + "#" + players[players.length -1].name).style.position = `static`;
                        }
                }
                else {
                    index++;
                    document.getElementById("player#" + index + "#" + players[index].name).style.color = `red`;
                    document.getElementById("player#" + index + "#" + players[index].name).style.fontWeight = `bold`;
                    document.getElementById("player#" + index + "#" + players[index].name).style.position = `absolute`;
                    document.getElementById("player#" + index + "#" + players[index].name).style.top = `50%`;
                    document.getElementById("player#" + index + "#" + players[index].name).style.left = `50%`;
                    document.getElementById("player#" + index + "#" + players[index].name).style.transform = `translate(-50%, -50%)`;
                    
                    
                    document.getElementById("player#" + (index - 1) + "#" + players[index - 1].name).style.color = `black`;
                    document.getElementById("player#" + (index - 1) + "#" + players[index - 1].name).style.fontWeight = `normal`;
                    document.getElementById("player#" + (index - 1) + "#" + players[index - 1].name).style.position = `static`;
                    card1 = document.getElementById(id).src; 
                }
                currentPlayer = players[index].name;
                document.body.style.background = 'red';
                sleep(1000).then(() => {
                    hideCards(images);
                })
                
            }
            card1 = null;
            card2 = null;
        }
    }   
}
//#endregion