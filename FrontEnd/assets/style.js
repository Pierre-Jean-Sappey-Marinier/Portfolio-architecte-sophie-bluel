//  Chercher les différentes catégories

const tableau = fetch("http://localhost:5678/api/categories")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (categories) {
    // console.log(categories);
    const categoryNames = categories.map((categorie) => categorie.name);
    // console.log("zefzefzef", categoryNames);
    ajoutFiltre(categoryNames);
  })

  .catch(function (err) {
    // Une erreur est survenue
    // console.log("Error faut refaire");
  });

//  chercher la liste des objet du back end

fetch("http://localhost:5678/api/works")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (works) {
    // console.log(works);
    const type_of_category = works.map((work) => work.categoryId);

    // console.log(type_of_category);

    ajoutObjet(works);

    const boutonf0 = document.querySelector("#f0");
    boutonf0.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutObjet(works, 1);
    });

    const boutonf1 = document.querySelector("#f1");
    boutonf1.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutObjet(works, 2);
    });

    const boutonf2 = document.querySelector("#f2");
    boutonf2.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutObjet(works, 3);
    });

    const boutonTous = document.querySelector(".a");
    boutonTous.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      ajoutObjet(works);
    });
  })

  .catch(function (err) {
    // Une erreur est survenue
    // console.log("Error faut refaire ENCORE");
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

var divsToHide = document.getElementsByClassName("top_change");
for (var i = 0; i < divsToHide.length; i++) {
  divsToHide[i].style.visibility = "collapse";
}
// document.getElementsByClassName("top_change")[0].setAttribute("type", visible);

function clickOnIntroduction() {
  document.getElementById("introduction").click();
}

const altt = document.getElementById("introduction");
altt.addEventListener("click", function (event) {
  var divsToHide = document.getElementsByClassName("top_change");
  for (var i = 0; i < divsToHide.length; i++) {
    divsToHide[i].style.visibility = "visible";
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

console.log(parseJwt(localStorage.token));
const tok = parseJwt(localStorage.token);
console.log(tok.exp * 1000, Date.now());
let date = new Date(+tok.exp * 1000).toISOString();
function isDateValid(date) {
  var d1 = new Date(date);
  var d2 = new Date(Date.now());
  if (d1 > d2) {
    console.log("something");
    return true;
  } else {
    return false;
  }
}
// si la date est valide, on donne accès au mode Admin !

if (isDateValid(date) == true) {
  console.log("action complétée");
  clickOnIntroduction();
} else {
  alert("GRAVE ERREUR, RECONNECTEZ VOUS");
}
