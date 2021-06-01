let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {}

function displayBook() {
  myLibrary.forEach((book) => {
    console.log(book);
  });
}

const newBookButton = document.getElementById("new-book-button");
newBookButton.addEventListener("click", () => {
  promptNewBookDetails();
  displayOverlay();
});

function promptNewBookDetails() {
  const popupForm = document.getElementById("popup-prompt");
}

const overlay = document.getElementById("popup-overlay");
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
});

function displayOverlay() {
  overlay.style.display = "block";
}
