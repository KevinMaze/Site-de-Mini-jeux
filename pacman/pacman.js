const gameDiv = document.getElementById('game');
const sizeCaseWidth = 28;
const scoreHtml = document.getElementById('score');
let score = 0;
let pacmanCanEatGhost = false;
let intervalPacman = null;
let intervalFantome = null;
const directions = {
    Haut: 0,
    Bas: 1,
    Gauche: 2,
    Droite: 3
}
let currentDirectionPacman = directions.Gauche;

// Créer le plateau dynamique
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]
// 0 - pac-dot
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

document.getElementById("play").addEventListener("click", function(){
    stopParty();
    creerPlateau()
})

function creerPlateau(){
    score = 0;
    gameDiv.innerHTML = "";
    let cptCase = 0;
    scoreHtml.innerHTML = score;
    layout.forEach(caseLayout => {
        let casePlateau = document.createElement("div");
        // casePlateau.innerHTML = caseLayout;
        casePlateau.dataset.numeroCase = cptCase;
        // création du plateau avec class
        switch(caseLayout){
            case 0 :
                casePlateau.classList.add("point");
                break;
            case 1 :
                casePlateau.classList.add("mur");
                break;
            case 2 :
                casePlateau.classList.add("fantome-area");
                break;
            case 3 :
                casePlateau.classList.add("point-puissance");
                break;
            case 4 :
                break;
        }

        gameDiv.appendChild(casePlateau);
        cptCase++;
    })
    // Ajout de pacman
    getCaseByIndex(489).classList.add("pacman");
    // Ajout des fantomes
    generateFantome();
    //Gérer les déplacement du fantôme aléatoire
    intervalFantome = setInterval(deplacerFantome, 500)
    intervalPacman = setInterval(deplacerPacman, 500);
    document.addEventListener("keyup", onkeyupAction)
}

function onkeyupAction(event){
    switch(event.key){
        case "z" :
            // Déplacer la case contenant le pacman de 1 vers le haut
            currentDirectionPacman = directions.Haut;
            break;
        case "q" :
            // Déplacer la case contenant le pacman de 1 vers la gauche
            currentDirectionPacman = directions.Gauche;
            break;
        case "s" :
            // Déplacer la case contenant le pacman de 1 vers le bas
            currentDirectionPacman = directions.Bas;
            break;  
        case "d" :
            // Déplacer la case contenant le pacman de 1 vers la droite
            currentDirectionPacman = directions.Droite;
            break;  
        default :
            break;
    };
    console.log(currentDirectionPacman)
}

// Création de pacman
function getCaseByIndex(index){
    let caseGame = document.querySelector("[data-numero-case='"+index+"']");
    return caseGame;
}

function deplacerPacman(){
    let pacmanDiv = document.querySelector(".pacman");
    let pacManCase = pacmanDiv.dataset.numeroCase;
    caseDestination = null;

    caseDestination = getNumberCaseDestination(pacManCase, currentDirectionPacman);

    if(caseDestination != null){
        if(checkDirectionWall(caseDestination)){
            pacmanDiv.classList.remove("pacman");
            caseDestination.classList.add("pacman");
            if(caseDestination.classList.contains("point-puissance")){
                // Pacman peut manger les fantômes
                caseDestination.classList.remove("point-puissance");
                pacmanCanEatGhost = true;
                console.log("Pacman peut manger les fantômes");
                gameDiv.classList.add("power-mode");

                // au bout de 5s pacman ne peut plus manger les fantômes
                setTimeout(function(){
                    pacmanCanEatGhost = false;
                    gameDiv.classList.remove("power-mode");
                    console.log("Pacman ne peut plus manger les fantômes");
                }, 5000);
            }
            if(!checkPacmanEatedByGhost(caseDestination)){;
                checkPointEating(caseDestination);
            }
        }
    }
}


// Retourne faux si je ne peux pas aller dans la direction
// Retourne vrai si je peux aller dans la direction
function checkDirectionWall(caseDestination){
    if(caseDestination.classList.contains("mur")){
        return false;
    }else{
        return true;
    }
}

function checkPacmanEatedByGhost(caseToCheck){
    let containsPacman = caseToCheck.classList.contains("pacman");
    let containsGhost = caseToCheck.classList.contains("fantome");

    if(containsPacman && containsGhost)
    {
        if(pacmanCanEatGhost){
            caseToCheck.classList.remove("fantome");
            // pacmanCanEatGhost = false;
            // return false;
        }
        else{
            stopParty();
            alert("Perdu");
        }
    }
}

// Return true si fantome collision 
function checkFantomeCollision(caseDestination){
    if(caseDestination.classList.contains("fantome")){
        return true;
    }else{
        return false;
    }
}

function checkPointEating(caseDestination){
    if(caseDestination.classList.contains("point")){
        incrementScore();
        caseDestination.classList.remove("point");
    }
}

function incrementScore(){
    score++;
    scoreHtml.innerHTML = score;
    let allPoint = layout.filter(l => l==0);
    if(score == allPoint.length){
        stopParty();
        alert("Gagné");
    }
}

function generateFantome(){
    //Générer un fantôme x 4
    for(let i = 0; i< 4; i++){
        // Je récupérer les cases qui supportent les fantômes
        // Elles not la classe fantome-area mais pas la classe fantome
        let casePotentialFantome = document.querySelectorAll(".fantome-area:not(.fantome)");
        // Parmi ces cases, je choisis une case au hasard
        let caseForFantome = casePotentialFantome[getRandomNumber(casePotentialFantome.length)];

        //J'ajoute la classe fantome à mon fantôme
        caseForFantome.classList.add("fantome");
    }
}

function getRandomNumber(max){
    return Math.floor(Math.random() * max);
}

function deplacerFantome(){
    //Récuperer tous les fantômes
    let allFantome = document.querySelectorAll(".fantome");
    allFantome.forEach(fantome => {
        let goodDirectionFinded = false;
        let fantomeCaseId = fantome.dataset.numeroCase;

        let allDirectionPossible = [
            directions.Haut, 
            directions.Bas, 
            directions.Gauche, 
            directions.Droite
        ];

        let allGoodDirection= [];

        allDirectionPossible.forEach(direction => {
            let isPossible = true;
            let casePossible = getNumberCaseDestination(fantomeCaseId, direction);
            if(!checkDirectionWall(casePossible)){
                isPossible = false;
            }
            if(checkFantomeCollision(casePossible)){
                isPossible = false;
            }
            if(isPossible){
                allGoodDirection.push(direction);
            }
        });

        if(allGoodDirection.length > 1){
            //Plusieurs direction possible, j'élimine la direction d'où je viens (previousDirection)
            let previousDirection = fantome.dataset.previousDirection;
            
            allGoodDirection.forEach(goodDirection => {
                if(!checkFantomenotGoingBack(parseInt(previousDirection), goodDirection)){
                    const index = allGoodDirection.indexOf(goodDirection);
                    if (index > -1) {
                        allGoodDirection.splice(index, 1);
                    }
                }
            });
        }

        //J'ai un tableau allGoodDirection qui contient les directions possibles
        // il ne reste plus qu'à choisir une direction au hasard
        let elementofTable = getRandomNumber(allGoodDirection.length);
        let direction = allGoodDirection[elementofTable];
        caseDestination = getNumberCaseDestination(fantomeCaseId, direction);

        fantome.classList.remove("fantome");
        fantome.removeAttribute("data-previous-direction");
        caseDestination.classList.add("fantome");
        caseDestination.dataset.previousDirection = direction;
        checkPacmanEatedByGhost(caseDestination);
        goodDirectionFinded = true;
    })
}
    

function checkFantomenotGoingBack(previousDirection, direction){
    let canMove = false;
    switch(previousDirection){
        case directions.Haut :
            // direction ne peut pas être 1
            direction == directions.Bas ? canMove = false : canMove = true;
            break;
        case directions.Bas :
            // direction ne peut pas être 0
            direction == directions.Haut ? canMove = false : canMove = true;
            break;
        case directions.Gauche :
            // direction ne peut pas être 3
            direction == directions.Droite ? canMove = false : canMove = true;
            break;
        case directions.Droite :   
            // direction ne peut pas être 2
            direction == directions.Gauche ? canMove = false : canMove = true;
            break;
        default: 
            canMove = true;
    }
    return canMove;
}   

function getNumberCaseDestination(caseActuelle, direction){
    let caseDestination = null;
    let caseActuelleInt = parseInt(caseActuelle);
    let directionInt = parseInt(direction);
    switch(directionInt){
        case directions.Haut :
            // Déplacer la case contenant le pacman de 1 vers le haut
            caseDestination = getCaseByIndex(caseActuelleInt - sizeCaseWidth);
        break;
        case directions.Gauche :
            // Déplacer la case contenant le pacman de 1 vers la gauche
            caseDestination = getCaseByIndex(caseActuelleInt - 1);
        break;
        case directions.Bas :
            // Déplacer la case contenant le pacman de 1 vers le bas
            caseDestination = getCaseByIndex(caseActuelleInt + sizeCaseWidth);
        break;  
        case directions.Droite :
            // Déplacer la case contenant le pacman de 1 vers la droite
            caseDestination = getCaseByIndex(caseActuelleInt + 1);
            break;  
        default :
            break;
    }
    return caseDestination;
}

// Supprimer les écouteur d'événement pour déplacer pacman
// Arrêter le déplacement des fantômes
function stopParty(){
    //clear interval fantome
    if(intervalFantome != null){
        clearInterval(intervalFantome);
    }
    if(intervalPacman != null){
        clearInterval(intervalPacman);
    }

    document.removeEventListener("keyup", onkeyupAction);
}