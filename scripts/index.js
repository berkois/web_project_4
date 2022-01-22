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
}

// removing the pop-ups
function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
const popupCard = document.querySelector(".photos-grid__popup");
const popupCardPicture = popupCard.querySelector(".photos-grid__popup-image");
const popupCardText = popupCard.querySelector(".photos-grid__popup-text");
const popupCardCloseButton = popupCard.querySelector(".popup__close-button");

// add event listener to the close button of the popup picture of the newly added place card
popupCardCloseButton.addEventListener("click", function (evt) {
  closePopup(popupCard);
  popupCardPicture.src = " ";
  popupCardPicture.alt = " ";
  popupCardText.textContent = " ";
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

// Each function is supposed to perform just one task.
// In this case, it needs to create a card and set up event listeners.
// This function should also return a card element (return card) but not add it to the markup.
// To add a card to the markup, you need to create a new function like renderCard()
// that will call a function that creates cards (getCard()),
// and its output will be added to the markup with the help of the prepend() function.
// It can be used both in the methods for uploading new cards and for adding a user card.

function renderCard(cardInfo) {
  const placeCard = getCard(cardInfo);
  // add the new place card to the page
  cardsContainer.prepend(placeCard);
}

// initial cards info
const initialCards = [
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

// declaring cards from initial cards info
initialCards.forEach((card) => {
  renderCard(card);
});

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
