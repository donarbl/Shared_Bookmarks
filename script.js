// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

window.onload = function () {
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
  document.querySelector("body").innerText = `There are ${users.length} users`;
};
