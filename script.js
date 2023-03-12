let myLibrary = [];

const bookShelf = document.querySelector(".bookShelf");

function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readstatus = readStatus;
}

// may need to come back to allow direct user inputs

function addBookToLibrary(libraryArray, book) {
    libraryArray.push(book);
}

// This function will compile a complete book card to be added to a shelf.

function buildCard() {
    let cardDiv = createCardDiv();
    let cardText = createCardText();
    let removeB = createCardRemove();
    let readB = createCardRead();

    bookShelf.appendChild(cardDiv);
    cardDiv.appendChild(cardText);
    cardDiv.appendChild(removeB);
    cardDiv.appendChild(readB);
}

function createCardDiv() {
    let newCard = document.createElement("div");
    newCard.classList.add("bookCards");
    return newCard;
}

function createCardText() {
    let cardText = document.createElement("p");
    cardText.innerText = `
        Author:
        Title:
        Pages:
        Status:
    `;
    return cardText;
}

function createCardRemove() {
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    return removeButton;
}

function createCardRead() {
    let readButton = document.createElement("button");
    readButton.classList.add("read");
    return readButton;
}




// function displayBooks() {
//     for ( let i = 0; i < myLibrary.length; i++ ) {

//     }
// }