// Création d'un FETCH pour varifier les log enregistrer
// dans le back end ?

// fetch("http://localhost:5678/api/users/login")
//   .then(function (res) {
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then(function (categories) {
//     console.log(categories);
//     console.log("euuuuu");
//   })

//   .catch(function (err) {
//     // Une erreur est survenue
//     console.log("Error faut refaire");
//   });

// // Fonction de validation de Mot de Passe

// function check() {
//   if (document.getElementById("password").value == "password") return true;
//   else {
//     document.getElementById("error").innerHTML = "Wrong keyword entry.";
//     return false;
//   }
// }

// var form = document.querySelector("form");
// console.log("Nombre de champs de saisie : " + form.elements.length); // Affiche 10
// console.log(form.elements[0].name); // Affiche "pseudo"
// console.log(form.elements.mdp.type); // Affiche "password"

// function sendOrder() {
//   const email = JSON.parse(localStorage.getItem("email"));
//   const mdp = JSON.parse(localStorage.getItem("password"));
//   // Regrouper infos client + produits et montant total
//   const customerOrder = JSON.stringify({ email, password });
//   // Si les 6 inputs sont validés (6 bordures vertes)
//     fetch(urlApi + "order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: customerOrder,
//     })
//       .then(function (response) {
//         // Récupérer la réponse en JSON
//         return response.json();
//       })
//       .then(function (response) {
//         // Stocker l'objet qui regroupe les infos client + produits et le montant total dans le navigateur
//         localStorage.setItem("customerOrder", customerOrder);
//         localStorage.removeItem("cart");
//         localStorage.removeItem("products");
//         localStorage.removeItem("contact");
//         localStorage.setItem("orderId", response.orderId);
//         window.location.href =
//           "orderConfirmation.html?orderId=" + response.orderId;
//       })
//       .catch(function (error) {
//         // Une erreur s'est produit
//         alert("Erreur lors de l'envoi de la commande");
//       });
//     // Si les 6 inputs ne sont pas validés
//   } else {
//     alert("Veuillez correctement remplir le formulaire !");
//   }
// }

// function login() {
//   fetch("http://localhost:5678/api/users/login")
//     .then((res) => {
//       if (res.status == 200) {
//         return res.json();
//       } else {
//         throw Error(res.statusText);
//       }
//     })
//     .then((data) => {
//       localStorage.setItem("token", data.token);
//       logResponse(
//         "loginResponse",
//         `localStorage set with token value: ${data.token}`
//       );
//     })
//     .catch(console.error);
// }

// Fonction pour

function getEmail() {
  var x = document.getElementById("email");
  console.log(x);
  console.log("valeur email", x.value);
  return x;
}

function getPass() {
  var y = document.getElementById("password");
  console.log(y);
  console.log("valeur mdp", y.value);
  return y;
}

document.getElementById("email").addEventListener("change", getEmail);
document.getElementById("password").addEventListener("change", getPass);

const elt = document.getElementById("submit"); // On récupère l'élément sur lequel on veut détecter le clic
elt.addEventListener("click", function (event) {
  // On écoute l'événement click
  event.preventDefault();
  const email = getEmail();
  const password = getPass();
  postFetch(email, password);
});

function postFetch(s, d) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: s.value,
      password: d.value,
    }),
  }).then((response) => {
    console.log(response);

    return response.json();
  });
  // .then((result) => {
  //   if (result.message === "SUCCESS") {
  //     alert("You are logged in.");
  //     this.goToMain();
  //   } else {
  //     alert("Please check your login information.");
  //   }
  // });
}
