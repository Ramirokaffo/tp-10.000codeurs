
function genererCouleurAleatoire() {
    // Les caractères hexadécimaux possibles
    const caracteresHexa = '0123456789ABCDEF';
    let couleur = '#';
  
    // Générer 6 caractères aléatoires pour la couleur
    for (let i = 0; i < 6; i++) {
      couleur += caracteresHexa[Math.floor(Math.random() * 16)];
    }
  
    return couleur;
  }


function createCustomAnimations(element) {

    const handleDoubleClick = () => {
      gsap.to(element, { scale: "+=0.2", duration: 0.3 });
    };
  
    const handleMouseOver = () => {
      gsap.to(element, { backgroundColor: genererCouleurAleatoire(), duration: 0.3 });
    };
  
    element.addEventListener('dblclick', handleDoubleClick);
    element.addEventListener('mouseover', handleMouseOver);

  }

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Draggable, Flip, InertiaPlugin);
      


      const myBox = document.getElementById('myBox');
        Draggable.create("#myBoxRot", {type: "rotation",
            inertia: true});

        Draggable.create("#dragAnim", {bounds: "body"});



const squares = gsap.utils.toArray(".square");


function doFlip() {
  // Get the initial state
  const state = Flip.getState(squares);
  
  // Make DOM or styling changes (swap the squares in our case)
  swap(squares);
  
  // Animate from the initial state to the end state
  Flip.from(state, {duration: 2, ease: "power1.inOut"});
}

// Given an Array of two siblings, append the one that's first so it's last (swap)
function swap([a, b]) {
  a.parentNode.children[0] === a ? a.parentNode.appendChild(a) : a.parentNode.appendChild(b);
}

// click to flip
document.querySelector(".button").addEventListener("click", doFlip);


      createCustomAnimations(myBox);
   });