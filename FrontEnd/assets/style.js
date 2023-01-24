//  On promise ALL afin de syncroniser les FETCH

Promise.all([
  fetch("http://localhost:5678/api/categories"),
  fetch("http://localhost:5678/api/works"),
])

  // mappe le tableau de "responses" dans le tableau "response.json()" pour lire leurs contenus

  .then((responses) => Promise.all(responses.map((r) => r.json())))

  .then(function (categoriesAndWorks) {
    const categoryNames = categoriesAndWorks[0].map(
      (categorie) => categorie.name
    );

    ajoutFiltre(categoryNames); // Appel de la fonction pour ajouter automatiquemant le bon nombre de filtre
    return categoriesAndWorks;
  })

  .catch(function (err) {
    console.log("Error faut refaire", err);
  })

  .then(function (categoriesAndWorks) {
    const onlyWork = categoriesAndWorks[1];

    //  Appel de fonction ajoutObjet() qui ajoute les projets dans le site
    ajoutObjet(onlyWork);

    // fonctions de filtre actif

    document.querySelectorAll('[id^="filtra"]').forEach((occurence) => {
      let id = occurence.getAttribute("id");
      occurence.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";

        let result = id.slice(-1);
        console.log(result);
        ajoutObjet(onlyWork, result);
      });
    });

    const boutonTous = document.querySelector(".a");
    boutonTous.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutObjet(onlyWork);
    });

    // Appel de fonction afficherImagesDansLaModale() qui ajoute les images dans la modale
    afficherImagesDansLaModale(onlyWork);
  })

  .catch(function (err) {
    console.log("Error faut refaire ENCORE", err);
    console.error("Error faut refaire ENCORE", err);
  });

// Fonction ajoutFiltre()
function ajoutFiltre(value) {
  for (let i = 0; i < value.length; i++) {
    var btn = document.createElement("button");
    var t = document.createTextNode(value[i]);
    btn.appendChild(t);
    document.body.appendChild(btn).className = "z";
    btn.id = "filtration" + (i + 1);
    document.querySelector(".filtres").appendChild(btn);
  }
}

var btn = document.createElement("button");
var t = document.createTextNode("Tous");
btn.appendChild(t);
document.body.appendChild(btn).className = "a";
document.querySelector(".filtres").appendChild(btn);

// Fonction ajoutObjet()
function ajoutObjet(values, categoryId) {
  for (let i = 0; i < values.length; i++) {
    if (values[i].categoryId == categoryId || !categoryId) {
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
}

// Boucle qui cache les éléments du mode ADMIN
var hiddenAdminElements = document.getElementsByClassName("top_change");
for (var i = 0; i < hiddenAdminElements.length; i++) {
  hiddenAdminElements[i].style.visibility = "collapse";
}

// Fonction  qui permet de se DECONNECTER vidant le local storage
const log_out = document.getElementById("logOut");
log_out.addEventListener("click", function (event) {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.reload();
});

// Message d'erreur inutile
if (localStorage.length == 0) {
  alert("Je vous conseille de vous connecter");
}

// Fonction qui décode le Token
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// Bloc qui permet de comparer la date d'expiration du token à aujourd'hui
const tok = parseJwt(localStorage.token);

let date = new Date(+tok.exp * 1000).toISOString();
function isDateValid(date) {
  var d1 = new Date(date);
  var d2 = new Date(Date.now());
  if (d1 > d2) {
    return true;
  } else {
    return false;
  }
}

// si la date est valide, on donne accès au mode Admin !
if (isDateValid(date) == true) {
  for (var i = 0; i < hiddenAdminElements.length; i++) {
    hiddenAdminElements[i].style.visibility = "visible";
  }
  document.getElementById("logOut").style.visibility = "visible";
  document.getElementById("logIn").style.visibility = "collapse";
} else {
  alert("GRAVE ERREUR, RECONNECTEZ VOUS");
}

// MODALE //

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function afficherImagesDansLaModale(values, categoryId) {
  // console.log("id", categoryId);

  for (let i = 0; i < values.length; i++) {
    if (values[i].categoryId == categoryId || !categoryId) {
      var figure = document.createElement("figure");
      figure.classList.add("figure");
      figure.setAttribute("onmousemove", "apparitionFleche()");
      figure.setAttribute("onmouseout", "clearCoor()");
      var section_gallery = document.querySelector(".modal-content");
      section_gallery.appendChild(figure);

      const imageElement = document.createElement("img");
      imageElement.src = values[i].imageUrl;

      imageElement.setAttribute("crossorigin", "anonymous");
      figure.appendChild(imageElement);

      const iconeTrash = document.createElement("div");
      iconeTrash.classList.add("texte-editer");
      iconeTrash.innerHTML = '<i class="fa-solid fa-trash-can fa-sm"></i>';
      const moveIcone = document.createElement("div");
      moveIcone.classList.add("move_icone");

      moveIcone.innerHTML =
        '<i class="fa-solid fa-arrows-up-down-left-right "></i>';
      figure.appendChild(iconeTrash);
      figure.appendChild(moveIcone);

      const auteur = document.createElement("p");
      auteur.innerText = "éditer";
      figure.appendChild(auteur);
    }
  }
  const barre = document.createElement("div");
  barre.classList.add("barre");
  section_gallery.appendChild(barre);

  const addPhoto = document.createElement("div");
  addPhoto.classList.add("add_photo");
  addPhoto.innerText = "Ajouter une photo";
  section_gallery.appendChild(addPhoto);

  const removeGallery = document.createElement("div");
  removeGallery.classList.add("remove_gallery");
  removeGallery.innerText = "Supprimer la galerie";
  section_gallery.appendChild(removeGallery);

  addDiv(lalala, tamère, "du texte pour faire plaisir");
}

// function addDiv(constName, divName, text) {
//   var constName = document.createElement("div");
//   constName.classList.add(divName);
//   constName.innerText = text;
//   section_gallery.appendChild(constName);
// }

// Permet de faire apparaitre l'icone de Drag and Drop au passage de la souris
btn.addEventListener("click", function (event) {
  var hiddenAdmModaleImages = document.getElementsByClassName("move_icone");
  for (var u = 0; u < hiddenAdmModaleImages.length; u++) {
    hiddenAdmModaleImages[u].style.visibility = "hidden";
  }
});

function apparitionFleche() {
  var hiddenAdmModaleImages = document.getElementsByClassName("move_icone");

  hiddenAdmModaleImages[0].style.visibility = "visible";
}

function clearCoor() {
  var hiddenAdmModaleImages = document.getElementsByClassName("move_icone");

  hiddenAdmModaleImages[0].style.visibility = "hidden";
}
