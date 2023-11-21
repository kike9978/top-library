const addBtn = document.querySelector('[data-btn="add-book"]');
const addForm = document.querySelector(".add-form");
const saveBtn = document.querySelector('[data-btn="save-book"]');
const bookTable = document.querySelector(".book-table tbody");
const emptyMessage = document.querySelector(".emptyMessage");


let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead)
  myLibrary.push(book);

  addBook(book);


  checkIfEmpty()
}

function checkIfEmpty() {
  if (myLibrary.length === 0) {
    emptyMessage.classList.remove("hidden");
  }

  else {
    emptyMessage.classList.add("hidden");
  }
}

function getIndexByTitle(title) {
  return Object.keys(myLibrary).indexOf(title)
}

function resetTable() {  

  bookTable.innerHTML = "";
  myLibrary.forEach(book => addBook(book))
  checkIfEmpty()
}

function removeBook(title) {
  myLibrary.splice(getIndexByTitle(title), 1);
  resetTable();
}

function addBook(book) {
  const elimButton = document.createElement("button")
  elimButton.innerText = "Eliminar";
  elimButton.addEventListener("click", () => {

    removeBook(title);
    console.table(myLibrary)
  })

  const cellWithElimButton = document.createElement("td")
  cellWithElimButton.appendChild(elimButton);


  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", book.title)
  newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.isRead ? "Si" : "No"}</td>
  `;
  newRow.appendChild(cellWithElimButton)
  bookTable.appendChild(newRow);


}
addBtn.addEventListener("click", () =>
  addForm.classList.toggle("hidden")
);

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const myFormData = new FormData(addForm);

  const book = Object.fromEntries(myFormData.entries());
  addBookToLibrary(book.title, book.author, book.pages, book.isRead);
  addForm.reset();
  addForm.classList.toggle("hidden");
});
