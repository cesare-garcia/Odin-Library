let myLibrary = [
    {
        author: "Test1",
        title: "xx",
        pages: 42,
        readStatus: "read"
    },
    {
        author: "Test2",
        title: "yy",
        pages: 42,
        readStatus: "read"
    }
];

const bookShelf = document.querySelector(".bookShelf");

// displayBooks();

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