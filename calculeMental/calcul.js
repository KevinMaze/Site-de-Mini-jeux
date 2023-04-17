// - Lancer un minuteur 
// - Générer un calcul (2 chiffres aléatoire, + - * aléatoire)
// - Laisser l'utilisateur faire des propositions

// V2 - Paramètrer ma partie, le compte a rebours, les opérateurs de la partie
const reboursDiv = document.getElementById("minuteur")
const calculDiv = document.getElementById("calcul")
const propalInput = document.getElementById("resultPropal")
const messengerDiv = document.getElementById("messenger")
const allShowPlayingDiv = document.querySelectorAll('.showPlayingDiv')

const tempsMinuteurBase = 10
let compteurInterval = null
let tempsRestant = 0
let calculEnCour = null
let cptGoodAnswer = 0
let cptBadAnswer = 0

document.getElementById("launchButton").addEventListener("click", () => {
    launchGame()
})

document.getElementById("validePropal").addEventListener("click", () => {
    checkInputValue()
})

function checkInputValue() {
    if(propalInput.value == calculEnCour.result) {
        messengerDiv.innerText = "Bravo, tu sais compter !"
        cptGoodAnswer ++
    }
    else {
        messengerDiv.innerText = `Tu sais pas compter Jack, t'es mauvais !! Résultat : ${calculEnCour.result}`
        cptBadAnswer ++
    }
    propalInput.value = ""
    generateCalcul()
}


function launchGame() {
    let cptGoodAnswer = 0
    let cptBadAnswer = 0
    launchMinuteur(tempsMinuteurBase)
    generateCalcul()
    displayPlayingDiv(true)
    propalInput.value = ""
    messengerDiv.innerHTML = ""
}

function generateCalcul() {
    calculEnCour = new Calcul(100)
    calculDiv.innerText = calculEnCour.showCalcul

}

function launchMinuteur(tempsMinuteurBase) {
    clearInterval(compteurInterval)
    tempsRestant = tempsMinuteurBase
    reboursDiv.innerText = tempsRestant
    compteurInterval = setInterval(() => {
        // le code va s'éxécuter toutes les 1 seconde
        tempsRestant --
        reboursDiv.innerText = tempsRestant;
        if(tempsRestant == 0){
            clearInterval(compteurInterval)
            displayPlayingDiv(false)
            messengerDiv.innerHTML = `Bonne(s) réponse(s) : ${cptGoodAnswer} <br>`
            messengerDiv.innerHTML += `Mauvaise(s) réponse(s) : ${cptBadAnswer}`
        }
    }, 1000);
}

function displayPlayingDiv(show){
    let displayProperty = "none"
    if(show){
        displayProperty = "block"
    }
    allShowPlayingDiv.forEach(element => {
        element.style.display = displayProperty
    })
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


// séance 6 40min35