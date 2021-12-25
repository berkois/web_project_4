let popup = document.querySelector(".popup");
let formElement = popup.querySelector(".popup__form");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = popup.querySelector(".popup__close-button");
let currentName = document.querySelector(".profile__name");
let currentJob = document.querySelector(".profile__title");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_job");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
  formElement.reset();
}

function togglePopup(evt) {
  popup.classList.toggle("popup_opened");
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

formElement.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
