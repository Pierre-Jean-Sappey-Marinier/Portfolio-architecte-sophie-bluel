//  Chercher les différentes catégories

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
    const type_of_category = values.map((values) => values.categoryId);

    console.log(type_of_category);

    ajoutImage(values);
  })
  .catch(function (err) {
    // Une erreur est survenue
    console.log("Error faut refaire ENCORE");
  });

// gestion des boutons filtres

function ajoutFiltre(value) {
  for (let i = 0; i < value.length; i++) {
    var btn = document.createElement("button");
    var t = document.createTextNode(value[i]);
    btn.appendChild(t);
    document.body.appendChild(btn).className = "z";
    btn.id = "f" + i;
    document.querySelector(".filtres").appendChild(btn);
  }
}

var btn = document.createElement("button");
var t = document.createTextNode("Tous");
btn.appendChild(t);
document.body.appendChild(btn).className = "a";
document.querySelector(".filtres").appendChild(btn);

// document.querySelector(".gallery").innerHTML = "";

// Ajout du listener pour trier les pièces par ordre de prix croissant
// const boutonTrier = document.querySelector("#f0");
// boutonTrier.addEventListener("click", function (values) {
//   objets = Array.from(values)
//   objets.sort(function (a, b) {
//   return b.prix - a.prix;
// });
// }

// function ajoutFiltre(values) {
//   for (let i = 0; i <= values.length; i++) {
//     const figure = document.createElement("div");
//     const g = document.createElement("img");
//     g.src = values[i].imageUrl;
//     figure.appendChild(g);
//     document.body.appendChild(g).className = "figures";
//     // figure.id = "f" + i;
//     document.querySelector(".gallery").appendChild(g);
//   }
// }

function ajoutImage(values) {
  for (let i = 0; i < values.length; i++) {
    var figure = document.createElement("figure");
    var section_gallery = document.querySelector(".gallery");
    section_gallery.appendChild(figure);
    const imageElement = document.createElement("img");
    imageElement.src = values[i].imageUrl;
    imageElement.setAttribute("crossorigin", "anonymous");
    figure.appendChild(imageElement);
  }
}
