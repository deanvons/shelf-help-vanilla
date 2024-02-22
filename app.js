// NOTE: global imports like thie -> import { setupHomePage } from "./modules/home.js";
// May cause errors if the module references a DOM element when changing pages

router();

// Runs the necessary JS for the current page
function router() {
  // gets the current url (page)
  const path = window.location.pathname;

  // If your modules reference DOM elements (ex.. const registerButton = document.getElementById("btnRegister");)
  // then you need to import the module from within the if statements as shown below to avoid errors
  
  if (path === "/index.html") {
    // setup home page
    import("./modules/home.js").then((module) => {
      module.setupHomePage();
    });
  } else if (path === "/pages/details.html") {
    // setup details page
    import("./modules/details.js").then((module) => {
      module.displayBookDetails();
    });
  } else if (path === "/pages/collection.html") {
    // setup collection page
    import("./modules/collection.js").then((module) => {
      module.displayUsersCollection();
    });
  } else if (path === "/pages/login.html") {
    // setup login page
    import("./modules/login.js").then((module) => {});
  }
}