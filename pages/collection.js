// display example user (id: 1)
displayUsersCollection(1);

function displayUsersCollection(userId) {
  getUserById(userId)
    .then((userData) => {
      // displays users collection
      for (const title of userData.collection) {
        let bookTitle = document.createElement("li");
        bookTitle.innerText = title;
        collectionList.appendChild(bookTitle);
      }
    });
}
// fetches user data
function getUserById(userId){
  return fetch(`http://localhost:3000/users/${userId}`)
    .then((response) => response.json())
    .then((userData) => {
      return userData
    });
}