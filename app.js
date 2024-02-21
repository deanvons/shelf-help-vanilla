//#region Global:Book data, DOM objects and event listeners
const path = window.location.pathname;
console.log(path);
// routing
router();

//#region Display/rendering functions
// initialize the home page

function router() {
  const path = window.location.pathname;

  if (path === "/index.html") {
    // setup home page
    import("./modules/home.js").then((module) => {
      module.setupHomePage();
    });
  } else if (path === "/pages/details.html") {
    // setup home page
    import("./pages/details.js").then((module) => {
      module.displayBookDetails();
    });
  }
  else if (path === "/pages/collection.html") {
    // setup home page
    import("./pages/collection.js").then((module) => {
      module.displayUsersCollection(1);
    });
  }
  
  else if (path === "/pages/login.html") {
    // setup home page
    import("./pages/login.js").then((module) => {
      
    });
  }
}
//#endregion
