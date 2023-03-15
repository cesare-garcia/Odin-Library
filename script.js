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
        let duplicateTest = myLibrary.some( (e) => e["author"] == submittedBook["author"] && e["title"] == submittedBook["title"] );

        if ( duplicateTest == true ) {
            alert("This library does not accept duplicates.");
        } else {
            addBookToLibrary(submittedBook);
    
            form.reset();
            overlayElement.removeAttribute("id");
            form.hidden = true;
    
            displayBooks(myLibrary);

            let removeBookButtons = document.querySelectorAll(".removeBookNow");
            removeBookButtons.forEach( e => e.addEventListener("click", (e) => {
                if (e.target) {
                    let cardIndex = e.target.getAttribute("data-index");                    
                    let removedItem = document.querySelector(`div[data-index="${cardIndex}"`);
                    let bookShelf2 = document.querySelector(".bookShelf");
                    bookShelf2.removeChild(removedItem);
                } 
            }));

            let readUnreadStatus = document.querySelectorAll(".read-unread");
            readUnreadStatus.forEach( e => e.addEventListener("click", (e) => {
                if (e.target) {
                    console.log(e.target);
                } 
            }));
        }  
    }
});

function Book(authorName, title, pages, readStatus) {
    this.author = authorName;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.changeStatus = function() {
    if ( this.readStatus == "READ" ) {
        this.readStatus = "UNREAD";
    } else {
        this.readStatus = "READ";
    }
};

Book.prototype.buildBook = function(arrayIndex) {
    let bookCardDiv = document.createElement("div");
    bookCardDiv.classList.add("bookCard");
    bookCardDiv.setAttribute("data-index",`${arrayIndex}`);
    let cardText = document.createElement("p");
    cardText.classList.add("cardText");
    cardText.innerText = `Author: ${this.author}
        Title: ${this.title}
        Pages: ${this.pages}
    `;
    let statusText = document.createElement("p");
    statusText.classList.add("cardText");
    // Then I can querySelect, change inner text to match the relevant thing. maybe
    statusText.classList.add("statusText");
    statusText.innerText = `Status: ${this.readStatus}`;

    let cardButtonBox = document.createElement("div");
    cardButtonBox.classList.add("cardButtonBox");
    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("removeBookNow");
    removeButton.setAttribute("data-index",`${arrayIndex}`);
    let readButton = document.createElement("button");
    readButton.innerText = "Read/Unread?";
    readButton.classList.add("read-unread");

    bookCardDiv.appendChild(cardText);
    bookCardDiv.appendChild(statusText);
    bookCardDiv.appendChild(cardButtonBox);
    cardButtonBox.appendChild(removeButton);
    cardButtonBox.appendChild(readButton);

    return bookCardDiv;
};

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBooks(libraryArray) {

    let bookShelfPresence = document.querySelector(".bookShelf");
    if ( bookShelfPresence == null ) {
        let bookShelf = document.createElement("div");
        bookShelf.classList.add("bookShelf");
        main.appendChild(bookShelf);

        for (let i = 0; i < libraryArray.length; i++) {
            let newCard = myLibrary[i].buildBook(i);
            bookShelf.appendChild(newCard);
        }
    } else {
        main.removeChild(bookShelfPresence);
        let bookShelf = document.createElement("div");
        bookShelf.classList.add("bookShelf");
        main.appendChild(bookShelf);
        
        for (let i = 0; i < libraryArray.length; i++) {
            let newCard = myLibrary[i].buildBook(i);
            bookShelf.appendChild(newCard);
        }
    }    
}