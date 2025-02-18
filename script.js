// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
    const userSelect = document.getElementById("userSelect");
    const bookmarkList = document.getElementById("bookmarkList");
    const bookmarkForm = document.getElementById("bookmarkForm");

    // Dynamically fetch users from storage.js
    const users = getUserIds();

    if (users.length === 0) {
        userSelect.innerHTML = `<option disabled selected>No users available</option>`;
        return;
    }

    // Populate dropdown with users
    users.forEach(user => {
        let option = document.createElement("option");
        option.value = user;
        option.textContent = `User ${user}`;
        userSelect.appendChild(option);
    });

    // Load bookmarks when a user is selected
    userSelect.addEventListener("change", () => {
        const userId = userSelect.value;
        displayBookmarks(userId);
    });

    // Handle new bookmark submission
    bookmarkForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const userId = userSelect.value;
        if (!userId) return alert("Please select a user first!");

        const url = document.getElementById("url").value;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const timestamp = new Date().toISOString();

        const newBookmark = { url, title, description, timestamp };

        // Get existing bookmarks, add the new one, and save
        const bookmarks = getData(userId) || [];
        bookmarks.push(newBookmark);
        setData(userId, bookmarks);

        displayBookmarks(userId);
        bookmarkForm.reset();
    });

    function displayBookmarks(userId) {
        const bookmarks = getData(userId) || [];
        bookmarkList.innerHTML = "";

        if (bookmarks.length === 0) {
            bookmarkList.textContent = "No bookmarks available.";
            return;
        }

        bookmarks.reverse().forEach(bookmark => {
            const item = document.createElement("div");
            item.innerHTML = `
                <p><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></p>
                <p>${bookmark.description}</p>
                <p><small>Added on: ${new Date(bookmark.timestamp).toLocaleString()}</small></p>
                <hr>
            `;
            bookmarkList.appendChild(item);
        });
    }
});
