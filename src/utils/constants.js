// initial cards info
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// edit-profile form constants
export const popupEditProfile = document.querySelector(".popup_type_edit-profile");
export const formEditProfile = popupEditProfile.querySelector(".popup__form");
export const editButton = document.querySelector(".profile__edit-button");
export const nameInput = formEditProfile.querySelector(".popup__input_type_name");
export const jobInput = formEditProfile.querySelector(".popup__input_type_job");

// add-card form constants
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const formAddCard = popupAddCard.querySelector(".popup__form");
export const addCardButton = document.querySelector(".profile__add-button");
export const popupCard = document.querySelector(".picture-popup");
export const currentName = document.querySelector(".profile__name");
export const currentJob = document.querySelector(".profile__title");
export const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_state_error",
  errorClass: "popup__input-error_active",
};
