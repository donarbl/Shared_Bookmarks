import {createUserDropdown, 
        createBookmarkForm, handleUserChange,
      } from './script.js';
import { getUserIds,getData} from "./storage.js";

// Mock the external dependencies
jest.mock('./storage.js');
describe('Bookmarks shared', () => {
  test('createUserDropdown creates a dropdown with user options', () => {
    getUserIds.mockReturnValue(['1', '2', '3']);
    createUserDropdown();
    const select = document.getElementById('userSelect');
    expect(select).toBeTruthy();
    expect(select.options.length).toBe(4); // Including the default option
  });

  test('createBookmarkForm creates a form with required fields', () => {
    createBookmarkForm();
    const form = document.getElementById('bookmarkForm');
    expect(form).toBeTruthy();
    expect(form.querySelector('#urlInput')).toBeTruthy();
    expect(form.querySelector('#titleInput')).toBeTruthy();
    expect(form.querySelector('#descriptionInput')).toBeTruthy();
  });

  test('handleUserChange displays bookmarks for selected user', () => {
    getData.mockReturnValue([{ url: 'http://example.com', title: 'Example', description: 'An example', createdAt: Date.now() }]);
    const event = { target: { value: '1' } };
    handleUserChange(event);
    expect(document.getElementById('bookmarkList')).toBeTruthy();
  });
})
