const newBookButton = document.getElementById("new-book-button");
const popupForm = document.getElementById("popup-prompt");
const popupContainer = document.querySelector(".popup-container");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const isRead = document.querySelector(".checkbox");
const submitButton = document.querySelector(".submit-button");
const mainContainer = document.getElementById("main-content");

let myLibrary = new Library();

let buttonValue = 0;

let bookNumber = 0;
let bookNum = 0;

function Library(books = []) {
  this.books = books;
}

Library.prototype.remove = function (bookIndex) {
  this.books.splice(bookIndex, 1);
};

Library.prototype.add = function (book) {
  this.books.push(book);
  this.displayBook(book, bookNumber);
};

Library.prototype.displayBook = function (book, index) {
  const bookDisplayable = this.createBookDisplay(book, index);
  mainContainer.appendChild(bookDisplayable);
};

Library.prototype.createBookDisplay(book, index) = function (book, index){
  let bookDisplay = document.createElement("DIV");
  bookDisplay.setAttribute("data-index", index);
  bookDisplay.classList.add("book-display");

  bookDisplay.innerText = book.info();
  createBookOptions(bookDisplay, index);
};


Library.prototype.displayAll = function () {
  this.books.forEach((book, index) => this.displayBook(book, index));
};

Library.prototype.clearDisplayedBooks = function () {
  mainContainer.innerHTML = '';
};

Library.prototype.updateDisplayedBooks = function() {
  this.clearDisplayedBooks();
  this.displayAll();
};




function Book(title, author, pages, isRead, bookNum) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.bookNum = bookNum;
}

Book.prototype.info = function () {
  return `${this.title} \n by ${this.author} \n ${this.pages} Pages`;
};

function createReadStatus(bookDisplay, index) {
  let bookReadStatus = document.createElement("BUTTON");
  bookReadStatus.value = buttonValue++;
  assignReadStatusColour(bookReadStatus, index);
  bookDisplay.appendChild(bookReadStatus);
  bookReadStatus.innerText = myLibrary[bookReadStatus.value].isRead;

  bookReadStatus.addEventListener("click", handleChangeReadStatus);
}

function assignReadStatusColour (bookReadStatus) {
  bookReadStatus.classList = buttonValue;
  if (myLibrary[bookReadStatus.value].isRead === "Read") {
    bookReadStatus.classList.add("book-read");
  } else {
    bookReadStatus.classList.add("book-not-read");
  }
};

function handleChangeReadStatus() {
  if (myLibrary[bookReadStatus.value].isRead === "Read") {
    myLibrary[bookReadStatus.value].isRead = "Not Read";
  } else {
    myLibrary[bookReadStatus.value].isRead = "Read";
  }
  bookReadStatus.innerText = myLibrary[bookReadStatus.value].isRead;
  assignReadStatusColour(bookReadStatus);
  bookDisplay.appendChild(bookReadStatus);
}

function createDeleteBookButton(bookDisplay, index) {
  let deleteBookButton = document.createElement("BUTTON");
  bookDisplay.appendChild(deleteBookButton);
  deleteBookButton.innerText = "Delete";
  deleteBookButton.addEventListener("click", handleBookDeletion)
}
function handleBookDeletion() {
  const deletedBookIndex = myLibrary.indexOf(book);
  myLibrary.splice(deletedBookIndex, 1);
  let deletedBook = document.getElementById(`${bookReadStatus.value}`);
  deletedBook.parentNode.removeChild(deletedBook);
  buttonValue--;
}

function createBookOptions(bookDisplay, index) {
  createReadStatus(bookDisplay, index);
  createDeleteBookButton(bookDisplay, index);
}

// function addBookToLibrary() {
//   myLibrary.push(book);
//   let bookDisplay = document.createElement("DIV");
//   bookDisplay.setAttribute("id", `${bookNumber++}`);
//   createBookDisplay(bookDisplay);
//   createBookOptions(bookDisplay);
//   createDeleteBookButton(bookDisplay);
// }

submitButton.addEventListener("click", () => {
  if (isAllEntriesFilled()) {
    let book = createBook();
    myLibrary.add(book);
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
  return new Book(
    title.value,
    author.value,
    pages.value,
    readStatus,
    bookNum++
  );
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
