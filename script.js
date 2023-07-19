function toggleForm() {
  showFormButton.classList.toggle("hidden");
  form.classList.toggle("hidden");
}

function updateLibrary() {
  const data = getFormData();
  console.log(data);
}

function getFormData() {
  const formData = new FormData(form);
  const result = {};
  formData.forEach((value, key) => result[key] = value);
  return result;
}

const showFormButton = document.querySelector("#show-form");
const form = document.querySelector(".sidebar-form");

let library = [];

// Setup listeners
showFormButton.addEventListener("click", toggleForm);
form.addEventListener("submit", e => {
  e.preventDefault();
  updateLibrary();
});
