// - Lancer un minuteur 
// - Générer un calcul (2 chiffres aléatoire, + - * aléatoire)
// - Laisser l'utilisateur faire des propositions

// V2 - Paramètrer ma partie, le compte a rebours, les opérateurs de la partie
const reboursDiv = document.getElementById("minuteur")
const tempsMinuteurBase = 5
let compteurInterval = null
let tempsRestant = 0

function launchGame() {
    launchMinuteur(tempsMinuteurBase)
}

function generateCalcul() {

}

function launchMinuteur(tempsMinuteurBase) {
    tempsRestant = tempsMinuteurBase
    reboursDiv.innerText = tempsRestant
    compteurInterval = setInterval(() => {
        // le code va s'éxécuter toutes les 1 seconde
        tempsRestant --
        reboursDiv.innerText = tempsRestant;
        if(tempsRestant == 0){
            clearInterval(compteurInterval)
            alert("fini")
        }
    }, 1000);
}

class Calcul {
    number1
    number2
    operator
    result
    constructor() {
        let max = this.#getrandomInt()
        this.number1 = max
        this.number2 = max
    }
    #getrandomInt(max) {
        return Math.floor(Math.random() * max)
    }
}