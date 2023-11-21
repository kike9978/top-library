const addBtn = document.querySelector('[data-btn="add-book"]');
const addForm = document.querySelector(".add-form");
const saveBtn = document.querySelector('[data-btn="save-book"]');
const bookTable = document.querySelector(".book-table tbody");
const emptyMessage = document.querySelector(".emptyMessage");
const addBookDialog = document.querySelector(".add-book-dialog");


let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.setIsRead = function(){
  this.isRead = !this.isRead;
}

const comerRezarAmar = new Book("Comer, rezar, amar", "Rachel McAddmans", 234, false)
myLibrary.push(comerRezarAmar);
addBook(comerRezarAmar)

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
  return myLibrary.findIndex(element => element.title === title)
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
  })

  const isReadButton = document.createElement("button")
  isReadButton.innerText = "Cambiar estatus de leído"
  isReadButton.addEventListener("click", () =>{
    myLibrary[getIndexByTitle(book.title)].setIsRead();
    resetTable();
  })

  const cellWithButton = document.createElement("td")
  cellWithButton.appendChild(elimButton);
  cellWithButton.appendChild(isReadButton);




  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", book.title)
  newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.isRead ? "Si" : "No"}</td>
  `;
  newRow.appendChild(cellWithButton)
  bookTable.appendChild(newRow);


}
addBtn.addEventListener("click", () =>
  addBookDialog.showModal()
);

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const myFormData = new FormData(addForm);

  const book = Object.fromEntries(myFormData.entries());
  addBookToLibrary(book.title, book.author, book.pages, book.isRead);
  addForm.reset();
  addBookDialog.close();
});
