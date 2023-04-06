export class confetti {
  static launchAnimationConfetti() {
    let animateDiv = document.createElement("div");
    animateDiv.id = "allConfettis";
    animateDiv.innerHTML = "";

    for(let i = 0; i < 100; i++) {
      let confeti = document.createElement("div");
      confeti.classList.add("confetti");
      confeti.style.left = getRandomArbitrary(0, 100)+'%';
      confeti.style.animationDelay = 50*i+"ms";
      confeti.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0)
      animateDiv.appendChild(confeti);
    }
    document.body.appendChild(animateDiv);
    }

    static stopAnimationConfeti() {
      let animateDiv = document.getElementById("allConfetti");
      animateDiv.innerHTML = "";
      animateDiv.remove();
    }

    static getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min); 
    }
}