import { API_URL, HOST_URL } from "./env.js";

const registerButton = document.getElementById("btnRegister");
const loginButton = document.getElementById("btnLogin");
const registerUsername = document.getElementById("register");
const loginUsername = document.getElementById("login");

// add user to the API
registerButton.addEventListener("click", () => {
  let newUser = {
    username: registerUsername.value,
    collection: [],
  };
  // register the user
  fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(response=>response.json())
  .then((createdUser) => {
    // get the id assigned to the newly registered user
    sessionStorage.setItem("userId", createdUser.id);
    // redirect to home page
    window.location.href = `${HOST_URL}/index.html`;
  });
});

// check if the user is in the API (registered)
loginButton.addEventListener("click", () => {
  // gets all users
  fetch(`${API_URL}/users`)
    .then((response) => response.json())
    .then((users) => {
      // usersData is an array of all users
      // filter by the username given in the text input to check if the user exists
      let result = users.filter(
        (user) => user.username === loginUsername.value
      );

      // if the filter has a user object in it -> user is in the database: successful login
      if (result.length > 0) {
        // successful login -> store user id in session storage
        sessionStorage.setItem("userId", result[0].id);
        // redirect to home page
        window.location.href = `${HOST_URL}/index.html`;
      } else {
        alert("Username does not exist: Please register");
      }
    });
});
