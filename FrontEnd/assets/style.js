//  Chercher les différentes catégories
console.log("Bonjour");

const tableau = fetch("http://localhost:5678/api/categories")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);
    const categorie = value.map((value) => value.name);
    console.log(categorie);
    ajoutFiltre(categorie);
  })

  .catch(function (err) {
    // Une erreur est survenue
    console.log("Error faut refaire");
  });

//  chercher la liste des objet du back end

fetch("http://localhost:5678/api/works")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (values) {
    console.log(values);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

console.log("au revoir");
console.log(tableau);
// gestion des boutons filtres

const boutonTrier = document.querySelector(".btn-trier");

// boutonTrier.addListener("click", function () {
//   const appartementsOrdonnees = Array.from(x);
// });

function ajoutFiltre(value) {
  for (let i = 0; i < value.length; i++) {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(value[i]);
    btn.appendChild(t);
    document.body.appendChild(btn).className = "z";
    document.querySelector(".filtres").appendChild(btn);
  }
}

var btn = document.createElement("button");
var t = document.createTextNode("Tous");
btn.appendChild(t);
document.body.appendChild(btn).className = "a";
document.querySelector(".filtres").appendChild(btn);
