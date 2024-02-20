const registerButton = document.getElementById("btnRegister");
const loginButton = document.getElementById("btnLogin");
const registerUsername = document.getElementById("register");
const loginUsername = document.getElementById("login");

registerButton.addEventListener("click", () => {
  let newUser = {
    username: registerUsername.value,
    collection: [],
  };
  // register the user
  fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => {
    window.location.href =
      "http://127.0.0.1:5500/shelf-help-demo-build/index.html";
  });
});

loginButton.addEventListener("click", () => {
    
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((usersData) => {
      let result = usersData.filter((user) => user.username === loginUsername.value);

      if(result.length >0 ){
        // successful login
        alert("You are logged in")
        window.location.href =
        "http://127.0.0.1:5500/shelf-help-demo-build/index.html";
         
      }
      else{
        alert("Please register")
      }
     
    });
});
