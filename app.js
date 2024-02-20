import { paginate } from "./modules/bookFeatures.js";
//#region Global:Book data, DOM objects and event listeners
let bookData = [];
const bookListDiv = document.getElementById("bookList");
const loadingDiv = document.getElementById("loader");
const dropdownAuthorList = document.getElementById("authorList");
const resetButton = document.getElementById("btnReset");
const pageButtons = document.getElementById("pageButtons");
dropdownAuthorList.addEventListener("change", () => {
  // filter by the selected option author name
  filterByAuthor(dropdownAuthorList.value);
});
resetButton.addEventListener("click", () => {
  // clear bookList div
  bookListDiv.innerHTML = "";
  // show all books again
  for (const book of bookData) {
    displayBook(book);
  }
});
//#endregion

// initialize the home page
setupHomePage();

//#region API functions
// fetch book data from API
function getBookData() {
  // fetch all books and return the promise
  return fetch("http://localhost:3000/books")
    .then((response) => {
      // extract JSON data
      return response.json();
    })
    .then((bookResultData) => {
      // return book data
      return bookResultData;
    });
}
//#endregion

//#region Display/rendering functions
// initialize the home page
function setupHomePage() {
  // fetch book data and use promise
  getBookData().then((bookDataFromAPI) => {
    // store book data
    bookData = bookDataFromAPI;

    // split books over three pages
    const paginatedBooks = paginate(bookData, 3);
    // display first two books
    for (const book of paginatedBooks[0]) {
      displayBook(book);
    }

    // generate and add page buttons to dom for every two books
    let counter = 1;
    for (const bookArray of paginatedBooks) {
      const pageButton = document.createElement("button");
      pageButton.innerText = counter;
      counter++;
      // add event to show books when page button is clicked
      pageButton.addEventListener("click", () => {
        bookListDiv.innerHTML = "  ";
        for (const book of bookArray) {
          displayBook(book);
        }
      });
      pageButtons.appendChild(pageButton);
    }

    // load author options
    loadAuthorsIntoDropDown();

    // remove loading message
    loadingDiv.style.display = "none";
  });
}
// load author dropdown list
function loadAuthorsIntoDropDown() {
  for (const book of bookData) {
    // creat an option with author name
    const authorOption = document.createElement("option");
    authorOption.innerText = book.author;
    // add it to dropdown
    dropdownAuthorList.appendChild(authorOption);
  }
}
// defines a function to display a book's information in the DOM
function displayBook(book) {
  const bookDiv = document.createElement("div");
  const bookTitlePara = document.createElement("p");
  bookTitlePara.innerText = book.title;
  const bookImg = document.createElement("img");
  bookImg.src = `http://localhost:3000/assets/images/${book.coverImg}`;
  bookImg.alt = "a picture of a book";
  bookImg.addEventListener("click", () => {
    // navigate to details page
    sessionStorage.setItem("selectedBook", JSON.stringify(book));
    window.location.href = "http://127.0.0.1:5500/pages/details.html";
  });
  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookTitlePara);
  bookListDiv.appendChild(bookDiv);
}
// alternative function to create and insert the HTML to display a book but with templating
function displayBookAlt(book) {
  // Create the div element for the book
  const bookDiv = document.createElement("div");
  // Use template literals to construct the inner HTML of the bookDiv
  bookDiv.innerHTML = `
    <img src="http://localhost:3000/assets/images/${book.coverImg}" alt="a picture of a book">
    <p>${book.title}</p>
  `;
  // Append the bookDiv to the bookListDiv
  bookListDiv.appendChild(bookDiv);
}
// filter by author
function filterByAuthor(authorToFilterBy) {
  // filter the array by authors name with the filter HOF
  let filteredResults = bookData.filter(
    (book) => book.author === authorToFilterBy
  );

  // update the dom to show the new array
  // clear the old list from DOM
  bookListDiv.innerHTML = "";
  // loop through the new filtered list
  for (const book of filteredResults) {
    // display/render each book
    displayBook(book);
  }
}
//#endregion