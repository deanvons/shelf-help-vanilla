import { API_URL } from "./env.js";
const usernameSpan = document.getElementById('username')

export function displayUsersCollection() {
  const userId = sessionStorage.getItem('userId')
  getUserById(userId)
    .then((userData) => {
      // displays users collection
      for (const title of userData.collection) {
        let bookTitle = document.createElement("li");
        bookTitle.innerText = title;
        collectionList.appendChild(bookTitle);
      }
      usernameSpan.innerText = userData.username
    });
}
// fetches user data
function getUserById(userId){
  return fetch(`${API_URL}/users/${userId}`)
    .then((response) => response.json())
    .then((userData) => {
      return userData
    });
}