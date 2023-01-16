//  Chercher les différentes catégories

const tableau = fetch("http://localhost:5678/api/categories")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (categories) {
    console.log(categories);
    const categoryNames = categories.map((categorie) => categorie.name);
    console.log("zefzefzef", categoryNames);
    ajoutFiltre(categoryNames);
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
  .then(function (works) {
    console.log(works);
    const type_of_category = works.map((work) => work.categoryId);

    console.log(type_of_category);

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

function ajoutObjet(values, categoryId) {
  console.log("id", categoryId);

  for (let i = 0; i < values.length; i++) {
    console.log("tableau", values[i].categoryId);
    console.log("if", values[i].categoryId == categoryId);

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

const altt = document.getElementById("introduction");
altt.addEventListener("click", function (event) {
  document.getElementsByClassName("top_change_0")[0].style.display = "flex";
  document.getElementsByClassName("top_change_1")[0].style.display = "block";
  document.getElementsByClassName("top_change_2")[0].style.display = "block";
  document.getElementsByClassName("top_change_3")[0].style.display = "block";

  // document.getElementsByClassName("top_changes")[0].style.display = "flex";
  console.log(document.getElementsByClassName("top_changess"));
});
