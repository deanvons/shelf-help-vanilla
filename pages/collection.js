fetch("http://localhost:3000/users/1")
  .then((response) => response.json())
  .then((userData) => {
    for (const title of userData.collection) {
      let bookTitle = document.createElement("li");
      bookTitle.innerText = title;
      collectionList.appendChild(bookTitle);
    }
  });
