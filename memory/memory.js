// import { Utils } from "../juste prix/lib/utils.js"

let jeuTableau
let allCards = document.querySelectorAll('.card')

allCards.forEach(card => {
  card.addEventListener('click', () =>{
    if(card.classList.contains('hidden')){
      card.classList.remove('hidden')
    }
    else{
      card.classList.add('hidden')
    }
  })
})

function generateGameArray(x, y){
  let Tableau = new Array(x)
  for (let i = 0; i < Tableau.length; i++) {
    Tableau[i] = new Array[y];
    
  }
  jeuTableau = Tableau
}

// function getRandomInt(max) {
//   let aleaIndex = Utils.getRandomInt(Tableau.length)
//   return aleaIndex
// }