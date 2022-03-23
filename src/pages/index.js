/* -------------------------------------------------------------------------- */
/*                       importing elements and classes                       */
/* -------------------------------------------------------------------------- */

import "./index.css";
import editAvatarIconSource from "../images/edit_icon.svg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithMessage from "../components/PopupWithMessage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { formConfig, customFetch, popupErrorSelector, profileNameSelector, profileTitleSelector, profileAvatarSelector, nameInput, jobInput, avatarInput, editAvatarIcon, popupEditProfile, formEditProfile, editButton, popupEditAvatar, formEditAvatar, avatarEditArea, popupCard, popupDeleteCardSelector, popupAddCard, addCardButton, formAddCard } from "../utils/constants.js";

// setting up the popup for error message
const popupError = new PopupWithMessage(popupErrorSelector);
popupError.setEventListeners();

const errorFunction = (err) => {
  console.log(`error: ${err}`);
  popupError.getMessage(".popup__text", `error: ${err}`);
  popupError.open();
};

// setting up the API for current user
const api = new Api(customFetch, {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "3e63b17a-6497-4226-90cf-4d7937b7aba1",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                               profile section                              */
/* -------------------------------------------------------------------------- */

// setting up the edit icon image that appears when hovering the avatar
editAvatarIcon.src = editAvatarIconSource;

const userProfile = new UserInfo(profileNameSelector, profileTitleSelector, profileAvatarSelector);
let userId;

// loading the page at once: setting up profile info from the server and rendering the initial cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // setting up profile info from the server
    userId = userInfo._id;
    userProfile.setUserData(userInfo);
    userProfile.setUserAvatar(userInfo.avatar);

    // rendering the initial cards
    cardsList.renderer(initialCards);
  })
  .catch((err) => errorFunction(err));

// setting up the popup-form for editing the profile
const popupEditProfileForm = new PopupWithForm(popupEditProfile, formConfig, handleEditProfileFormSubmit);
popupEditProfileForm.setEventListeners();

// declare the fuction for handling submit for editing avatar form
function handleEditProfileFormSubmit(formValues, submitButton) {
  api
    .updateUserInfo(formValues)
    .then((res) => {
      userProfile.setUserData(res);
    })
    .then(() => popupEditProfileForm.close())
    .catch((err) => errorFunction(err))
    .finally(() => (submitButton.textContent = "Save"));
}

// handle edit-profile form modal open
const openEditProfileForm = () => {
  editProfileFormValidator.resetValidation();
  const userData = userProfile.getUserData();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupEditProfileForm.open();
};

// enabling validation for edit-profile form
const editProfileFormValidator = new FormValidator(formConfig, formEditProfile);
editProfileFormValidator.enableValidation();

// event listeners for prompting profile-edit popup when clicking the edit icon
editButton.addEventListener("click", openEditProfileForm);

// setting up the popup-form for editing the avatar
const popupEditAvatarForm = new PopupWithForm(popupEditAvatar, formConfig, handleAvatarFormSubmit);
popupEditAvatarForm.setEventListeners();

// declare the fuction for handling submit for editing avatar form
function handleAvatarFormSubmit(avatarUrl, submitButton) {
  api
    .setUserAvatar(avatarUrl)
    .then((res) => {
      userProfile.setUserAvatar(res.avatar);
    })
    .then(() => popupEditAvatarForm.close())
    .catch((err) => errorFunction(err))
    .finally(() => (submitButton.textContent = "Save"));
}

// handle edit-avatar form modal open
const openEditAvatarForm = () => {
  editAvatarFormValidator.resetValidation();
  popupEditAvatarForm.open();
};

// enabling validation for edit-avatar form
const editAvatarFormValidator = new FormValidator(formConfig, formEditAvatar);
editAvatarFormValidator.enableValidation();

// event listeners for prompting avatar-edit popup when clicking the edit icon
avatarEditArea.addEventListener("click", openEditAvatarForm);

/* -------------------------------------------------------------------------- */
/*                                cards section                               */
/* -------------------------------------------------------------------------- */

// setting up the initial image popup
const imagePopup = new PopupWithImage(popupCard, " ", " ");
imagePopup.setEventListeners();

// setting up the initial delete-card popup
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
      popupDeleteCard.setSubmitHandler(() => {
        api
          .deleteCard(cardId)
          .then(() => placeCard.deleteCardElement())
          .then(() => popupDeleteCard.close())
          .catch((err) => errorFunction(err));
      });
    },
    // function to be performed when clicking on the like icon of the new card:
    (cardId) => {
      const isLiked = placeCard.isCardLiked();
      if (isLiked) {
        api
          .removeLike(cardId)
          .then((res) => {
            placeCard.updateLikes(res);
          })
          .catch((err) => errorFunction(err));
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            placeCard.updateLikes(res);
          })
          .catch((err) => errorFunction(err));
      }
    }
  );
  const placeCardElement = placeCard.generateCard();
  cardsList.addItem(placeCardElement);
};

// setting up the cards list section
const cardsList = new Section(renderCard, ".photos-grid__list");

// setting up the popup-form for rendering new cards
const popupAddCardForm = new PopupWithForm(popupAddCard, formConfig, handleAddCardFormSubmit);
popupAddCardForm.setEventListeners();

// declare the fuction for handling submit for adding card form
function handleAddCardFormSubmit(formValues, submitButton) {
  api
    .setNewCard(formValues)
    .then((res) => {
      renderCard(res);
    })
    .then(() => popupAddCardForm.close())
    .catch((err) => errorFunction(err))
    .finally(() => (submitButton.textContent = "Create"));
}

// handle add-card form modal open
const openAddCardForm = () => {
  addCardFormValidator.resetValidation();
  popupAddCardForm.open();
};

// event listeners for prompting add-card popup when clicking the add icon
addCardButton.addEventListener("click", openAddCardForm);

// enabling validation for add-card form
const addCardFormValidator = new FormValidator(formConfig, formAddCard);
addCardFormValidator.enableValidation();
