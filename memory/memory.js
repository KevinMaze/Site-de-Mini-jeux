let jeuTableau
let allCards = document.querySelectorAll('.card')
let cptClickCurrent = 0
let cardClickedId
const cards = ['king', 'queen', 'valet', 'as']

// j'ajoute l'évènement du click sur toutes les cartes
allCards.forEach(card => {
  card.addEventListener('click', () =>{
    clickOnCardEvent(card)
  })
})


// fonction qui gère le click sur une carte
function clickOnCardEvent(card){
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
    }
    else {
      card.classList.remove('hidden')
      let cardClickedBefore = document.getElementById(cardClickedId)
      if(cardClickedBefore.dataset.image == card.dataset.image){
        allCards.forEach(card => {
          if(card.classList.contains('hidden')){
              //c'est une carte caché
          }
          else{
            card.classList.add('finded')
          }
        })
      }
      cptClickCurrent = 0
      cardClickedId = ''
    }
  }
}

function initGame(nbPaires){
  for()
}

// seccion 3 reste 16:10