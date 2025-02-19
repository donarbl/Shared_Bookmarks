import {
  handleBookmarkSubmit,
} from "./script.js";

describe("handleBookmarkSubmit", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="bookmarkForm">
        <input id="urlInput" value="https://test.com" />
        <input id="titleInput" value="Test" />
        <textarea id="descriptionInput">Description</textarea>
      </form>
    `;
    jest.clearAllMocks();
  });

  it("should add a new bookmark", () => {
    jest.spyOn(Storage, "getData").mockReturnValue([]);
    const setDataSpy = jest.spyOn(Storage, "setData").mockImplementation();

    handleBookmarkSubmit({ preventDefault: jest.fn() });
    expect(setDataSpy).toHaveBeenCalled();
  });

  it("should handle missing user selection", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();
    handleBookmarkSubmit({ preventDefault: jest.fn() });
    expect(alertSpy).toHaveBeenCalledWith("Please select a user first.");
  });

  it("should handle invalid URL format", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();
    document.getElementById("urlInput").value = "invalid-url";
    handleBookmarkSubmit({ preventDefault: jest.fn() });
    expect(alertSpy).toHaveBeenCalled();
  });
});
