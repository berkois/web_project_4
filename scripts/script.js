let formElement = document.querySelector(".popup"); // Use the querySelector() method
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let currentName = document.querySelector(".profile__name");
let currentJob = document.querySelector(".profile__title");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_job");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
}

function showPopup(evt) {
  evt.preventDefault();
  formElement.classList.add("popup_opened");
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

function hidePopup(evt) {
  evt.preventDefault();
  formElement.classList.remove("popup_opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", hidePopup);
editButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", hidePopup);
