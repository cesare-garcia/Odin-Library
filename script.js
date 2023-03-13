let myLibrary = [];

const bookShelf = document.querySelector(".bookShelf");
const formSpace = document.querySelector(".form-space");

const newBooks = document.querySelector(".newBook");

newBooks.addEventListener("click", (e) => {
    organizeForm();
    newBooks.disabled = true;
});

function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
}

// may need to come back to allow direct user inputs

function addBookToLibrary(libraryArray, book) {
    libraryArray.push(book);
}

// This function will compile a complete book card to be added to the shelf.

function buildCard(bookAuthor, bookTitle, bookPages, bookStatus) {
    let cardDiv = createCardDiv();
    let cardText = createCardText(bookAuthor, bookTitle, bookPages, bookStatus);
    let removeB = createCardRemove();
    let readB = createCardRead();

    bookShelf.appendChild(cardDiv);
    cardDiv.appendChild(cardText);
    cardDiv.appendChild(removeB);
    cardDiv.appendChild(readB);
}

// display books on page

function displayBooks() {
    for ( let i = 0; i < myLibrary.length; i++) {
        buildCard( myLibrary[i]["author"], myLibrary[i]["title"], myLibrary[i]["pages"] ,myLibrary[i]["readStatus"]);
    }
}

// create submission form

function organizeForm() {
    let newForm = createForm();
    let grid = gridDiv();
    let authorInput = createInput();
    let titleInput = createInput();
    let pagesInput = createInput();
    let statusInput = createInput();
    let submit = createSubmitButton();
    
    formSpace.appendChild(newForm);
    newForm.appendChild(grid);

    grid.appendChild(authorInput);
    grid.appendChild(titleInput);
    grid.appendChild(pagesInput);
    grid.appendChild(statusInput);

    newForm.appendChild(submit);
}

function createForm() {
    let newForm = document.createElement("form");
    return newForm;
}

function gridDiv() {
    let grid = document.createElement("div");
    grid.classList.add("form-grid");
    return grid;
}

function createInput() {
    let newInput = document.createElement("input");
    return newInput;
}

function createSubmitButton() {
    let submit = document.createElement("button");
    submit.classList.add("submit");
    submit.innerText = "Submit";
    return submit;
}

// card element creation functions

function createCardDiv() {
    let newCard = document.createElement("div");
    newCard.classList.add("bookCards");
    return newCard;
}

function createCardText(bookAuthor, bookTitle, bookPages, bookStatus) {
    let cardText = document.createElement("p");
    cardText.innerText = `
        Author: ${bookAuthor}
        Title: ${bookTitle}
        Pages: ${bookPages}
        Status: ${bookStatus}
    `;
    return cardText;
}

function createCardRemove() {
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.innerText = "Remove";
    return removeButton;
}

function createCardRead() {
    let readButton = document.createElement("button");
    readButton.classList.add("read");
    readButton.innerText = "Read/Unread";
    return readButton;
}