import { paginate, paginateGross } from "./modules/bookFeatures.js";

// !! Need the shelf help JSON server to be running on http://localhost:3000
const bookListDiv = document.getElementById("book-list");
const filterButton = document.getElementById("btnFilter");
const dropdownAuthorList = document.getElementById("authorList");
const resetButton = document.getElementById("btnReset");
const pageButtons = document.getElementById("pageButtons");
const loadingDiv = document.getElementById("loader");

filterButton.addEventListener("click", () => {
  let confirmFilter = confirm("You sure guy?");
  if(confirmFilter === true){
    filterByAuthor(dropdownAuthorList.value);
  }
  
});
resetButton.addEventListener("click", () => {
  bookListDiv.innerHTML = "";

  for (const book of bookData) {
    displayBook(book);
  }
});

let bookData = [];

// fetch the book data.
fetch("http://localhost:3000/books")
  .then((response) => {
    return response.json();
  })
  .then((bookResultData) => {
    bookData = bookResultData;

    const paginatedBooks = paginateGross(bookData, 3);

    for (const book of paginatedBooks[0]) {
      displayBook(book);
    }

    // create buttons
    // each button should display two books
    let counter = 1;
    for (const bookArray of paginatedBooks) {
      const pageButton = document.createElement("button");
      pageButton.innerText = counter;
      counter++;
      pageButton.addEventListener("click", () => {
        bookListDiv.innerHTML = "  ";
        for (const book of bookArray) {
          displayBook(book);
        }
      });
      pageButtons.appendChild(pageButton);
    }

    loadAuthorsIntoDropDown();

    // remove loading message
    loadingDiv.style.display = "none";
  });

// Defines a function to display a book's information in the DOM
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
    window.location.href =
      "http://127.0.0.1:5500/shelf-help-demo-build/pages/details.html";
  });
  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookTitlePara);
  bookListDiv.appendChild(bookDiv);
}

function filterByAuthor(authorToFilterBy) {
  try {
    if (authorToFilterBy === "default") {
      throw new Error("Bad Filter");
    }

    // filter the array by authors name
    let filteredResults = [];

    for (const book of bookData) {
      if (book.author === authorToFilterBy) {
        filteredResults.push(book);
      }
    }

    // update the dom to show the new array

    // clear the old list from DOM
    bookListDiv.innerHTML = "";
    // loop through the new filtered list
    for (const book of filteredResults) {
      // display/render each book
      displayBook(book);
    }
  } catch (error) {
    alert("Please select an author");
  }
}
// Alternative function to create and insert the HTML to display a book but with templating
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

function loadAuthorsIntoDropDown() {
  for (const book of bookData) {
    // creat an option with author name
    const authorOption = document.createElement("option");
    authorOption.innerText = book.author;
    // add it to dropdown
    dropdownAuthorList.appendChild(authorOption);
  }
}

