let overlayElement = document.querySelector(".overlayElement");
let addNewBook = document.querySelector(".addNewBook");
let submitInformation = document.querySelector("[type=submit]");
let form = document.querySelector("form");
let main = document.querySelector("main");

let myLibrary = [];

addNewBook.addEventListener("click", (e) => {
    overlayElement.setAttribute("id","overlay");
    form.hidden = false;
});

submitInformation.addEventListener("click", (e) => {
    e.preventDefault();

    let authorInput = document.querySelector("#authorName").value.toUpperCase().trim();
    let titleInput = document.querySelector("#title").value.toUpperCase().trim();
    let pagesInput = document.querySelector("#numberOfPages").value.trim();
    let statusInput = document.querySelector("#readStatus").checked;
    if ( statusInput == true ) {
        statusInput = "READ";
    } else {
        statusInput = "UNREAD";
    }

    if ( authorInput != "" && titleInput != "" && pagesInput != "" ) {
        let submittedBook = new Book (authorInput, titleInput, pagesInput, statusInput);
        console.log(submittedBook);
        let duplicateTest = myLibrary.some( (e) => e["author"] == submittedBook["author"] && e["title"] == submittedBook["title"] );

        if ( duplicateTest == true ) {
            alert("This library does not accept duplicates.");
        } else {
            addBookToLibrary(submittedBook);
    
            form.reset();
            overlayElement.removeAttribute("id");
            form.hidden = true;
    
            displayBooks(myLibrary);
    
        }
    }
});

function Book(authorName, title, pages, readStatus) {
    this.author = authorName;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBooks(libraryArray) {

    for (let i = 0; i < libraryArray.length; i++) {
        let newCard = buildBookCard(libraryArray[i]["author"], libraryArray[i]["title"], libraryArray[i]["pages"], libraryArray[i]["readStatus"]);
        main.appendChild(newCard);
    }

}

function buildBookCard(bookAuthor, bookTitle, bookPages, bookStatus) {
    let bookCardDiv = document.createElement("div");
    bookCardDiv.classList.add("bookCard");
    let cardText = document.createElement("p");
    cardText.classList.add("cardText");
    cardText.innerText = `Author: ${bookAuthor}
        Title: ${bookTitle}
        Pages: ${bookPages}
        Status: ${bookStatus}
    `;
    let cardButtonBox = document.createElement("div");
    cardButtonBox.classList.add("cardButtonBox");
    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    let readButton = document.createElement("button");
    readButton.innerText = "Read/Unread?";

    bookCardDiv.appendChild(cardText);
    bookCardDiv.appendChild(cardButtonBox);
    cardButtonBox.appendChild(removeButton);
    cardButtonBox.appendChild(readButton);

    return bookCardDiv;
}