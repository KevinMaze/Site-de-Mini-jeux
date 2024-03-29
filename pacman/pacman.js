/* 
    OK - Créer le plateau dynamique
    OK -  Créer notre pacman
    OK -  Gérer les déplacements de pacman (sans contrainte)
    OK -  Gérer les collisions avec les murs
    OK -  Pièce à manger
    OK -  Gérer les fantômes
    OK - Déplacer les fantômes (moyen, en aléatoire)
    - Gérer les collisions avec les fantômes et pacman
    - Gérer les points de puissance (pacman peut manger les fantômes)
*/
console.log('pacman.js loaded');

const gameDiv = document.getElementById('game');
const sizeCaseWidth = 28;
const scoreHtml = document.getElementById('score');
let score = 0;

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

creerPlateau()

document.addEventListener("keyup", function(event){
    deplacerPacman(event.key);
})

function creerPlateau(){
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
    setInterval(deplacerFantome, 1000)
}

// Création de pacman
function getCaseByIndex(index){
    let caseGame = document.querySelector("[data-numero-case='"+index+"']");
    return caseGame;
}

function deplacerPacman(direction){
    let pacmanDiv = document.querySelector(".pacman");
    let pacManCase = pacmanDiv.dataset.numeroCase;
    let caseDestination = null;
    switch(direction){
        case "z" :
            // Déplacer la case contenant le pacman de 1 vers le haut
            caseDestination = getNumberCaseDestination(pacManCase, directions.Haut);
            break;
        case "q" :
            // Déplacer la case contenant le pacman de 1 vers la gauche
            caseDestination = getNumberCaseDestination(pacManCase, directions.Gauche);
            break;
        case "s" :
            // Déplacer la case contenant le pacman de 1 vers le bas
            caseDestination = getNumberCaseDestination(pacManCase, directions.Bas);
            break;  
        case "d" :
            // Déplacer la case contenant le pacman de 1 vers la droite
            caseDestination = getNumberCaseDestination(pacManCase, directions.Droite);
            break;  
        default :
            break;
    };
    if(caseDestination != null){
        if(checkDirectionWall(caseDestination)){
            pacmanDiv.classList.remove("pacman");
            caseDestination.classList.add("pacman");
            checkPointEating(caseDestination);
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
    let allPoint = layout.map(l => l==0);
    if(score == allPoint.length){
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

        // while(!goodDirectionFinded){
            let direction = getRandomNumber(4);
            let fantomeCaseId = fantome.dataset.numeroCase;
            let previousDirection = fantome.dataset.previousDirection;

            if(previousDirection != null && previousDirection != undefined){
                direction = previousDirection;
            }
            //Direction aléa, chaznger de direction si je suis sur un mur
            console.log(direction);
            caseDestination = getNumberCaseDestination(fantomeCaseId, direction);
            if(!checkDirectionWall(caseDestination))
            {
                direction = getRandomNumber(4);
            }
            caseDestination = getNumberCaseDestination(fantomeCaseId, direction);

            // Vérifier si je peux aller dans la direction
            if(checkDirectionWall(caseDestination) 
            && !checkFantomeCollision(caseDestination)){
                fantome.classList.remove("fantome");
                fantome.removeAttribute("data-previous-direction");
                caseDestination.classList.add("fantome");
                caseDestination.dataset.previousDirection = direction;
                goodDirectionFinded = true;
            }
        // }
    })
}

    // Si previous direction est 0, direction ne peut pas être 1
    // Si previous direction est 1, direction ne peut pas être 0
    // Si previous direction est 2, direction ne peut pas être 3
    // Si previous direction est 3, direction ne peut pas être 2
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

const directions = {
    Haut: 0,
    Bas: 1,
    Gauche: 2,
    Droite: 3
}

//reste 32.33 min