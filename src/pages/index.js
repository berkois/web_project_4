/* -------------------------------------------------------------------------- */
/*                       importing elements and classes                       */
/* -------------------------------------------------------------------------- */

import "./index.css";
import profileAvatarEditSource from "../images/edit_icon.svg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithMessage from "../components/PopupWithMessage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { formConfig, customFetch } from "../utils/constants.js";

// setting up the popup for error message
const popupErrorSelector = ".popup_type_error";
const popupError = new PopupWithMessage(popupErrorSelector);
popupError.setEventListeners();

// setting up the API for current user
const api = new Api(customFetch, {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "3e63b17a-6497-4226-90cf-4d7937b7aba1",
    "Content-Type": "application/json",
  },
  errorFunction: (errMessage) => {
    popupError.getMessage(".popup__text", errMessage);
    popupError.open();
  },
});

/* -------------------------------------------------------------------------- */
/*                               profile section                              */
/* -------------------------------------------------------------------------- */

// setting up the initial profile info
const profileNameSelector = ".profile__name";
const profileTitleSelector = ".profile__title";
const profileAvatar = document.getElementById("profile-avatar");
const profileAvatarEdit = document.getElementById("profile-avatar-edit");
profileAvatarEdit.src = profileAvatarEditSource;
const nameInput = ".popup__input_type_name";
const jobInput = ".popup__input_type_job";
const userProfile = new UserInfo(profileNameSelector, profileTitleSelector, nameInput, jobInput);
let userId;

// loading the page at once: setting up profile info from the server and rendering the initial cards
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([userInfo, initialCards]) => {
  // setting up profile info from the server
  userId = userInfo._id;
  const userData = {
    name: userInfo.name,
    about: userInfo.about,
  };
  userProfile.setUserInfo(userData);
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;

  // rendering the initial cards
  cardsList.renderer(initialCards);
});

// setting up the popup-form for editing the profile
const popupEditProfile = ".popup_type_edit-profile";
const popupEditProfileForm = new PopupWithForm(popupEditProfile, (formValues, submitButton) => {
  submitButton.textContent = "Saving...";
  api
    .updateUserInfo(formValues)
    .then((res) => userProfile.setUserInfo(res))
    .then(popupEditProfileForm.close())
    .then((submitButton.textContent = "Save"));
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

// setting up the popup-form for editing the avatar
const popupEditAvatar = ".popup_type_edit-avatar";
const popupEditAvatarForm = new PopupWithForm(popupEditAvatar, (formValues, submitButton) => {
  submitButton.textContent = "Saving...";
  api
    .setUserAvatar(formValues)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    })
    .then(popupEditAvatarForm.close())
    .then((submitButton.textContent = "Save"));
});
popupEditAvatarForm.setEventListeners();

// handle edit-avatar form modal open
const openEditAvatarForm = () => {
  editAvatarFormValidator.resetValidation();
  popupEditAvatarForm.open();
};

// enabling validation for edit-avatar form
const formEditAvatar = ".popup__form_type_edit-avatar";
const editAvatarFormValidator = new FormValidator(formConfig, formEditAvatar);
editAvatarFormValidator.enableValidation();

// event listeners for prompting avatar-edit popup when clicking the edit icon
const avatarEditArea = document.querySelector(".profile__avatar-cover");
avatarEditArea.addEventListener("click", openEditAvatarForm);

/* -------------------------------------------------------------------------- */
/*                                cards section                               */
/* -------------------------------------------------------------------------- */

// setting up the initial image popup
const popupCard = ".picture-popup";
const imagePopup = new PopupWithImage(popupCard, " ", " ");
imagePopup.setEventListeners();

// setting up the initial delete-card popup
const popupDeleteCardSelector = ".popup_type_delete-card";
const popupDeleteCard = new PopupWithConfirmation(popupDeleteCardSelector);
popupDeleteCard.setEventListeners();

// function to render a new card from given data
const renderCard = (cardItem) => {
  const placeCard = new Card(
    cardItem,
    userId,
    "card-template",
    // function to be performed when clicking on the new card:
    () => {
      imagePopup.open(cardItem);
    },
    // function to be performed when clicking on the bin icon of the new card:
    (cardId) => {
      popupDeleteCard.open();
      // function to be performed when approving the popup for deleting the new card:
      popupDeleteCard.getTask(() => {
        api.deleteCard(cardId);
        placeCard.deleteCard();
      });
    },
    // function to be performed when clicking on the like icon of the new card:
    (cardId) => {
      const isLiked = placeCard.isCardLiked();
      if (isLiked) {
        api.removeLike(cardId).then((res) => {
          placeCard.removeLike(res);
        });
      } else {
        api.addLike(cardId).then((res) => {
          placeCard.likeCard(res);
        });
      }
    }
  );
  const placeCardElement = placeCard.generateCard();
  cardsList.addItem(placeCardElement);
};

// setting up the cards list section
const cardsList = new Section(renderCard, ".photos-grid__list");

// setting up the popup-form for rendering new cards
const popupAddCard = ".popup_type_add-card";
const popupAddCardForm = new PopupWithForm(popupAddCard, (formValues, submitButton) => {
  submitButton.textContent = "Creating...";
  api
    .setNewCard(formValues)
    .then((res) => {
      renderCard(res);
    })
    .then(popupAddCardForm.close())
    .then((submitButton.textContent = "Create"));
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
