

// Defines a function to display a book's information in the DOM
export function displayBookDetails() {
  // gets the selected book from session storage
const book = JSON.parse(sessionStorage.getItem("selectedBook"));
  // create and load elements into div to show book details
  const bookListDetailsDiv = document.getElementById('bookList')
  const bookDiv = document.createElement("div");
  const bookTitlePara = document.createElement("p");
  bookTitlePara.innerText = book.title;
  const bookImg = document.createElement("img");
  bookImg.src = `http://localhost:3000/assets/images/${book.coverImg}`;
  bookImg.alt = "a picture of a book";
  const bookBlurb = document.createElement("p");

  // read more feature, only shows the text before the first comma (,)
  const firstSentence = book.blurb.split(",")[0];
  bookBlurb.innerHTML = `<p>${firstSentence} +<span id="readMore">  ...read more</span></p>`;
  const selectBookBtn = document.createElement("button");

  selectBookBtn.addEventListener("click", () => {
  // store in users collection in API -> NOTE: this replaces the previous session storage approach for the collection
    addBookToCollection(book, 1);
  });

  selectBookBtn.innerText = "Add to collection";

  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookTitlePara);
  bookDiv.appendChild(bookBlurb);
  bookDiv.appendChild(selectBookBtn);
  bookListDetailsDiv.appendChild(bookDiv);

  // read more feature logic
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