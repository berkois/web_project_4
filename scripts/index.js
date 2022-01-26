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

// showing the pop-ups
function openPopup(popup) {
  popup.classList.add("popup_opened");
  // enable form validity as the popup form prompts
  enableValidation();
  popup.addEventListener("click", closePopupByClickOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}

// removing the pop-ups
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupByClickOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByClickOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closePopupByEsc(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
}

// editing the proile from input
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
  formEditProfile.reset();
}

// get default values from current info
function fillDefaultFormFields(evt) {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

// assigning functions to events for edit-form functionalities
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", () => openPopup(popupEditProfile));
editButton.addEventListener("click", fillDefaultFormFields);
closeButtonEditProfile.addEventListener("click", () => closePopup(popupEditProfile));

/* -------------------------------------------------------------------------- */
/*                   Place Cards: Adding, Removing, Thumb-up                  */
/* -------------------------------------------------------------------------- */

// setting popup for adding place card
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const closeButtonAddCard = popupAddCard.querySelector(".popup__close-button");
const placeInput = formAddCard.querySelector(".popup__input_type_place");
const imgSrcInput = formAddCard.querySelector(".popup__input_type_img-src");

// setting the cards container and template for card elements
const cardsContainer = document.querySelector(".photos-grid__list");
const cardTemplate = document.querySelector("#card-template").content;
const popupCard = document.querySelector(".picture-popup");
const popupCardPicture = popupCard.querySelector(".picture-popup__popup-image");
const popupCardText = popupCard.querySelector(".picture-popup__popup-text");
const popupCardCloseButton = popupCard.querySelector(".popup__close-button");

// add event listener to the close button of the popup picture of the newly added place card
popupCardCloseButton.addEventListener("click", function (evt) {
  closePopup(popupCard);
});

// adding new card
function getCard(cardInfo) {
  // cloning new card from template and adding the info from input
  const cardElement = cardTemplate.querySelector(".photos-grid__card").cloneNode(true);
  cardElement.querySelector(".photos-grid__photo").src = cardInfo.link;
  cardElement.querySelector(".photos-grid__photo").alt = cardInfo.name;
  cardElement.querySelector(".photos-grid__location").textContent = cardInfo.name;

  // add event listener to delete button of the newly added place card
  const cardDeleteButton = cardElement.querySelector(".photos-grid__trash");
  cardDeleteButton.addEventListener("click", function (evt) {
    const deleteTarget = evt.target;
    const cardToDelete = deleteTarget.closest(".photos-grid__card");
    cardToDelete.remove();
  });

  // add event listener to like button of the newly added place card
  const cardLikeButton = cardElement.querySelector(".heart");
  cardLikeButton.addEventListener("click", function (evt) {
    const likeTarget = evt.target;
    likeTarget.classList.toggle("heart_active");
  });

  // add event listener to the picture of the newly added place card
  cardElement.querySelector(".photos-grid__photo").addEventListener("click", function (evt) {
    const pictureToPop = evt.target;
    const dataToPop = pictureToPop.closest(".photos-grid__card");
    const textToPop = dataToPop.querySelector(".photos-grid__location");
    popupCardPicture.src = pictureToPop.src;
    popupCardPicture.alt = pictureToPop.alt;
    popupCardText.textContent = textToPop.textContent;
    openPopup(popupCard);
  });

  return cardElement;
}

function renderCard(cardInfo) {
  const placeCard = getCard(cardInfo);
  // add the new place card to the page
  cardsContainer.prepend(placeCard);
}

// handling all the actions for submitted add-card form
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardInfo = {
    name: placeInput.value,
    link: imgSrcInput.value,
  };
  renderCard(newCardInfo);

  closePopup(popupAddCard);
  // reset the card input
  formAddCard.reset();
}

// handling all the actions for cancelling add-card form
function handleAddCardCancel() {
  closePopup(popupAddCard);
  formAddCard.reset();
}

// event listener for add-card button
addButton.addEventListener("click", () => openPopup(popupAddCard));
formAddCard.addEventListener("submit", handleAddCardSubmit);
closeButtonAddCard.addEventListener("click", () => handleAddCardCancel());

// declaring cards from initial cards info
initialCards.forEach((card) => {
  renderCard(card);
});

/* -------------------------------------------------------------------------- */
/*                               Form validation                              */
/* -------------------------------------------------------------------------- */

// prompting error message with its style per form and input field
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_state_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// removing the error message
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_state_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

// checking the validity of specific input
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// checking the validity of entire form
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// toggling the submit button active of inactive, to be used based on form validity
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__save-button_inactive");
    buttonElement.disabled = false;
  }
};

// a function to add event listener for every for input field in the page
const setEventListeners = (formElement) => {
  // setting an array of all input fields of a given form
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  // declaring the submit button of a given form
  const buttonElement = formElement.querySelector(".popup__save-button");

  // setting the initial state of the submit button (will be set to inactive)
  toggleButtonState(inputList, buttonElement);

  // setting event listener for every input field to test validity and respond accordingly
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
