let myLibrary = [];

const bookShelf = document.querySelector(".bookShelf");
const formSpace = document.querySelector(".form-space");

const newBooks = document.querySelector(".newBook");

newBooks.addEventListener("click", (e) => {
    organizeForm();
    newBooks.disabled = true;
    let formElement = document.querySelector("form");
    // event listener for submit button. Re-enable add new book button

    const submission = document.querySelector(".submit");
    submission.addEventListener("click", (e) => {
        e.preventDefault();
        let authorAnswer = document.getElementById("author").value.toUpperCase().trim();
        let titleAnswer = document.getElementById("title").value.toUpperCase().trim();
        let pagesAnswer = document.getElementById("pages").value.toUpperCase().trim();
        let statusAnswer = document.getElementById("readStatus").value.toUpperCase().trim();

        if ( authorAnswer != "" && titleAnswer != "" && pagesAnswer != "" && statusAnswer != "" ) {
            let addedBook = new Book (authorAnswer, titleAnswer, pagesAnswer, statusAnswer);
            myLibrary.push(addedBook);
            displayBooks();
            formSpace.removeChild(formElement);
            newBooks.disabled = false;
        }
    });
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
        
        // if statement that checks to see if Object is already in array. if not, then build card.
        
        buildCard( myLibrary[i]["author"], myLibrary[i]["title"], myLibrary[i]["pages"] ,myLibrary[i]["readStatus"]);
    }
}

// create submission form. May need to refactor because there's too much happening.

function organizeForm() {
    let newForm = createForm();
    let grid = gridDiv();

    let authorInput = createInput();
    authorInput.setAttribute("id","author");
    let authorLabel = createInputLabel();
    authorLabel.setAttribute("for","author");
    authorLabel.innerText = "Author";

    let titleInput = createInput();
    titleInput.setAttribute("id","title");
    let titleLabel = createInputLabel();
    titleLabel.setAttribute("for","title");
    titleLabel.innerText = "Title";

    let pagesInput = createInput();
    pagesInput.setAttribute("id","pages");
    let pagesLabel = createInputLabel();
    pagesLabel.setAttribute("for","title");
    pagesLabel.innerText = "Number of Pages";

    let statusInput = createInput();
    statusInput.setAttribute("id","readStatus");
    statusInput.setAttribute("type","checkbox");
    let statusLabel = createInputLabel();
    statusLabel.setAttribute("for","readStatus");
    statusLabel.innerText = "Have you read it?";

    let submit = createSubmitButton();
    
    formSpace.appendChild(newForm);
    newForm.appendChild(grid);

    grid.appendChild(authorLabel);
    grid.appendChild(authorInput);

    grid.appendChild(titleLabel);
    grid.appendChild(titleInput);

    grid.appendChild(pagesLabel);
    grid.appendChild(pagesInput);

    grid.appendChild(statusLabel);
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

function createInputLabel() {
    let newLabel = document.createElement("label");
    return newLabel;
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