//  On promise ALL afin de syncroniser les FETCH

Promise.all([
  fetch("http://localhost:5678/api/categories"),
  fetch("http://localhost:5678/api/works"),
])

  // mappe le tableau de "responses" dans le tableau "response.json()" pour lire leurs contenus

  .then((responses) => Promise.all(responses.map((r) => r.json())))

  .then(function (categoriesAndWorks) {
    const categoryNames = categoriesAndWorks[0].map((categorie) => {
      return categorie.name;
    });

    ajoutFiltre(categoryNames); // Appel de la fonction pour ajouter automatiquemant le bon nombre de filtre
    return categoriesAndWorks;
  })

  .then(function (categoriesAndWorks) {
    const onlyWork = categoriesAndWorks[1];

    //  Appel de fonction ajoutObjets() qui ajoute les projets dans le site
    ajoutObjets(onlyWork);

    // fonctions de filtre actif

    document.querySelectorAll('[id^="filtra"]').forEach((occurence) => {
      let id = occurence.getAttribute("id");
      occurence.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";

        let result = id.slice(-1);
        // console.log(result);
        ajoutObjets(onlyWork, result);
      });
    });

    const buttonAll = document.querySelector(".a");
    buttonAll.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutObjets(onlyWork);
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
    const btn = document.createElement("button");
    const text = document.createTextNode(value[i]);
    btn.appendChild(text);
    document.body.appendChild(btn).className = "z";
    btn.id = "filtration" + (i + 1);
    document.querySelector(".filtres").appendChild(btn);
  }
}

const btnAll = document.createElement("button");
const textNode = document.createTextNode("Tous");
btnAll.appendChild(textNode);
document.body.appendChild(btnAll).className = "a";
document.querySelector(".filtres").appendChild(btnAll);

function ajoutObjet(work) {
  const figure = document.createElement("figure");
  figure.id = work.id;
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.appendChild(figure);
  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.setAttribute("crossorigin", "anonymous");
  figure.appendChild(imageElement);
  const autor = document.createElement("p");
  autor.innerText = work.title;
  figure.appendChild(autor);
}

// Fonction ajoutObjets()
function ajoutObjets(values, categoryId) {
  for (let i = 0; i < values.length; i++) {
    if (values[i].categoryId == categoryId || !categoryId) {
      ajoutObjet(values[i]);
    }
  }
}

// Boucle qui cache les éléments du mode ADMIN
const hiddenAdminElements = document.getElementsByClassName("top_change");
if (localStorage.length !== 2) {
  const topChangeSelector = document.querySelectorAll(".top_change");
  [].forEach.call(topChangeSelector, function (hide) {
    hide.classList.add("hide_on_upload");
  });
}

if (localStorage.length === 2) {
  const hideFilter = document.querySelectorAll(".filtres");
  [].forEach.call(hideFilter, function (hide) {
    hide.classList.add("hide_on_upload");
  });
}

// for (const i = 0; i < hiddenAdminElements.length; i++) {
//   hiddenAdminElements[i].style.visibility = "collapse";
// }

// Fonction  qui permet de se DECONNECTER vidant le local storage
const logOut = document.getElementById("logOut");
logOut.addEventListener("click", function (event) {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.reload();
});

// Message d'erreur inutile
// if (localStorage.length == 0) {
//   alert("Je vous conseille de vous connecter");
// }

// Fonction qui décode le Token
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
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
  const d1 = new Date(date);
  const d2 = new Date(Date.now());
  if (d1 > d2) {
    return true;
  } else {
    return false;
  }
}

// si la date est valide, on donne accès au mode Admin !
if (isDateValid(date) == true) {
  for (let i = 0; i < hiddenAdminElements.length; i++) {
    hiddenAdminElements[i].style.visibility = "visible";
  }
  document.getElementById("logOut").style.display = "block";
  document.getElementById("logIn").style.display = "none";
} else {
  alert("GRAVE ERREUR, RECONNECTEZ VOUS");
}

// MODALE //

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    resetModal();
  }
};

const resetModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  const modaleContent = document.querySelector(".modal-content");
  modaleContent.classList.remove("hidden");
  modaleContent.classList.remove("page2_visible");
  const modaleAjoutPhoto = document.querySelector("#modale_ajout_photo");
  modaleAjoutPhoto.remove();
};

function ajoutdynamique(work) {
  const figure = document.createElement("figure");
  figure.classList.add("figure");
  figure.id = work.id;

  const modalBarre = document.querySelector(".barre");
  modalBarre.before(figure);

  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;

  imageElement.setAttribute("crossorigin", "anonymous");
  figure.appendChild(imageElement);

  const iconeTrash = document.createElement("div");
  iconeTrash.classList.add("texte-editer");

  iconeTrash.innerHTML = `<i id="${work.id}" class="fa-solid fa-trash-can fa-sm poubelle "></i>`;

  const moveIcone = document.createElement("div");
  moveIcone.classList.add("move_icone");

  moveIcone.innerHTML =
    '<i class="fa-solid fa-arrows-up-down-left-right "></i>';
  figure.appendChild(iconeTrash);
  figure.appendChild(moveIcone);

  const autor = document.createElement("p");
  autor.innerText = "éditer";
  figure.appendChild(autor);

  iconeTrash.addEventListener("click", function (event) {
    deleteFetch(work.id);

    figure.remove();
    const elementToDelete = document.getElementById(work.id);
    elementToDelete.remove();
  });
}

function afficherImagesDansLaModale(values) {
  // console.log("id", categoryId);
  const modalGallery = document.querySelector(".modal-content");
  const htmlAutor = `<div class="barre"></div>
  <button class="add_photo" type="button">Ajouter une photo</button>
  <div class="remove_gallery"> Supprimer la galerie </div>
  `;
  modalGallery.insertAdjacentHTML("beforeend", htmlAutor);

  for (let i = 0; i < values.length; i++) {
    ajoutdynamique(values[i]);
  }

  const modaleNextPage = document.querySelector(".add_photo");
  modaleNextPage.addEventListener("click", function () {
    const modal = document.querySelector(".modal-content");
    modal.classList.add("hidden");
    modal.classList.add("page2_visible");

    const addPhotoInModal = `
    <section id="modale_ajout_photo">
    <i class="fa-solid fa-arrow-left-long fa-2xl"></i></i><span class="close le-second">&times;</span>
        <p>Ajout photo</p>
        <form id="formulaire_image" novalidate>
        <div class="zone_bleu">
    
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M57 6H1C0.448 6 0 6.447 0 7V51C0 51.553 0.448 52 1 52H57C57.552 52 58 51.553 58 51V7C58 6.447 57.552 6 57 6ZM56 50H2V8H56V50Z" fill="#B9C5CC"/>
<path d="M16 28.138C19.071 28.138 21.569 25.64 21.569 22.57C21.569 19.498 19.071 17 16 17C12.929 17 10.431 19.498 10.431 22.569C10.431 25.64 12.929 28.138 16 28.138ZM16 19C17.968 19 19.569 20.602 19.569 22.569C19.569 24.536 17.968 26.138 16 26.138C14.032 26.138 12.431 24.537 12.431 22.57C12.431 20.603 14.032 19 16 19Z" fill="#B9C5CC"/>
<path d="M7.00004 46C7.23404 46 7.47004 45.918 7.66004 45.751L23.973 31.389L34.275 41.69C34.666 42.081 35.298 42.081 35.689 41.69C36.08 41.299 36.08 40.667 35.689 40.276L30.882 35.469L40.063 25.415L51.324 35.738C51.731 36.111 52.364 36.083 52.737 35.676C53.11 35.269 53.083 34.636 52.675 34.263L40.675 23.263C40.479 23.084 40.218 22.995 39.955 23.001C39.69 23.013 39.44 23.13 39.261 23.326L29.467 34.053L24.724 29.31C24.35 28.937 23.752 28.918 23.356 29.266L6.33904 44.249C5.92404 44.614 5.88404 45.246 6.24904 45.661C6.44704 45.886 6.72304 46 7.00004 46Z" fill="#B9C5CC"/>
</svg>


<div class="image-preview-container">
<div class="preview">
  <img id="preview-selected-image" />
</div>
<label class="label_modal" for="file-upload">+ Ajouter une photo</label>
<input
name="image"
type="file"
id="file-upload"
required
  accept="image/*"
  onchange="previewImage(event);"
/>
</div>

<div class="format">jpg, png : 4mo max</div>
        </div>

        <div class="adadad" >
          <label class="titre_case" for="Titre">Titre</label>
          <input type="text" name="title" id="titre" required="required" />

          <label class="label_case" for="select">Catégorie</label>
          <select name="category" id="select" required="required" >
          <option value="">--Please choose an option--</option>
          <option name="1" value="1">Objet</option>
          <option name="2" value="2">Appartements</option>
          <option name="3" value="3">Hôtels & restaurants</option>
      </select>

          <div class="barre"></div>
          <div class="errorMessage hidden">Veuillez remplir tous les champs !</div>
          <input type="submit" id="valider" value="Valider" />
          </div>
        </form>
          
      </section>
    `;

    modalGallery.insertAdjacentHTML("beforeend", addPhotoInModal);

    const span = document.getElementsByClassName("close")[1];
    span.onclick = resetModal;

    const formId = document.getElementById("formulaire_image");
    formId.addEventListener("submit", recupData);

    function recupData(e) {
      e.preventDefault();

      const data = new FormData(document.getElementById("formulaire_image"));
      const image = data.get("image");
      const title = data.get("title");
      const category = data.get("category");

      if (title && category && image.name) {
        document.querySelector(".errorMessage").classList.add("hidden");
        postFetchs();
      } else {
        document.querySelector(".errorMessage").classList.remove("hidden");
      }
    }

    function postFetchs() {
      return fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: new FormData(document.getElementById("formulaire_image")),
      })
        .then((response) => {
          if (response.status == "201") {
            return response.json();

            console.log("Response JSON", response.json());
          } else {
            console.log("Réponse au login", response.status);
            alert("Erreur ");
          }
        })
        .then((work) => {
          ajoutObjet(work);

          ajoutdynamique(work);

          resetModal();
        });
    }
  });
}

const previewImage = (event) => {
  const imageFiles = event.target.files;

  const imageFilesLength = imageFiles.length;

  if (imageFilesLength > 0) {
    const imageSrc = URL.createObjectURL(imageFiles[0]);

    const imagePreviewElement = document.querySelector(
      "#preview-selected-image"
    );

    imagePreviewElement.src = imageSrc;

    imagePreviewElement.style.display = "block";
    const imageSelected = document.getElementById("preview-selected-image");

    if (imageSelected.clientHeight !== 0) {
      const hiddenAddPhotoModal = document.querySelector(".label_modal");
      hiddenAddPhotoModal.classList.add("hide_on_upload");
    }
  }
};

const tokc = localStorage.getItem("token");
// const tokc = localStorage.getItem("token") ? localStorage.getItem("token") || "coucou"

function deleteFetch(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => {
    if (response.status === "200" || response.status === "204") {
      console.log("Project bien deleted !!! ");
    } else {
      console.log("Réponse a la deletion ", response.status);
    }
  });
}
