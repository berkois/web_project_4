/* -------------------------------------------------------------------------- */
/*                       importing elements and classes                       */
/* -------------------------------------------------------------------------- */

import "./index.css";
import profileAvatarSource from "../images/profile.png";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, formConfig } from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                               profile section                              */
/* -------------------------------------------------------------------------- */

// declaring the profile avatar image
const profileAvatar = document.getElementById("profile-avatar");
profileAvatar.src = profileAvatarSource;

// setting up the initial profile info
const profileName = ".profile__name";
const profileTitle = ".profile__title";
const nameInput = ".popup__input_type_name";
const jobInput = ".popup__input_type_job";
const userProfile = new UserInfo(profileName, profileTitle, nameInput, jobInput);
const initialProfile = userProfile.getUserInfo();
userProfile.setUserInfo(initialProfile);

// setting up the popup-form for editing the profile
const popupEditProfile = ".popup_type_edit-profile";
const popupEditProfileForm = new PopupWithForm(popupEditProfile, (formValues) => {
  userProfile.setUserInfo(formValues);
});
popupEditProfileForm.setEventListeners();

// handle edit-profile form modal open
const openEditProfileForm = () => {
  editProfileFormValidator.resetValidation();
  userProfile.setUserInfo(userProfile.getUserInfo());
  popupEditProfileForm.open();
};

// enabling validation for edit-profile form
const formEditProfile = ".popup__form_type_edit-profile";
const editProfileFormValidator = new FormValidator(formConfig, formEditProfile);
editProfileFormValidator.enableValidation();

// event listeners for prompting profile-edit popup when clicking the edit icon
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", openEditProfileForm);

/* -------------------------------------------------------------------------- */
/*                                cards section                               */
/* -------------------------------------------------------------------------- */

// setting up the initial image popup
const popupCard = ".picture-popup";
const imagePopup = new PopupWithImage(popupCard, " ", " ");
imagePopup.setEventListeners();

// function to render a new card from given data
const renderCard = (cardItem) => {
  const placeCard = new Card(cardItem.name, cardItem.link, "card-template", () => {
    imagePopup.open(cardItem);
  });
  const placeCardElement = placeCard.generateCard();
  cardsList.addItem(placeCardElement);
};

// rendering the initial cards
const cardsList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".photos-grid__list"
);
cardsList.renderer();

// setting up the popup-form for rendering new cards
const popupAddCard = ".popup_type_add-card";
const popupAddCardForm = new PopupWithForm(popupAddCard, (formValues) => {
  renderCard(formValues);
});
popupAddCardForm.setEventListeners();

// handle add-card form modal open
const openAddCardForm = () => {
  addCardFormValidator.resetValidation();
  popupAddCardForm.open();
};

// event listeners for prompting add-card popup when clicking the add icon
const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", openAddCardForm);

// enabling validation for add-card form
const formAddCard = ".popup__form_type_add-card";
const addCardFormValidator = new FormValidator(formConfig, formAddCard);
addCardFormValidator.enableValidation();
