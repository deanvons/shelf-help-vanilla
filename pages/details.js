// store DOM elements
const bookListDiv = document.getElementById("bookList");
// gets the selected book from session storage
const selectedBook = JSON.parse(sessionStorage.getItem("selectedBook"));

displayBookDetails(selectedBook);

// Defines a function to display a book's information in the DOM
function displayBookDetails(book) {
  const bookDiv = document.createElement("div");
  const bookTitlePara = document.createElement("p");
  bookTitlePara.innerText = book.title;
  const bookImg = document.createElement("img");
  bookImg.src = `http://localhost:3000/assets/images/${book.coverImg}`;
  bookImg.alt = "a picture of a book";
  const bookBlurb = document.createElement("p");
  const firstSentence = book.blurb.split(",")[0];
  bookBlurb.innerHTML = `<p>${firstSentence} +<span id="readMore">  ...read more</span></p>`;
  const selectBookBtn = document.createElement("button");
  selectBookBtn.addEventListener("click", () => {
    // storing book collection
    // read previous collection of books from session
    let currentCollection = sessionStorage.getItem("collectedBooks");

    // add the new book
    let updateCollection = (currentCollection += `#${book.title}`);

    // update session storage
    sessionStorage.setItem("collectedBooks", updateCollection);

    // store in users collection in API
    addBookToCollection(book, 1);
  });

  selectBookBtn.innerText = "Add to collection";

  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookTitlePara);
  bookDiv.appendChild(bookBlurb);
  bookDiv.appendChild(selectBookBtn);
  bookListDiv.appendChild(bookDiv);

  document.getElementById("readMore").addEventListener("click", () => {
    bookBlurb.innerHTML = book.blurb;
  });
}

function addBookToCollection(book, userId) {
  fetch(`http://localhost:3000/users/${userId}`)
    .then((response) => response.json())
    .then((userData) => {
      fetch("http://localhost:3000/users/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          id: userData.id,
          username: userData.username,
          collection: [...userData.collection, book.title],
        }),
      }).then((response) => console.log(response));
    });
}
