/* eslint-disable*/
const newBookButton = document.getElementById("new-book-button");
const popupForm = document.getElementById("popup-prompt");
const popupContainer = document.querySelector(".popup-container");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const isRead = document.querySelector(".checkbox");
const submitButton = document.querySelector(".submit-button");
const mainContainer = document.getElementById("main-content");

const myLibrary = new Library();

function Library(books = []) {
  this.books = books;
}

Library.prototype.remove = function (bookIndex) {
  this.books.splice(bookIndex, 1);
};

Library.prototype.add = function (book) {
  this.books.push(book);
};

Library.prototype.displayBook = function (book, index) {
  const bookDisplay = createBookDisplay(book, index);
  mainContainer.appendChild(bookDisplay);
};

Library.prototype.displayAll = function () {
  this.books.forEach((book, index) => this.displayBook(book, index));
};

Library.prototype.clearDisplayedBooks = function () {
  mainContainer.innerHTML = "";
};

Library.prototype.updateDisplayedBooks = function () {
  this.clearDisplayedBooks();
  this.displayAll();
};

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  return `${this.title} \n by ${this.author} \n ${this.pages} Pages`;
};

function createBookDisplay(book, index) {
  const bookDisplay = document.createElement("DIV");
  bookDisplay.classList.add("book-display");
  bookDisplay.innerText = book.info();

  bookDisplay.setAttribute("data-index", index);

  createReadStatus(bookDisplay, index);
  createDeleteBookButton(bookDisplay, index);

  return bookDisplay;
}

function assignReadStatusColour(bookReadStatus, index) {
  if (myLibrary.books[index].isRead === "Read") {
    bookReadStatus.classList.remove("book-not-read");
    bookReadStatus.classList.add("book-read");
  } else {
    bookReadStatus.classList.remove("book-read");
    bookReadStatus.classList.add("book-not-read");
  }
}

function handleChangeReadStatus(event) {
  const index = event.target.parentElement.getAttribute("data-index");
  const bookReadStatus = event.target;
  if (myLibrary.books[index].isRead === "Read") {
    myLibrary.books[index].isRead = "Not Read";
  } else {
    myLibrary.books[index].isRead = "Read";
  }
  assignReadStatusColour(bookReadStatus, index);
  bookReadStatus.innerText = myLibrary.books[index].isRead;
}

function createReadStatus(bookDisplay, index) {
  const bookReadStatus = document.createElement("BUTTON");
  assignReadStatusColour(bookReadStatus, index);
  bookReadStatus.innerText = myLibrary.books[index].isRead;
  bookDisplay.appendChild(bookReadStatus);

  bookReadStatus.addEventListener("click", handleChangeReadStatus);
}

function handleBookDeletion(event) {
  const index = event.target.parentElement.getAttribute("data-index");
  myLibrary.remove(index);
  myLibrary.updateDisplayedBooks();
}

function createDeleteBookButton(bookDisplay, index) {
  const deleteBookButton = document.createElement("BUTTON");
  deleteBookButton.innerText = "Delete";
  bookDisplay.appendChild(deleteBookButton);

  deleteBookButton.addEventListener("click", handleBookDeletion);
}

submitButton.addEventListener("click", () => {
  if (isAllEntriesFilled()) {
    const book = createBook();
    myLibrary.add(book);
    myLibrary.updateDisplayedBooks();
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
  }
  return true;
}

function createBook() {
  const readStatus = isRead.checked ? "Read" : "Not Read";
  return new Book(title.value, author.value, pages.value, readStatus);
}

function onlyNumberKey(evt) {
  const ASCIICode = evt.which ? evt.which : evt.keyCode;
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
  // isRead.checked = false;
}

const overlay = document.getElementById("popup-overlay");
overlay.addEventListener("click", () => {
  removeOverlay();
  resetFields();
});

function displayOverlay() {
  overlay.style.display = "block";
}
