const newBookButton = document.getElementById("new-book-button");
const popupForm = document.getElementById("popup-prompt");
const popupContainer = document.querySelector(".popup-container");
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

newBookButton.addEventListener("click", () => {
  promptNewBookDetails();
  displayOverlay();
});

function promptNewBookDetails() {
  popupForm.classList.add("popup-active");
  popupContainer.classList.remove("hidden");
}

const overlay = document.getElementById("popup-overlay");
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  popupForm.classList.remove("popup-active");
  popupContainer.classList.add("hidden");
});

function displayOverlay() {
  overlay.style.display = "block";
}
