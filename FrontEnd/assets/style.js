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
// const el = document.getElementById("introduction");
// const altt = document.getElementById("introduction"); // On récupère l'élément sur lequel on veut détecter le clic
// altt.addEventListener("click", function (event) {
//   document.getElementsByClassName("top_change").style.display = "block";
//   event.preventDefault();
// });

// el.addEventListener("click", function () {
//   //   document.getElementsByClassName("top_change")[0].style.visibility = "visible";
//   document.getElementsByClassName("top_change").style.display = "block";
// });

// document.getElementById("introduction").onclick = function fun() {
// document.getElementsByClassName("top_change")[0].style.visibility = "visible";
// for (let el of document.querySelectorAll(".top_change"))
//   el.style.visibility = "hidden";
// [].forEach.call(document.querySelectorAll(".top_change"), function (el) {
//   el.style.visibility = "hidden";
// });
//   document.getElementsByClassName("top_change").style.display = "block";
// };

function clickOnIntroduction() {
  document.getElementById("introduction").click();
}

const altt = document.getElementById("introduction");
altt.addEventListener("click", function (event) {
  // make_admin_change_apprear();
  document.getElementsByClassName("top_change_0")[0].style.display = "flex";
  document.getElementsByClassName("top_change_1")[0].style.display = "block";
  document.getElementsByClassName("top_change_2")[0].style.display = "block";
  document.getElementsByClassName("top_change_3")[0].style.display = "block";

  // document.getElementsByClassName("top_changes")[0].style.display = "flex";
  console.log(document.getElementsByClassName("top_changess"));
});

// console.log("Localstorage ?", localStorage.length);
// function verifyLocalStorage() {
//   if (localStorage.length == 3) {
//     clickOnIntroduction();
//   }
// }
// verifyLocalStorage();

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
if (localStorage.length == 0) {
  alert("GRAVE ERREUR, RECONNECTEZ VOUS");
  window.location.href = "http://127.0.0.1:5500/FrontEnd/log.html";
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

console.log(parseJwt(localStorage.token));
const tok = parseJwt(localStorage.token);
let date = new Date(+tok.exp * 1000).toISOString();
// console.log(tok.exp);
// console.log("DEBUG::try", new Date(+tok.exp * 1000).toISOString());
function compare(date) {
  var d1 = new Date(date); //yyyy-mm-dd
  var d2 = new Date(Date.now()); //yyyy-mm-dd
  if (d1 > d2) {
    console.log("someting");
    return true;
  } else {
    return false;
  }
}

console.log("Comparaison des deux dates", compare(date));

console.log("DATE EXPIRATION TOKEN", date);

console.log("date du jour", Date.now());

if (compare(date) == true) {
  console.log("action complétée");
  clickOnIntroduction();
} else {
  alert("GRAVE ERREUR, RECONNECTEZ VOUS");
}
