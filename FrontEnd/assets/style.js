//  Chercher les différentes catégories
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

    ajoutFiltre(categoryNames);
    return categoriesAndWorks;
  })

  .catch(function (err) {
    console.log("Error faut refaire", err);
  })

  //  chercher la liste des objet du back end

  .then(function (categoriesAndWorks) {
    const onlyWork = categoriesAndWorks[1];

    ajoutObjet(onlyWork);

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
    afficherImagesDansLaModale(onlyWork);
  })

  .catch(function (err) {
    console.log("Error faut refaire ENCORE", err);
    console.error("Error faut refaire ENCORE", err);
  });

// gestion des boutons filtres

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

function ajoutObjet(values, categoryId) {
  // console.log("id", categoryId);

  for (let i = 0; i < values.length; i++) {
    // console.log("tableau", values[i].categoryId);
    // console.log("if", values[i].categoryId == categoryId);

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

var hiddenAdminElements = document.getElementsByClassName("top_change");
for (var i = 0; i < hiddenAdminElements.length; i++) {
  hiddenAdminElements[i].style.visibility = "collapse";
}

// Fonction  qui permet de se DECONNECTER
const log_out = document.getElementById("logOut");
log_out.addEventListener("click", function (event) {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.reload();
});

// Fonction qui décode le Token

if (localStorage.length == 0) {
  alert("Je vous conseille de vous connecter");
  // window.location.href = "http://127.0.0.1:5500/FrontEnd/log.html";
}

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
}

// document.getElementsByClassName("moveIcone")[0].style.visibility = "collapse";
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
