// O Générer un mot aléa
// - Afficher les lettres masquées  _ _ _ _ _
// - Pouvoir proposer des lettres
// - Afficher les lettres trouvées
// - Gérer un nb d'erreur max

const allWords = ['Fleur', 'Montagne', 'Plastique', 'Puéricultrice', 'Congolexicomatisation', 'Explosion', 'Macaron', 'Voiture', 'Pissenlit', 'Biroute']
const buttonPlay = document.getElementById("beginGame");
const worldToFindDiv = document.getElementById("worldToFindDiv");

buttonPlay.addEventListener('click', function() {
  beginGame()
});

function beginGame(){
  // Générer un mot au hasard
  worldToFindDiv.innerHTML = " "
  let wordToFind = generateWord();
  // worldToFindDiv.innerHTML = wordToFind;
  let wordToFindArray = Array.from(wordToFind);

  let table = document.createElement("table");
  let line = document.createElement("tr");
  wordToFindArray.forEach(letter => {
    // Créer un TD (case du tableau) par lettre
    let td = document.createElement("td");
    td.dataset.letter = letter;
    td.innerText = "_";
    line.appendChild(td);
  });
  table.appendChild(line);
  worldToFindDiv.appendChild(table);
}

function generateWord(){
  let indexWorld = getRandomInt(allWords.length);
  return allWords[indexWorld];
}

function getRandomInt(max){
  return Math.floor(Math.random() * max);
}

// VIDEO A 32:00