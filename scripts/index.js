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
  popup.addEventListener("click", closePopupByClickOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}

// get default values from current info and open popup
function openPopupWithDefault(popup) {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  openPopup(popup);
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

// assigning functions to events for edit-form functionalities
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", () => openPopupWithDefault(popupEditProfile));
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
const imageUrlInput = formAddCard.querySelector(".popup__input_type_img-src");

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
function generateCard(cardInfo) {
  // cloning new card from template and adding the info from input
  const cardElement = cardTemplate.querySelector(".photos-grid__card").cloneNode(true);
  const cardPhoto = cardElement.querySelector(".photos-grid__photo");
  const cardText = cardElement.querySelector(".photos-grid__location");
  cardPhoto.src = cardInfo.link;
  cardPhoto.alt = cardInfo.name;
  cardText.textContent = cardInfo.name;

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
  cardPhoto.addEventListener("click", function (evt) {
    const pictureForPreviewPopup = evt.target;
    const dataForPreviewPopup = pictureForPreviewPopup.closest(".photos-grid__card");
    const textForPreviewPopup = dataForPreviewPopup.querySelector(".photos-grid__location");
    popupCardPicture.src = pictureForPreviewPopup.src;
    popupCardPicture.alt = pictureForPreviewPopup.alt;
    popupCardText.textContent = textForPreviewPopup.textContent;
    openPopup(popupCard);
  });

  return cardElement;
}

function renderCard(cardInfo) {
  const placeCard = generateCard(cardInfo);
  // add the new place card to the page
  cardsContainer.prepend(placeCard);
}

// handling all the actions for submitted add-card form
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardInfo = {
    name: placeInput.value,
    link: imageUrlInput.value,
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

function openPopupWithValidation(popup) {
  enableValidation();
  openPopup(popup);
}

// event listener for add-card button
addButton.addEventListener("click", () => openPopupWithValidation(popupAddCard));
formAddCard.addEventListener("submit", handleAddCardSubmit);
closeButtonAddCard.addEventListener("click", () => handleAddCardCancel());

// declaring cards from initial cards info
initialCards.forEach(renderCard);
