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

// document.getElementById("email").addEventListener("change", getEmail);
// document.getElementById("password").addEventListener("change", getPass);

const button = document.getElementById("submit");
button.addEventListener("click", function (event) {
  event.preventDefault();
  const email = getEmail();
  const password = getPass();
  postFetch(email, password);
});

function postFetch(email, password) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => {
      if (response.status == "200") {
        console.log("in");

        return response.json();
      } else {
        console.log("Réponse au login", response.status);
        alert("Erreur dans l'identifiant ou le mot de passe");
      }
    })
    .then((response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);

      window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
    });
}
