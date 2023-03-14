let overlayElement = document.querySelector(".overlayElement");
let addNewBook = document.querySelector(".addNewBook");
let submitInformation = document.querySelector("[type=submit]");
let form = document.querySelector("form");

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
    
        addBookToLibrary(submittedBook);
    
        form.reset();
        overlayElement.removeAttribute("id");
        form.hidden = true;
    }

});

function Book(authorName, title, pages, readStatus) {
    this.author = authorName;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(newBook) {
    
    let duplicateTest = myLibrary.some( (e) => e["author"] == newBook["author"] && e["title"] == newBook["title"] );
    
    if ( duplicateTest == false ) {
        myLibrary.push(newBook);
        console.log(myLibrary);
    } else {
        console.log("It's a duplicate");
    }
}

