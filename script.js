// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

window.onload = function(){
// Dynamically fetch users from storage.js
    const users = getUserIds();
    const body = document.querySelector("body");
    
    const userSelect = document.createElement("select");
    userSelect.id = "userDropdown";
}    
// Populate dropdown with users
users.forEach(user => {
  let option = document.createElement("option");
  option.value = userId;
  option.textContent = `User ${user}`;
  userSelect.appendChild(option);
  });
body.appendChild(userSelect);

// a container to display bookmarks
const bookmarkList = document.createElement ("div");
bookmarkList.id = "bookmarkListing";
body.appendChild(bookmarkList);

// creation of a form to add bookmarks
const form = document.createElement("form");
form.id =" bookmarkForm";
form.innerHTML =`
<input type ="type" id ="bookmarkURL" placeholder ="Bookmark URL" required />
<input type ="text" id= "bookmarkTitle" placeholder = "Title" required></input>
<input type ="bookmarkDescription" placeholder ="Description" required></input>
<button type = "submit">Add Bookmark</button>
`;
body.appendChild(form);

userSelect.addEventListener("change",()=> loadBookmarks(userSelect.value) );// loads bookmarks when user changes
form.addEventListener("submit",event =>{event.preventDefault();
  addBookmark(userSelect.value);//the form submission
  
})