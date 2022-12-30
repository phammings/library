const newBookButton = document.getElementById("new-book-button");
const popupForm = document.getElementById("popup-prompt");
const popupMissingField = document.getElementById("popup-missing-fields");
const popupContainer = document.querySelector(".popup-container");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const isRead = document.querySelector(".checkbox");
const submitButton = document.querySelector(".submit-button");
const mainContainer = document.getElementById("main-content");

function Library(books = []) {
  this.books = books;
}

const myLibrary = new Library();

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
function handleBookDeletion(event) {
  const index = event.target.parentElement.getAttribute("data-index");
  myLibrary.remove(index);
  myLibrary.updateDisplayedBooks();
}

function createReadStatus(bookDisplay, index) {
  const bookReadStatus = document.createElement("BUTTON");
  assignReadStatusColour(bookReadStatus, index);
  bookReadStatus.innerText = myLibrary.books[index].isRead;
  bookDisplay.appendChild(bookReadStatus);

  bookReadStatus.addEventListener("click", handleChangeReadStatus);
}

function createDeleteBookButton(bookDisplay) {
  const deleteBookButton = document.createElement("BUTTON");
  deleteBookButton.innerText = "Delete";
  bookDisplay.appendChild(deleteBookButton);

  deleteBookButton.addEventListener("click", handleBookDeletion);
}

Library.prototype.remove = function remove(bookIndex) {
  this.books.splice(bookIndex, 1);
};

Library.prototype.add = function add(book) {
  this.books.push(book);
};

Library.prototype.createBookDisplay = function createBookDisplay(book, index) {
  const bookDisplay = document.createElement("DIV");
  bookDisplay.classList.add("book-display");
  bookDisplay.innerText = book.info();

  bookDisplay.setAttribute("data-index", index);

  createReadStatus(bookDisplay, index);
  createDeleteBookButton(bookDisplay);

  return bookDisplay;
};

Library.prototype.displayBook = function displayBook(book, index) {
  const bookDisplay = this.createBookDisplay(book, index);
  mainContainer.appendChild(bookDisplay);
};

Library.prototype.displayAll = function displayAll() {
  this.books.forEach((book, index) => this.displayBook(book, index));
};

Library.prototype.clearDisplayedBooks = function clearDisplayedBooks() {
  mainContainer.innerHTML = "";
};

Library.prototype.updateDisplayedBooks = function updateDisplayedBooks() {
  this.clearDisplayedBooks();
  this.displayAll();
};

function Book(givenTitle, givenAuthor, givenPages, givenIsRead) {
  this.title = givenTitle;
  this.author = givenAuthor;
  this.pages = givenPages;
  this.isRead = givenIsRead;
}

Book.prototype.info = function info() {
  return `${this.title} \n by ${this.author} \n ${this.pages} Pages`;
};

function resetFields() {
  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.checked = false;
}

function isAllEntriesFilled() {
  if (title.value === "" || author.value === "" || pages.value === "") {
    popupMissingField.classList.add("popup-missing-field-active");
    popupMissingField.classList.remove("hidden");
    // setTimeout(() => {
    //   popupMissingField.classList.add("hidden");
    // }, 1000);
    // event.preventDefault();
    return false;
  }
  return true;
}

function createBook() {
  const readStatus = isRead.checked ? "Read" : "Not Read";
  return new Book(title.value, author.value, pages.value, readStatus);
}

const overlay = document.getElementById("popup-overlay");
function removeOverlay() {
  overlay.style.display = "none";
  popupForm.classList.remove("popup-active");
  popupContainer.classList.add("hidden");
}

overlay.addEventListener("click", () => {
  removeOverlay();
  resetFields();
});

function displayOverlay() {
  overlay.style.display = "block";
}

function promptNewBookDetails() {
  popupForm.classList.add("popup-active");
  popupContainer.classList.remove("hidden");
}

submitButton.addEventListener("click", (event) => {
  if (isAllEntriesFilled()) {
    const book = createBook();
    myLibrary.add(book);
    myLibrary.updateDisplayedBooks();
    removeOverlay();
    resetFields();
  }
  event.preventDefault();
});

newBookButton.addEventListener("click", () => {
  promptNewBookDetails();
  displayOverlay();
});
