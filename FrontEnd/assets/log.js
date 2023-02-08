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

      window.location.href = "/index.html";
    })
    .catch(function (err) {
      console.log("Error faut refaire ENCORE", err);
      console.error("Error faut refaire ENCORE", err);
    });
}
