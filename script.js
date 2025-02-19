// Import the storage functions from storage.js
import { getUserIds, getData, setData } from "./storage.js";

const BookmarkManager ={
  currentUserId:null, 

  start (){
    this.createUserDropdown();
    this.createBookmarkForm();
    this.setupEventListener();
  },
createUserDropdown(){
  const users = getUserIds();
  const userSelect = document.createElement("select");
  userSelect.id = "userSelect";
  select.innerHTML ='<option value ="">Select a user<?/option>';
  users.forEach(userId => {
    const option = document.createElement("option");
    option.value = userId;
    option.innerText = `User ${userId}`;
    userSelect.appendChild(option);
  });
  document.body.appendChild(select);
}
  
  
  
  
  // Create a container to display bookmarks
  const bookmarkList = document.createElement("div");
  bookmarkList.id = "bookmarkList";
  body.appendChild(bookmarkList);
  
  // Create a form to add bookmarks
  createBookmarkForm (){
  const form = document.createElement("form");
  form.id = "bookmarkForm";
  form.innerHTML = `
    <input type="url" id="urlInput" placeholder=enter URL" required>
    <input type="text" id="titleInput" placeholder="enter Title" required>
    <textarea id="descriptionInput" placeholder="enter Description" required></textarea>
    <button type="submit">Add Bookmark</button>
  `;
  document.body.appendChild(form);
  },

  // Load bookmarks when user changes
  userSelect.addEventListener("change", () => loadBookmarks(userSelect.value));
  
  // Handle form submission
  form.addEventListener("submit", event => {
    event.preventDefault();
    addBookmark(userSelect.value);
  });
  
  // // Load bookmarks for the first user on page load
  loadBookmarks(userSelect.value);
};

// 2. Load and display bookmarks
function loadBookmarks(userId) {
  const bookmarkList = document.getElementById("bookmarkList");
  bookmarkList.innerHTML = ""; // Clear previous bookmarks

  const bookmarks = getData(userId) || [];
  
  if (bookmarks.length === 0) {
    bookmarkList.innerText = "No bookmarks available.";
    return;
  }

  // Sort bookmarks in reverse chronological order
  bookmarks.sort((a, b) => b.timestamp - a.timestamp);

  bookmarks.forEach(bookmark => {
    const bookmarkItem = document.createElement("div");
    bookmarkItem.innerHTML = `
      <p><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></p>
      <p>${bookmark.description}</p>
      <p><small>Created at: ${new Date(bookmark.timestamp).toLocaleString()}</small></p>
      <hr>
    `;
    bookmarkList.appendChild(bookmarkItem);
  });
}

// 3. Add a new bookmark
function addBookmark(userId) {
  const url = document.getElementById("bookmarkUrl").value;
  const title = document.getElementById("bookmarkTitle").value;
  const description = document.getElementById("bookmarkDescription").value;

  if (!url || !title || !description) {
    alert("All fields are required!");
    return;
  }

  const newBookmark = {
    url,
    title,
    description,
    timestamp: Date.now(),
  };

  // Get existing bookmarks, update and save them
  const bookmarks = getData(userId) || [];
  bookmarks.push(newBookmark);
  setData(userId, bookmarks);

  // Refresh the displayed bookmarks
  loadBookmarks(userId);

  // Clear the form inputs
  document.getElementById("bookmarkForm").reset();
}
