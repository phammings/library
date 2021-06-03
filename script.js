const newBookButton = document.getElementById("new-book-button");
const popupForm = document.getElementById("popup-prompt");
const popupContainer = document.querySelector(".popup-container");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const isRead = document.querySelector(".checkbox");
const submitButton = document.querySelector(".submit-button");

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

submitButton.addEventListener("click", () => {
  isAllEntriesFilled();
  createBook();
});

newBookButton.addEventListener("click", () => {
  promptNewBookDetails();
  displayOverlay();
});

function resetFields() {
  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.checked = false;
}

function isAllEntriesFilled() {
  if (title.value === "" || author.value === "" || pages.value === "") {
    alert("Please fill out any missing fields.");
  } else {
    removeOverlay();
    resetFields();
  }
}

function createBook() {}

function removeOverlay() {
  overlay.style.display = "none";
  popupForm.classList.remove("popup-active");
  popupContainer.classList.add("hidden");
}

function promptNewBookDetails() {
  popupForm.classList.add("popup-active");
  popupContainer.classList.remove("hidden");
}

const overlay = document.getElementById("popup-overlay");
overlay.addEventListener("click", () => removeOverlay());

function displayOverlay() {
  overlay.style.display = "block";
}

//Store user input into new book object
//Alert user if
//Display new book
