const newBookButton = document.getElementById("new-book-button");
const popupForm = document.getElementById("popup-prompt");
const popupContainer = document.querySelector(".popup-container");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const isRead = document.querySelector(".checkbox");
const submitButton = document.querySelector(".submit-button");
const mainContainer = document.getElementById("main-content");

let book = {};

let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${title} \n by ${author} \n ${pages} Pages \n ${isRead}`;
  };
}

function addBookToLibrary() {
  myLibrary.push(book);
  let bookDisplay = document.createElement("DIV");
  bookDisplay.classList.add("book-display");
  bookDisplay.innerText = book.info();
  mainContainer.appendChild(bookDisplay);
}

function displayBook() {
  myLibrary.forEach((book) => {
    console.log(book);
  });
}

submitButton.addEventListener("click", () => {
  if (isAllEntriesFilled()) {
    book = createBook();
    addBookToLibrary();
    removeOverlay();
    resetFields();
  }
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
    return false;
  } else {
    return true;
  }
}

function createBook() {
  let readStatus = isRead.checked ? "Read" : "Not Read";
  return new Book(title.value, author.value, pages.value, readStatus);
}

function onlyNumberKey(evt) {
  let ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

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
overlay.addEventListener("click", () => {
  removeOverlay();
  resetFields();
});

function displayOverlay() {
  overlay.style.display = "block";
}

//Display new book
