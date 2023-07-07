let myLibrary = [
    new Book('Title 1', 'Author 1', '1', true),
    new Book('Title 2', 'Author 2', '2', true),
    new Book('Title 3', 'Author 3', '3', true),
    new Book('Title 4', 'Author 4', '4', true),
    new Book('Title 5', 'Author 5', '5', true),
]

const form = document.getElementById('form');
const table = document.getElementById('table-body');

function loadTable() { 
    table.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let row = document.createElement('tr');
        row.setAttribute("data-index", `${i}`);
        let column1 = document.createElement('td');
        column1.appendChild(document.createTextNode(myLibrary[i]['title']));
        row.appendChild(column1);
        let column2 = document.createElement('td');
        column2.appendChild(document.createTextNode(myLibrary[i]['author']));
        row.appendChild(column2);
        let column3 = document.createElement('td');
        column3.appendChild(document.createTextNode(`${myLibrary[i]['pages']} pages`));
        row.appendChild(column3);
        let column4 = document.createElement('td');
        let readBtn = document.createElement('button');
        readBtn.setAttribute("type", "button");
        readBtn.setAttribute("id", "read-btn");
        if(myLibrary[i]['read'] === true) {
            readBtn.classList.add(`btn-read`);
            readBtn.textContent = "yes";
        } else {
            readBtn.classList.add(`btn-not-read`);
            readBtn.textContent = "no";
        };
        readBtn.setAttribute ("onclick", `toggleRead(${i})`);
        column4.appendChild(readBtn);
        row.appendChild(column4);
        let column5 = document.createElement('td');
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("id", "delete-btn");
        deleteBtn.setAttribute ("onclick", `deleteEntry(${i})`);
        deleteBtn.textContent = "Remove";
        column5.appendChild(deleteBtn);
        row.appendChild(column5);
        table.appendChild(row);
    };
};

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if(!this.read) {
            return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, not read yet'
        } else {
            return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, read already'
        }      
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    loadTable();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formTitle = document.getElementById('book_title');
    const formAuthor = document.getElementById('book_author');
    const formPages = document.getElementById('num_pages');
    const formReadBook = document.getElementById('read_book');
    const book = new Book(formTitle.value, formAuthor.value, formPages.value, formReadBook.checked);
    addBookToLibrary(book);
    closeForm();
})

function openForm() {
    
    let newBtn = document.getElementsByClassName("new-book-btn")[0];
    newBtn.innerHTML = '';
    let titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("class", "form");
    titleInput.setAttribute("id", "book_title");
    titleInput.setAttribute("placeholder", "Title");
    form.appendChild(titleInput);
    let authorInput = document.createElement('input')
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("class", "form");
    authorInput.setAttribute("id", "book_author");
    authorInput.setAttribute("placeholder", "Author");
    form.appendChild(authorInput);
    let pagesInput = document.createElement('input')
    pagesInput.setAttribute("type", "number");
    pagesInput.setAttribute("class", "form");
    pagesInput.setAttribute("id", "num_pages");
    pagesInput.setAttribute("placeholder", "Pages");
    form.appendChild(pagesInput);
    let label = document.createElement('label');
    label.setAttribute("for", "read_book");
    label.textContent = "Did you read the book?"
    form.appendChild(label);
    let readInput = document.createElement('input');
    readInput.setAttribute("type", "checkbox");
    readInput.setAttribute("class", "form");
    readInput.setAttribute("id", "read_book");
    form.appendChild(readInput);
    let btn = document.createElement('button');
    btn.setAttribute("type", "submit");
    btn.setAttribute("id", "submit-btn");
    btn.textContent = "ADD BOOK";
    form.appendChild(btn);
}

function closeForm() {
    let div = document.getElementsByClassName("new-book-btn")[0];
    let newBtn = document.createElement('button');
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("id", "new-book-btn");
    newBtn.setAttribute ("onclick", "openForm()");
    newBtn.textContent = "NEW BOOK";
    div.appendChild(newBtn);
    form.innerHTML = '';
}

function deleteEntry(index) {
    myLibrary.splice(index, 1);
    loadTable();
}

function toggleRead(index) {
    if(myLibrary[index]['read'] === true) {
        myLibrary[index]['read'] = false
    } else {
        myLibrary[index]['read'] = true
    };
    loadTable();
}

loadTable();