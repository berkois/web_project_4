import { Card } from "./Card.js";
import { openPopup, closePopup, closePopupByClickOverlay, closePopupByEsc } from "./utils.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

/* -------------------------------------------------------------------------- */
/*                                Edit Profile                                */
/* -------------------------------------------------------------------------- */

// setting popup for editing the profile
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonEditProfile = popupEditProfile.querySelector(".popup__close-button");
const currentName = document.querySelector(".profile__name");
const currentJob = document.querySelector(".profile__title");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");

// get default values from current info and open popup
const resetPopuptoDefault = (popup) => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
};

const openEditProfileForm = (config, form, popup) => {
  addValidationToForm(config, form);
  resetPopuptoDefault(popup);
  openPopup(popup);
};
// // showing the pop-ups
// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   popup.addEventListener("click", closePopupByClickOverlay);
//   document.addEventListener("keydown", closePopupByEsc);
// }

// // removing the pop-ups
// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   popup.removeEventListener("click", closePopupByClickOverlay);
//   document.removeEventListener("keydown", closePopupByEsc);
// }

// function closePopupByClickOverlay(evt) {
//   if (evt.target == evt.currentTarget) {
//     closePopup(evt.currentTarget);
//   }
// }

// function closePopupByEsc(evt) {
//   const activePopup = document.querySelector(".popup_opened");
//   if (evt.key === "Escape") {
//     closePopup(activePopup);
//   }
// }

// editing the proile from input

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
  formEditProfile.reset();
};

// assigning functions to events for edit-form functionalities
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", () => openEditProfileForm(formConfig, formEditProfile, popupEditProfile));
closeButtonEditProfile.addEventListener("click", () => closePopup(popupEditProfile));

/* -------------------------------------------------------------------------- */
/*                   Place Cards: Adding, Removing, Thumb-up                  */
/* -------------------------------------------------------------------------- */

// setting popup for adding place card
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtonAddCard = popupAddCard.querySelector(".popup__close-button");
const placeInput = formAddCard.querySelector(".popup__input_type_place");
const imageUrlInput = formAddCard.querySelector(".popup__input_type_img-src");
// const formAddSubmitButton = formAddCard.querySelector(".popup__save-button");
// const formAddInputList = [...formAddCard.querySelectorAll(".popup__input")];
// const formButtonInactiveClass = "popup__save-button_inactive";
const anyPopup = document.querySelectorAll(".popup");

anyPopup.forEach((popup) => {
  popup.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("click", closePopupByClickOverlay);
  popup.querySelector(".popup__close-button").addEventListener("click", () => {
    closePopup(popup);
  });
});

// setting the cards container and template for card elements
const cardsContainer = document.querySelector(".photos-grid__list");
// const cardTemplate = document.querySelector("#card-template").content;

// adding new card
// function generateCard(cardInfo) {
//   // cloning new card from template and adding the info from input
//   const cardElement = cardTemplate.querySelector(".photos-grid__card").cloneNode(true);
//   const cardPhoto = cardElement.querySelector(".photos-grid__photo");
//   const cardText = cardElement.querySelector(".photos-grid__location");
//   cardPhoto.src = cardInfo.link;
//   cardPhoto.alt = cardInfo.name;
//   cardText.textContent = cardInfo.name;

//   // add event listener to delete button of the newly added place card
//   const cardDeleteButton = cardElement.querySelector(".photos-grid__trash");
//   cardDeleteButton.addEventListener("click", function (evt) {
//     const deleteTarget = evt.target;
//     const cardToDelete = deleteTarget.closest(".photos-grid__card");
//     cardToDelete.remove();
//   });

//   // add event listener to like button of the newly added place card
//   const cardLikeButton = cardElement.querySelector(".heart");
//   cardLikeButton.addEventListener("click", function (evt) {
//     const likeTarget = evt.target;
//     likeTarget.classList.toggle("heart_active");
//   });

//   // add event listener to the picture of the newly added place card
//   cardPhoto.addEventListener("click", function (evt) {
//     const pictureForPreviewPopup = evt.target;
//     const dataForPreviewPopup = pictureForPreviewPopup.closest(".photos-grid__card");
//     const textForPreviewPopup = dataForPreviewPopup.querySelector(".photos-grid__location");
//     popupCardPicture.src = pictureForPreviewPopup.src;
//     popupCardPicture.alt = pictureForPreviewPopup.alt;
//     popupCardText.textContent = textForPreviewPopup.textContent;
//     openPopup(popupCard);
//   });

//   return cardElement;
// }

const renderCard = (cardInfo) => {
  const placeCard = new Card(cardInfo.name, cardInfo.link, "#card-template");
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

// handling all the actions for cancelling add-card form
const handleAddCardCancel = () => {
  closePopup(popupAddCard);
  formAddCard.reset();
};

const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_state_error",
  errorClass: "popup__input-error_active",
};

const addValidationToForm = (config, form) => {
  // console.log("I'm hereeee");
  const validateForm = new FormValidator(config, form);
  validateForm.enableValidation();
};

const openAddCardForm = (config, form, popup) => {
  addValidationToForm(config, form);
  openPopup(popup);
};

// event listener for add-card button
addCardButton.addEventListener("click", () => openAddCardForm(formConfig, formAddCard, popupAddCard));
formAddCard.addEventListener("submit", handleAddCardSubmit);
closeButtonAddCard.addEventListener("click", () => handleAddCardCancel());

// declaring cards from initial cards info
initialCards.forEach(renderCard);
