function toggleForm() {
  showFormButton.classList.toggle("hidden");
  form.classList.toggle("hidden");
}

function updateLibrary() {
  const data = getFormData();
  libraryContent.push(new Book(data.title, data.author, data.country, data.language, data.genre, data.pages, data.read));
  displayLibrary();
}

function getFormData() {
  const formData = new FormData(form);
  form.reset();
  toggleForm();

  const result = {};
  formData.forEach((value, key) => result[key] = value);
  return result;
}

function displayLibrary() {
  library.textContent = "";
  for (let i = 0; i < libraryContent.length; ++i) {
    const book = libraryContent[i];
    library.innerHTML += 
      `<div class="card" data-index="${i}">
      <div class="card-info">
        <h2>${book.title}</h2>
        <div class="card-content">
          <p>Author:</p>
          <p>${book.author}</p>
          <p>Country:</p>
          <p>${book.country}</p>
          <p>Language:</p>
          <p>${book.language}</p>
          <p>Genre:</p>
          <p>${book.genre}</p>
          <p>Pages:</p>
          <p>${book.pages}</p>
          <p>Read:</p>
          <p>${book.read ? "Yes" : "No"}</p>
        </div>
      </div>
      <div class="card-buttons">
        <button class="card-button-read">${book.read ? "Haven't read" : "Have read"}</button>
        <button class="card-button-remove">Remove</button>
      </div>`; 
    
      const readButton = library.lastChild.querySelector(".card-button-read");
      readButton.addEventListener("click", () => toggleReadStatus(readButton));
  }
}

function toggleReadStatus(button) {
  const card = button.parentNode.parentNode;

  const bookIndex = card.getAttribute("data-index");
  libraryContent[bookIndex].toggleReadStatus();

  displayLibrary();
}

function Book(title, author, country, language, genre, pages) {
  this.title = title;
  this.author = author;
  this.country = country;
  this.language = language;
  this.genre = genre;
  this.pages = pages;
  this.read = false;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
}

const showFormButton = document.querySelector("#show-form");
const form = document.querySelector(".sidebar-form");
const library = document.querySelector(".library");
const readButtons = document.querySelectorAll(".card-button-read");

let libraryContent = [];

// Setup listeners
showFormButton.addEventListener("click", toggleForm);

form.addEventListener("submit", e => {
  e.preventDefault();
  updateLibrary();
});

readButtons.forEach(button => button.addEventListener("click", () => toggleReadStatus(button)));
