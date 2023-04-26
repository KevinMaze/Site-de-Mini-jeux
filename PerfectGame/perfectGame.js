// Déroulement 1 tour :
// Démarer un partie
// Générer carte aléa
// Laisser carte visible pendant 5s
// Choisir une carte au hasard parmis les cartes tirées
// Laisser 3s au joueur pour choisir les cartes
// Si gagner => recommencer le tour
// Si perdu => fin de la partie
// Sauvegarder le score en cookie
import { Utils } from "../juste prix/lib/utils.js"

const plateau = document.getElementById('cardsPlateau')

generateCards(24)

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