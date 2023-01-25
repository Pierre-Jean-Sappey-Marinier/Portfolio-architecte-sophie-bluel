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

// function afficherImagesDansLaModale(values, categoryId) {
//   // console.log("id", categoryId);

//   for (let i = 0; i < values.length; i++) {
//     if (values[i].categoryId == categoryId || !categoryId) {
//       var figure = document.createElement("figure");
//       figure.classList.add("figure");
//       figure.setAttribute("onmousemove", "apparitionFleche()");
//       figure.setAttribute("onmouseout", "clearCoor()");
//       var section_gallery = document.querySelector(".modal-content");
//       section_gallery.appendChild(figure);

//       const imageElement = document.createElement("img");
//       imageElement.src = values[i].imageUrl;

//       imageElement.setAttribute("crossorigin", "anonymous");
//       figure.appendChild(imageElement);

//       const iconeTrash = document.createElement("div");
//       iconeTrash.classList.add("texte-editer");
//       iconeTrash.innerHTML = '<i class="fa-solid fa-trash-can fa-sm"></i>';
//       const moveIcone = document.createElement("div");
//       moveIcone.classList.add("move_icone");

//       moveIcone.innerHTML =
//         '<i class="fa-solid fa-arrows-up-down-left-right "></i>';
//       figure.appendChild(iconeTrash);
//       figure.appendChild(moveIcone);

//       const auteur = document.createElement("p");
//       auteur.innerText = "éditer";
//       figure.appendChild(auteur);

//       const htmlAutor = `<p>Editer ${categoryId}</p>

// `;

function afficherImagesDansLaModale(values, categoryId) {
  // console.log("id", categoryId);

  for (let i = 0; i < values.length; i++) {
    if (values[i].categoryId == categoryId || !categoryId) {
      var figure = document.createElement("figure");
      figure.classList.add("figure");

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
  // const division = document.createElement("div");
  // division.classList.add("IfLog");
  const htmlAutor = `<div class="barre"></div>
  <button class="add_photo" type="button">Ajouter une photo</button>
  <div class="remove_gallery"> Supprimer la galerie </div>
  `;
  section_gallery.insertAdjacentHTML("beforeend", htmlAutor);

  const modaleNextPage = document.querySelector(".add_photo");
  console.log(modaleNextPage);
  modaleNextPage.addEventListener("click", function () {
    const modal = document.querySelector(".modal-content");
    modal.classList.add("hidden");
    modal.classList.add("page2_visible");

    const ajoutPhoto = `
    <section id="modale_ajout_photo">
    <i class="fa-solid fa-arrow-left-long fa-2xl"></i></i><span class="close">&times;</span>
        <p>Ajout photo</p>
        <div class="zone_bleu">
    
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M57 6H1C0.448 6 0 6.447 0 7V51C0 51.553 0.448 52 1 52H57C57.552 52 58 51.553 58 51V7C58 6.447 57.552 6 57 6ZM56 50H2V8H56V50Z" fill="#B9C5CC"/>
<path d="M16 28.138C19.071 28.138 21.569 25.64 21.569 22.57C21.569 19.498 19.071 17 16 17C12.929 17 10.431 19.498 10.431 22.569C10.431 25.64 12.929 28.138 16 28.138ZM16 19C17.968 19 19.569 20.602 19.569 22.569C19.569 24.536 17.968 26.138 16 26.138C14.032 26.138 12.431 24.537 12.431 22.57C12.431 20.603 14.032 19 16 19Z" fill="#B9C5CC"/>
<path d="M7.00004 46C7.23404 46 7.47004 45.918 7.66004 45.751L23.973 31.389L34.275 41.69C34.666 42.081 35.298 42.081 35.689 41.69C36.08 41.299 36.08 40.667 35.689 40.276L30.882 35.469L40.063 25.415L51.324 35.738C51.731 36.111 52.364 36.083 52.737 35.676C53.11 35.269 53.083 34.636 52.675 34.263L40.675 23.263C40.479 23.084 40.218 22.995 39.955 23.001C39.69 23.013 39.44 23.13 39.261 23.326L29.467 34.053L24.724 29.31C24.35 28.937 23.752 28.918 23.356 29.266L6.33904 44.249C5.92404 44.614 5.88404 45.246 6.24904 45.661C6.44704 45.886 6.72304 46 7.00004 46Z" fill="#B9C5CC"/>
</svg>

</form>
<label for="file" class="label-file">+ Ajouter une photo</label>
<input id="file" class="input-file" type="file">

<div class="format">jpg, png : 4mo max</div>
        </div>


        <form class="titre">
          <label class="titre_case" for="Titre">Titre</label>
          <input type="text" name="titre" id="titre" />
          <label class="label_case" for="select">Catégorie</label>
          <select name="pets" id="select">
          <option value="">--Please choose an option--</option>
          <option value="Objet">Objet</option>
          <option value="Appartements">Appartements</option>
          <option value="Hôtels & restaurants">Hôtels & restaurants</option>
      </select>

          <div class="barre"></div>
          <input type="submit" id="valider" value="Valider" />
        </form>
        
      </section>
    
    `;
    section_gallery.insertAdjacentHTML("beforeend", ajoutPhoto);
  });
}

// Now fake the file upload, since GitHub does not handle file uploads
// and returns a 404
