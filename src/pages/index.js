import "./index.css";
import profileAvatarSource from "../images/profile.png";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, popupEditProfile, nameInput, jobInput, editButton, popupAddCard, formAddCard, addCardButton, popupCard, formConfig, currentName, currentJob } from "../utils/constants.js";

// declaring the profile avatar image
const profileAvatar = document.getElementById("profile-avatar");
profileAvatar.src = profileAvatarSource;

// setting up the popup for editing the profile
const popupEditProfileForm = new PopupWithForm(popupEditProfile, (formValues) => {
  const profileInfo = new UserInfo({ name: formValues["name"], job: formValues["title"] });
  profileInfo.getUserInfo();
  profileInfo.setUserInfo(currentName, currentJob);
});
popupEditProfileForm.setEventListeners();

// setting up the popup for rendering new cards
const popupAddCardForm = new PopupWithForm(popupAddCard, (formValues) => {
  const cardsAsArray = [formValues];
  const newCardData = new Section(
    {
      items: cardsAsArray,
      renderer: (card) => {
        const placeCard = new Card(card["place"], card["source"], "card-template", () => {
          const popupCardPicture = new PopupWithImage(popupCard, card["source"], card["place"]);
          popupCardPicture.setEventListeners();
          popupCardPicture.open();
        });
        const placeCardElement = placeCard.generateCard();
        newCardData.addItem(placeCardElement);
      },
    },
    ".photos-grid__list"
  );
  newCardData.renderer();
});
popupAddCardForm.setEventListeners();

// rendering the initial cards
const initialCardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const placeCard = new Card(cardItem.name, cardItem.link, "card-template", () => {
        const popupCardPicture = new PopupWithImage(popupCard, cardItem.link, cardItem.name);
        popupCardPicture.setEventListeners();
        popupCardPicture.open();
      });
      const placeCardElement = placeCard.generateCard();
      initialCardsList.addItem(placeCardElement);
    },
  },
  ".photos-grid__list"
);
initialCardsList.renderer();

// make the default values of a form same as the current output
const setProfileFormValues = () => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
};

// handle edit-profile form modal open
const openEditProfileForm = () => {
  editProfileFormValidator.resetValidation();
  setProfileFormValues();
  popupEditProfileForm.open();
};

// handle edit-profile form modal open
const openAddCardForm = () => {
  addFormValidator.resetValidation();
  popupAddCardForm.open();
};

editButton.addEventListener("click", openEditProfileForm);
addCardButton.addEventListener("click", openAddCardForm);

// enabling validation for add-card form
const addFormValidator = new FormValidator(formConfig, formAddCard);
addFormValidator.enableValidation();

// enabling validation for edit-profile form
const editProfileFormValidator = new FormValidator(formConfig, popupEditProfile);
editProfileFormValidator.enableValidation();
