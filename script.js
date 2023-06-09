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
// 

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
        // let submittedBook = new Book (authorInput, titleInput, pagesInput, statusInput);

        let submittedBook = new LibraryBook(authorInput, titleInput, pagesInput, statusInput);
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

            let removeBookButtons = document.querySelectorAll(".removeBookNow");
            removeBookButtons.forEach( e => e.addEventListener("click", (e) => {
                if (e.target) {
                    let cardIndex = e.target.getAttribute("data-index");
                    let removedItem = document.querySelector(`div[data-index="${cardIndex}"]`);
                    let bookShelf2 = document.querySelector(".bookShelf");
                    bookShelf2.removeChild(removedItem);
                    myLibrary.splice(cardIndex, 1);

                    let remainingCards = document.querySelectorAll(".bookCard");
                    let remainingStatus = document.querySelectorAll(".statusText");
                    let remainingRemove = document.querySelectorAll("button.removeBookNow");
                    let remainingRead = document.querySelectorAll("button.read-unread");
                    for ( let i = 0; i < remainingCards.length; i++ ) {
                        console.log(remainingCards[i]);
                        remainingCards[i].setAttribute("data-index",`${i}`);
                        remainingStatus[i].setAttribute("data-index",`${i}`);
                        remainingRemove[i].setAttribute("data-index",`${i}`);
                        remainingRead[i].setAttribute("data-index",`${i}`);
                    }
                } 
            }));

            let readUnreadStatus = document.querySelectorAll(".read-unread");
            readUnreadStatus.forEach( e => e.addEventListener("click", (e) => {
                if (e.target) {
                    let cardIndex = e.target.getAttribute("data-index");
                    myLibrary[cardIndex].changeStatus();
                    let status_p = document.querySelector(`p[data-index="${cardIndex}"]`);
                    status_p.innerText = `Status: ${myLibrary[cardIndex].readStatus}`;
                } 
            }));
        }  
    }
});

// refactoring to use a class

class LibraryBook {
    constructor(authorName, title, pages, readStatus) {
        this.name = authorName;
        this.title = title;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    buildBook(arrayIndex) {
        let bookCardDiv = document.createElement("div");
        bookCardDiv.classList.add("bookCard");
        bookCardDiv.setAttribute("data-index",`${arrayIndex}`);
        let cardText = document.createElement("p");
        cardText.classList.add("cardText");
        cardText.innerText = `Author: ${this.name}
            Title: ${this.title}
            Pages: ${this.pages}
        `;
        let statusText = document.createElement("p");
        statusText.classList.add("cardText");
        statusText.classList.add("statusText");
        statusText.setAttribute("data-index",`${arrayIndex}`);
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
        readButton.setAttribute("data-index",`${arrayIndex}`);
    
        bookCardDiv.appendChild(cardText);
        bookCardDiv.appendChild(statusText);
        bookCardDiv.appendChild(cardButtonBox);
        cardButtonBox.appendChild(removeButton);
        cardButtonBox.appendChild(readButton);
    
        return bookCardDiv;    
    }
    changeStatus() {
        if ( this.readStatus == "READ" ) {
            this.readStatus = "UNREAD";
        } else {
            this.readStatus = "READ";
        }
    }
}

// function Book(authorName, title, pages, readStatus) {
//     this.author = authorName;
//     this.title = title;
//     this.pages = pages;
//     this.readStatus = readStatus;
// }

// Book.prototype.changeStatus = function() {
//     if ( this.readStatus == "READ" ) {
//         this.readStatus = "UNREAD";
//     } else {
//         this.readStatus = "READ";
//     }
// };

// Book.prototype.buildBook = function(arrayIndex) {
//     let bookCardDiv = document.createElement("div");
//     bookCardDiv.classList.add("bookCard");
//     bookCardDiv.setAttribute("data-index",`${arrayIndex}`);
//     let cardText = document.createElement("p");
//     cardText.classList.add("cardText");
//     cardText.innerText = `Author: ${this.author}
//         Title: ${this.title}
//         Pages: ${this.pages}
//     `;
//     let statusText = document.createElement("p");
//     statusText.classList.add("cardText");
//     statusText.classList.add("statusText");
//     statusText.setAttribute("data-index",`${arrayIndex}`);
//     statusText.innerText = `Status: ${this.readStatus}`;

//     let cardButtonBox = document.createElement("div");
//     cardButtonBox.classList.add("cardButtonBox");
//     let removeButton = document.createElement("button");
//     removeButton.innerText = "Remove";
//     removeButton.classList.add("removeBookNow");
//     removeButton.setAttribute("data-index",`${arrayIndex}`);
//     let readButton = document.createElement("button");
//     readButton.innerText = "Read/Unread?";
//     readButton.classList.add("read-unread");
//     readButton.setAttribute("data-index",`${arrayIndex}`);

//     bookCardDiv.appendChild(cardText);
//     bookCardDiv.appendChild(statusText);
//     bookCardDiv.appendChild(cardButtonBox);
//     cardButtonBox.appendChild(removeButton);
//     cardButtonBox.appendChild(readButton);

//     return bookCardDiv;
// };

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