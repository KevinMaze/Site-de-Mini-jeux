import { confetti } from '../juste prix/lib/confetti.js'

let jeuTableau
let cptClickCurrent = 0
let cardClickedId
let nbPaireOnGame
let cptCardFound = 0
const cards = ['king', 'queen', 'valet', 'as']
const gameBoard = document.getElementById('gameBoard')

document.getElementById('playButton').addEventListener('click', () => {
  let nbCardInput = document.getElementById('nbCardInput')
  initGame(nbCardInput.value)
})


// fonction qui gère le click sur une carte
function clickOnCardEvent(card){
  let allCards = document.querySelectorAll('.card')
  if(card.classList.contains('finded')){
    return
  }
  cptClickCurrent++

  if(cptClickCurrent == 1){
    // premier click, je cache les images trouvé avant
    allCards.forEach(card => {
      if(card.classList.contains('finded')){
        //c'est une carte trouvé
      }
      else{
        //pas trouvé, il faut qu'elle soit masquée
        card.classList.add('hidden')
      }
    })
    // j'affiche la carte sur laquelle je viens de cliqué
    card.classList.remove('hidden')
    //je stocke la téponse derriere la carte
    //et je la retourne
    cardClickedId = card.id
  }

  else if (cptClickCurrent == 2){
    //2eme click, je verifie si image à été trouver
    if(cardClickedId == card.id){
      cptClickCurrent = 1
      return
    }
    else {
      card.classList.remove('hidden')
      let cardClickedBefore = document.getElementById(cardClickedId)
      if(cardClickedBefore.dataset.image == card.dataset.image){
        allCards.forEach(card => {
          if(card.classList.contains('hidden')){
              //c'est une carte caché
          }
          else if(!card.classList.contains('finded')){
            card.classList.add('finded')
            cptCardFound++
          }
        })
      }
      cptClickCurrent = 0
      cardClickedId = ''
      if(cptCardFound == nbPaireOnGame * 2){

      }
    }
  }
}

function initGame(nbPaires){
  gameBoard.innerHTML = ''
  nbPaireOnGame = nbPaires
  cptCardFound = 0
  let gameCards = []
  for (let i = 0; i< nbPaires; i++) {
    gameCards.push(cards[i], false)
    gameCards.push(cards[i], false)
  }

  for(let i = 0; i < gameCards.length; i++){
    // Générer un chiffre aléa
    let cardIsPositionned = false
    while(!cardIsPositionned){
      let randomNumber = getRandomArbitrary(0, gameCards.length)
      if(gameCards[randomNumber][1] == false){
        cardIsPositionned = true
        gameCards[randomNumber][1] = true
        // Je peux positionner la carte dans le html
        let cardHtml = getHtmlCodeCard(gameCards[randomNumber][0], i)
        gameBoard.innerHTML += cardHtml
        
      }
    }
  }
  // Ajouter évènement du click
  // j'ajoute l'évènement du click sur toutes les cartes
  let allCards = document.querySelectorAll('.card')
  allCards.forEach(card => {
    card.addEventListener('click', () =>{
      clickOnCardEvent(card)
    })
  })
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getHtmlCodeCard(nomCard, id){
  return `<div class="card hidden" id="${id}" data-image="${nomCard}">
            <img src="./assets/${nomCard}.png">
          </div>`
}
