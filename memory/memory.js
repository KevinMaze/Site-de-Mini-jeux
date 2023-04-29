// import { Utils } from "../juste prix/lib/utils.js"

let allCards = document.querySelectorAll('.card')
let cptClickCurrent = 0
let dataImageShowed = ''

allCards.forEach(card => {
  card.addEventListener('click', () =>{
    playGame(card)
  })
})

function playGame(card){
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
    dataImageShowed = card.dataset.image
  }

  else if (cptClickCurrent == 2){
    //2eme click, je verifie si image à été trouver
    card.classList.remove('hidden')
    if(dataImageShowed == card.dataset.image){
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
    dataImageShowed = ''
  }
}
