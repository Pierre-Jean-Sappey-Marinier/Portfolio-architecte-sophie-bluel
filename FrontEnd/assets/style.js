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

    const boutonf0 = document.querySelector("#f0");
    boutonf0.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutObjet(values);
    });

    const boutonf1 = document.querySelector("#f1");
    boutonf1.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutAppartements(values);
    });

    const boutonf2 = document.querySelector("#f2");
    boutonf2.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutHotel_restaurants(values);
    });

    const boutonTous = document.querySelector(".a");
    boutonTous.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutImage(values);
    });
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

function ajoutImage(values) {
  for (let i = 0; i < values.length; i++) {
    var figure = document.createElement("figure");
    var section_gallery = document.querySelector(".gallery");
    section_gallery.appendChild(figure);
    const imageElement = document.createElement("img");
    imageElement.src = values[i].imageUrl;
    imageElement.setAttribute("crossorigin", "anonymous");
    figure.appendChild(imageElement);
    const auteur = document.createElement("p");
    auteur.innerText = values[i].title;
    figure.appendChild(auteur);
  }
}

function ajoutObjet(values) {
  for (let i = 0; i < values.length; i++) {
    if (values[i].categoryId == 1) {
      var figure = document.createElement("figure");
      var section_gallery = document.querySelector(".gallery");
      section_gallery.appendChild(figure);
      const imageElement = document.createElement("img");
      imageElement.src = values[i].imageUrl;
      imageElement.setAttribute("crossorigin", "anonymous");
      figure.appendChild(imageElement);
      const auteur = document.createElement("p");
      auteur.innerText = values[i].title;
      figure.appendChild(auteur);
    } else {
    }
  }
}

function ajoutAppartements(values) {
  for (let i = 0; i < values.length; i++) {
    if (values[i].categoryId == 2) {
      var figure = document.createElement("figure");
      var section_gallery = document.querySelector(".gallery");
      section_gallery.appendChild(figure);
      const imageElement = document.createElement("img");
      imageElement.src = values[i].imageUrl;
      imageElement.setAttribute("crossorigin", "anonymous");
      figure.appendChild(imageElement);
      const auteur = document.createElement("p");
      auteur.innerText = values[i].title;
      figure.appendChild(auteur);
    } else {
    }
  }
}

function ajoutHotel_restaurants(values) {
  for (let i = 0; i < values.length; i++) {
    if (values[i].categoryId == 3) {
      var figure = document.createElement("figure");
      var section_gallery = document.querySelector(".gallery");
      section_gallery.appendChild(figure);
      const imageElement = document.createElement("img");
      imageElement.src = values[i].imageUrl;
      imageElement.setAttribute("crossorigin", "anonymous");
      figure.appendChild(imageElement);
      const auteur = document.createElement("p");
      auteur.innerText = values[i].title;
      figure.appendChild(auteur);
    } else {
    }
  }
}
