// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

  const users = getUserIds();// fetches user from storage.js dynamically instead of hard code, user1, user2
  if (users.length === 0){
    userSelect.innerHTML = `<option disabled chosen>No users available<option>`;
    return;
  }
  // this function is for dropdown so that it is filled with users
  users.forEach(user =>{
    let option = document.createElement ("option");
    option.value =user;
    option.textContent =`User ${user}`;
    userSelect.appendChild(option);
  });

function DisplayBookmarks (userId){
  const bookmarks =GetData(userId) || [];
  bookmarkList.innerHTML = "";
  if (bookmarks.length === 0){
    bookmarkList.textContent = "No bookmarks available";
    return;
  }
bookmarks.reverse().forEach(bookmark =>{// .reverse method allows to see the most recent bookmarks first
const item = document.createElement ("div");

item.innerHTML = `
    <p><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></p>
    <p>${bookmark.description}</p>
    <p><small>Added on: ${new Date(bookmark.timestamp).toLocaleString()}</small></p>
    <hr>
`;
  bookmarkList.appendChild(item);
});
}

bookmarkForm.addEventListener("submit", (event)=>{
  event.preventDefault(); // doesn't allow the page reload
  const userId= userSelect.value;
  if(!userId) return alert ("Please select a user first ");
  
  const url = document.getElementById("url").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const timestamp = New Date().toISOString();
  
  const NewBookmark = {url, title, description, timestamp};

  const bookmarks = getData(userId) || [];// gets and updates the user's bookmarks
  bookmarks.push(NewBookmark);
  setData(userId, bookmarks);

  DisplayBookmarks(userId); // this refreshes display 
  bookmarkForm.reset(); // this clears the form 

});

document.addEventListener("DOMContentLoaded", () => {
    const userSelect = document.getElementById("userSelect");
    const bookmarkList = document.getElementById("bookmarkList");
    const bookmarkForm = document.getElementById("bookmarkForm");
});