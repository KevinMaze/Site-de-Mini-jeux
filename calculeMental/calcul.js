// - Lancer un minuteur 
// - Générer un calcul (2 chiffres aléatoire, + - * aléatoire)
// - Laisser l'utilisateur faire des propositions

// V2 - Paramètrer ma partie, le compte a rebours, les opérateurs de la partie
const reboursDiv = document.getElementById("minuteur")
const calculDiv = document.getElementById("calcul")
const propalInput = document.getElementById("resultPropal")
const tempsMinuteurBase = 5
let compteurInterval = null
let tempsRestant = 0
let calculEnCour = null

document.getElementById("validePropal").addEventListener("click", () => {
    if(propalInput.value == calculEnCour.result) {
        alert("bravo")
    }
    else {
        alert("C'est non")
    }
})


function launchGame() {
    launchMinuteur(tempsMinuteurBase)
}

function generateCalcul() {
    calculEnCour = new Calcul(500)
    calculDiv.innerText = calculEnCour.showCalcul

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
    #operators = ["*", "-", "+"]
    number1
    number2
    operator

    constructor(maximum) {
        this.number1 = this.#getrandomInt(maximum)
        this.number2 = this.#getrandomInt(maximum)
        this.operator = this.#operators[this.#getrandomInt(3)]
    }

    get result() {
        return eval(this.number1+this.operator+this.number2)
    }

    get showCalcul() {
        return `${this.number1} ${this.operator} ${this.number2}`
    }
    // get result() {
    //     if(this.operator == '-') {
    //         return this.number1 - this.number2
    //     }
    //     else if(this.operator == '+') {
    //         return this.number1 + this.number2
    //     }
    //     else if(this.operator == '*') {
    //         return this.number1 * this.number2
    //     }
    // }

    #getrandomInt(max) {
        return Math.floor(Math.random() * max)
    }
}