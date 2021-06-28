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

let buttonValue = 0;

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} \n by ${this.author} \n ${this.pages} Pages`;
  };
}

function createBookDisplay(bookDisplay) {
  bookDisplay.classList.add("book-display");
  bookDisplay.innerText = book.info();
  mainContainer.appendChild(bookDisplay);
}

function assignReadStatusColour(bookReadStatus) {
  bookReadStatus.classList = buttonValue;
  if (myLibrary[bookReadStatus.value].isRead === "Read") {
    bookReadStatus.classList.add("book-read");
  } else {
    bookReadStatus.classList.add("book-not-read");
  }
}

function createBookReadStatus(bookDisplay) {
  let bookReadStatus = document.createElement("BUTTON");
  bookReadStatus.value = buttonValue++;
  assignReadStatusColour(bookReadStatus);
  bookDisplay.appendChild(bookReadStatus);
  bookReadStatus.innerText = myLibrary[bookReadStatus.value].isRead;

  bookReadStatus.addEventListener("click", () => {
    if (myLibrary[bookReadStatus.value].isRead === "Read") {
      myLibrary[bookReadStatus.value].isRead = "Not Read";
    } else {
      myLibrary[bookReadStatus.value].isRead = "Read";
    }
    bookReadStatus.innerText = myLibrary[bookReadStatus.value].isRead;
    bookDisplay.innerText = book.info();
    mainContainer.appendChild(bookDisplay);
    assignReadStatusColour(bookReadStatus);
    bookDisplay.appendChild(bookReadStatus);
  });
}

function addBookToLibrary() {
  myLibrary.push(book);
  let bookDisplay = document.createElement("DIV");
  createBookDisplay(bookDisplay);
  createBookReadStatus(bookDisplay);
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
  isRead.checked = false;
}

const overlay = document.getElementById("popup-overlay");
overlay.addEventListener("click", () => {
  removeOverlay();
  resetFields();
});

function displayOverlay() {
  overlay.style.display = "block";
}

//Have option to delete book from library and shift to fill
//in empty array spot
