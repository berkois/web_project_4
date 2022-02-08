import { Card } from "./Card.js";
import { openPopup, closePopup, closePopupByClickOverlay, closePopupByEsc } from "./utils.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

// setting popup for editing the profile
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonEditProfile = popupEditProfile.querySelector(".popup__close-button");
const currentName = document.querySelector(".profile__name");
const currentJob = document.querySelector(".profile__title");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");

// setting popup for adding place card
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtonAddCard = popupAddCard.querySelector(".popup__close-button");
const placeInput = formAddCard.querySelector(".popup__input_type_place");
const imageUrlInput = formAddCard.querySelector(".popup__input_type_img-src");
const anyPopup = document.querySelectorAll(".popup");

// setting the configuration for all the forms in the page
const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_state_error",
  errorClass: "popup__input-error_active",
};

// assigning event listener for closure actions for all the popups in the page
anyPopup.forEach((popup) => {
  popup.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("click", closePopupByClickOverlay);
  popup.querySelector(".popup__close-button").addEventListener("click", () => {
    closePopup(popup);
  });
});

// make the default values of a form same as the current output
const defaultFormValues = () => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
};

// handle edit-profile form modal open
const openEditProfileForm = () => {
  resetFormValidation(validateProfileForm);
  defaultFormValues();
  openPopup(popupEditProfile);
};

// modifying the proile output based on profile form inputs
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
  formEditProfile.reset();
};

// assigning functions to events for edit-form functionalities
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", openEditProfileForm);
closeButtonEditProfile.addEventListener("click", closePopup(popupEditProfile));

// handling add-card form modal open
const openAddCardForm = () => {
  resetFormValidation(validateAddForm);
  openPopup(popupAddCard);
};

// handling add-card form cancellation
const handleAddCardCancel = () => {
  closePopup(popupAddCard);
  formAddCard.reset();
};

// setting the container for card elements
const cardsContainer = document.querySelector(".photos-grid__list");
const cardTemplate = document.getElementById("card-template");

// rendering new cards
const renderCard = (cardInfo) => {
  const placeCard = new Card(cardInfo.name, cardInfo.link, cardTemplate);
  const placeCardReady = placeCard.generateCard();
  // add the new place card to the page
  cardsContainer.prepend(placeCardReady);
};

// handling all the actions for submitted add-card form
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const newCardInfo = {
    name: placeInput.value,
    link: imageUrlInput.value,
  };
  renderCard(newCardInfo);

  closePopup(popupAddCard);
  // reset the card input
  formAddCard.reset();
};
// event listeners for add-card button
addCardButton.addEventListener("click", () => openAddCardForm());
formAddCard.addEventListener("submit", handleAddCardSubmit);
closeButtonAddCard.addEventListener("click", () => handleAddCardCancel());

// rendering the initial given cards
initialCards.forEach(renderCard);

// reseting form validation
const resetFormValidation = (validationFormType) => {
  validationFormType.resetValidation();
};

// enabling validation for add-card form
const validateAddForm = new FormValidator(formConfig, formAddCard);
validateAddForm.enableValidation();

// enabling validation for edit-profile form
const validateProfileForm = new FormValidator(formConfig, formEditProfile);
validateProfileForm.enableValidation();
