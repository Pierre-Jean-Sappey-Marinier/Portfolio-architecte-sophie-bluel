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
// document.getElementsByClassName("top_change")[0].setAttribute("type", visible);

function clickOnIntroduction() {
  document.getElementById("introduction").click();
}

const altt = document.getElementById("introduction");
altt.addEventListener("click", function (event) {
  var hiddenAdminElements = document.getElementsByClassName("top_change");
  for (var i = 0; i < hiddenAdminElements.length; i++) {
    hiddenAdminElements[i].style.visibility = "visible";
  }

  // var slides = document.getElementsByClassName("top_change");
  // for (var i = 0; i < slides.length; i++) {
  //   console.log(slides.length);
  //   // slides[0].removeAttribute("hidden");
  //   console.log(slides);
  //   // document.getElementsByClassName("top_change")[0].removeAttribute("hidden");
  //   console.log("après remove", slides);
  // }
  // console.log("all", document.querySelectorAll(".top_change")[0]);
  // document.querySelectorAll(".top_change")[0].removeAttribute("hidden");
  // make_admin_change_apprear();
  // document.getElementsByClassName("top_change_0")[0].style.display = "flex";
  // document.getElementsByClassName("top_change")[0].style.display = "block";
  // var hiddenThings = document
  //   .getElementsByClassName("top_change")
  //   .setAttribute("display", "block");
});

// $("#lalala").each(function () {
//   document.getElementById("lalala").removeAttribute("hidden");
// });

// console.log("Localstorage ?", localStorage.length);
// function verifyLocalStorage() {
//   if (localStorage.length == 3) {
//     clickOnIntroduction();
//   }
// }
// verifyLocalStorage();

// Fonction  qui permet de se DECONNECTER
const log_out = document.getElementById("logOut");
log_out.addEventListener("click", function (event) {
  localStorage.removeItem("token");
  window.location.reload();
});

// function make_admin_change_apprear() {
//   var change = document.getElementsByClassName("top_change");
//   if (change.style.display === "none") {
//     change.style.display = "block";
//   } else {
//     change.style.display = "none";
//   }
// }

// Fonction qui décode le Token

if (localStorage.length == 0) {
  alert("GRAVE ERREUR, RECONNECTEZ VOUS");
  // window.location.href = "http://127.0.0.1:5500/FrontEnd/log.html";
  document.getElementById("logOut")[0].style.visibility = "hidden";
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
  clickOnIntroduction();
} else {
  alert("GRAVE ERREUR, RECONNECTEZ VOUS");
}
