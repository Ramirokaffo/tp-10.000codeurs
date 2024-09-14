
function genererCouleurAleatoire() {
    // Les caractères hexadécimaux possibles

    const colorText =  document.getElementById("color-text");
    const caracteresHexa = '0123456789ABCDEF';
    let couleur = '#';
  
    // Générer 6 caractères aléatoires pour la couleur
    for (let i = 0; i < 6; i++) {
      couleur += caracteresHexa[Math.floor(Math.random() * 16)];
    }
    colorText.innerText = couleur;
    return couleur;
  }


function createCustomAnimations(element) {

    const handleDoubleClick = () => {
      gsap.to(element, { scale: "+=0.2", duration: 0.3 });
    };
  
    const handleMouseLeave = () => {
    const colorText =  document.getElementById("color-text");
    colorText.innerText = "Hors de la boite";
    };
  
  
    const handleMouseOver = () => {
      gsap.to(element, { backgroundColor: genererCouleurAleatoire(), duration: 0.3 });
    };
  
    element.addEventListener('dblclick', handleDoubleClick);
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseleave', handleMouseLeave);

  }

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Draggable);
      
      const myBox = document.getElementById('myBox');
        Draggable.create("#myBoxRot", {type: "rotation",
            inertia: true});

        Draggable.create("#dragAnim", {bounds: "body"});


      createCustomAnimations(myBox);
   });