import { getUserIds, getData, setData } from "./storage.js";

window.onload = start;
let currentUserId = null;

function start() {
    createUserDropdown();
    createBookmarkForm();
    document.getElementById('userSelect').addEventListener('change', handleUserChange);
    document.getElementById('bookmarkForm').addEventListener('submit', handleBookmarkSubmit);
}

function createUserDropdown() {
    const users = getUserIds();
    const select = document.createElement('select');
    select.id = 'userSelect';
    select.innerHTML = '<option value="">Select a user</option>';
    users.forEach(userId => {
        const option = document.createElement('option');
        option.value = userId;
        option.textContent = `User ${userId}`;
        select.appendChild(option);
    });
    document.body.appendChild(select);
    
    const container = document.createElement('div');// div for a nicer rendering on the browser
    container.appendChild(document.createElement('br'));// spacing of the select dropdown with the rest
    document.body.appendChild(container);
}

function createBookmarkForm() {
    const formContainer = document.createElement('div')// made a container div
    const form = document.createElement('form');
    form.id = 'bookmarkForm';
    form.innerHTML = `
      <label for ="urlInput">Enter URL</label><br>
      <input type="url" id="urlInput" placeholder="Enter URL" required><br><br>
      <label for ="titleInput">Enter Title</label><br>
        <input type="text" id="titleInput" placeholder="Enter title" required><br><br>
        <label for="descriptionInput">Enter description:</label><br>
        <textarea type="text" id="descriptionInput" placeholder="Enter description" required></textarea><br><br>
        <button type="submit">Add Bookmark</button>
    `;
    document.body.appendChild(form);
}

function handleUserChange(event) {
    currentUserId = event.target.value;
    if (currentUserId) {
        displayBookmarks(currentUserId);
    } else {
        clearBookmarkDisplay();
    }
}

function displayBookmarks(userId) {
    const bookmarks = getData(userId) || [];
    const bookmarkList = document.getElementById('bookmarkList') || document.createElement('div');
    bookmarkList.id = 'bookmarkList';
    bookmarkList.innerHTML = '';

    if (bookmarks.length === 0) {
        bookmarkList.textContent = 'No bookmarks for this user.';
    } else {
        bookmarks.sort((a, b) => b.createdAt - a.createdAt).forEach((bookmark, index) => {
            const bookmarkElement = createBookmarkElement(bookmark, index);
            bookmarkList.appendChild(bookmarkElement);
        });
    }

    if (!document.getElementById('bookmarkList')) {
        document.body.appendChild(bookmarkList);
    }
}

function createBookmarkElement(bookmark, index) {
    const div = document.createElement('div');
    div.innerHTML = `
        <h3><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></h3>
        <p>${bookmark.description}</p>
        <p>Created: ${new Date(bookmark.createdAt).toLocaleString()}</p>
        <button class="deleteBtn" data-index="${index}">Delete</button>
    `;
    div.querySelector('.deleteBtn').addEventListener('click', () => deleteBookmark(index));
    return div;
}

function handleBookmarkSubmit(event) {
    event.preventDefault();
    if (!currentUserId) {
        alert('Please select a user first.');
        return;
    }

    const newBookmark = {
        url: document.getElementById('urlInput').value,
        title: document.getElementById('titleInput').value,
        description: document.getElementById('descriptionInput').value,
        createdAt: Date.now()
    };

    const bookmarks = getData(currentUserId) || [];
    bookmarks.push(newBookmark);
    setData(currentUserId, bookmarks);
    displayBookmarks(currentUserId);
    event.target.reset();
}

function deleteBookmark(index) {
    const bookmarks = getData(currentUserId) || [];
    bookmarks.splice(index, 1);
    setData(currentUserId, bookmarks);
    displayBookmarks(currentUserId);
}




