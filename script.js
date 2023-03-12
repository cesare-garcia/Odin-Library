let myLibrary = [
    {
        author: "Bob",
        title: "Jim Bob",
        pages: 87,
        status: "read"
    },
    {
        author: "Jamie",
        title: "Rogan Josh",
        pages: 87,
        status: "read"
    }
];

let bookShelf = document.querySelector(".bookShelf");
let newBook = "";

for (let i = 0; i < myLibrary.length; i++ ) {
    newBook = createBookCard(myLibrary[i]["author"], myLibrary[i]["title"], myLibrary[i]["pages"], myLibrary[i]["status"]);
}

function Book(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status; 
}

function bookStatus() {
    let submittedStatus = prompt("Have you read the book? Enter yes or no.").toUpperCase();
    if ( submittedStatus == "YES" ) {
        submittedStatus = "read";
    } else if ( submittedStatus == "NO" ) {
        submittedStatus = "unread";
    } else {
        while ( submittedStatus != "YES" || submittedStatus != "NO" ) {
            submittedStatus = prompt("Have you read the book? Enter yes or no.").toUpperCase();
            if ( submittedStatus == "YES" ) {
                submittedStatus = "read";
                return submittedStatus;
            } else if ( submittedStatus == "NO" ) {
                submittedStatus = "unread";
                return submittedStatus;
            }
        }
    }
    return submittedStatus;
}

function numberOfPages() {
    let submittedPages = prompt("Enter the number of pages in the book. Do not type the word for the number.");
    let pages = Number(submittedPages);
    if ( !isNaN(pages) ) {
        return pages;
    } else {
        while ( isNaN(pages) ) {
            submittedPages = prompt("Enter the number of pages in the book. Do not type the word for the number.")
            pages = Number(submittedPages);
            if ( !isNaN(pages) ) {
                return pages;
            }
        }
    }
}

function addBookToLibrary() {
    let submittedAuthor = prompt("Enter the name of the book's author.").toUpperCase().trim();
    let submittedTitle = prompt("Enter the title of the book.").toUpperCase().trim();
    let pageNumbers = numberOfPages();
    let readStatus = bookStatus();
    const addedBook = new Book(submittedAuthor, submittedTitle, pageNumbers, readStatus);
    myLibrary.push(addedBook);
}

function createBookCard(author, title, pages, status) {
    let newCard = document.createElement("div");
    newCard.classList.add("bookCard");
    newCard.innerText = `
        Author: ${author}
        Title: ${title}
        Pages: ${pages}
        Status: ${status}
    `;
    bookShelf.appendChild(newCard);
}