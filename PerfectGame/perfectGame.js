// Déroulement 1 tour :
// Démarer un partie
// Générer carte aléa   OK
// Laisser carte visible pendant 5s  OK
// Choisir une carte au hasard parmis les cartes tirées   OK
// Laisser 3s au joueur pour choisir les cartes
// Si gagner => recommencer le tour
// Si perdu => fin de la partie
// Sauvegarder le score en cookie
import { Utils } from "../juste prix/lib/utils.js"

const plateau = document.getElementById('cardsPlateau')
const elementToFindDiv = document.getElementById('elementToFind')
const nbCardsParam = 6
const codeError = document.getElementById('codeErrorDiv')
let classCardToFind


newTour()

function newTour(){
  plateau.innerHTML = ''
  elementToFindDiv.innerHTML = ''
  generateCards(nbCardsParam)
  let nbCardToFind = Utils.getRandomInt(nbCardsParam)
  let cardsPlateau = plateau.querySelectorAll('.perso')
  classCardToFind = cardsPlateau[nbCardToFind].classList

  setTimeout(() => {
    let allCards = document.querySelectorAll('.perso')
    allCards.forEach(card => {
      card.classList.add('hidden')
      card.addEventListener('click', (e) => {
        if(classCardToFind.value == card.classList.value){
          card.classList.remove('hidden')
          setTimeout(() => {
            newTour()
          }, 3000)
          
        }
        else {
          codeError.innerHTML = 'Perdu'
        }
      })
    })
    let newCardToFind = document.createElement('div')
    newCardToFind.classList = classCardToFind
    newCardToFind.classList.remove('hidden')
    elementToFindDiv.appendChild(newCardToFind)
  }, 5000)
}

// Générer des cartes aléatoirement
function generateCards(nbCards){
  // Je genere autant de carte que nbCards
  for (let i = 0; i < nbCards; i++) {
    // Je creer une div
    let newCard = document.createElement("div");
    newCard.classList.add("perso")
    // Je genere un chiffre aléa pour que ma carte soit aléa
    let nbPersoAlea = Utils.getRandomInt(6)
    newCard.classList.add("perso" + nbPersoAlea)
    // J'ajoute chaque carte au plateau
    plateau.appendChild(newCard)
  }
}



// reste 16:19m séance 11