// setting popup for editing the profile
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonEditProfile = popupEditProfile.querySelector(".popup__close-button");
const currentName = document.querySelector(".profile__name");
const currentJob = document.querySelector(".profile__title");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");

// editing the proile from input
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  popupEditProfile.classList.toggle("popup_opened");
  formEditProfile.reset();
}

// showing/removing the pop-ups
function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

// get default values from current info
function fillDefaultFormFields(evt) {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

// assigning functions to events for edit-form functionalities
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", () => togglePopup(popupEditProfile));
editButton.addEventListener("click", fillDefaultFormFields);
closeButtonEditProfile.addEventListener("click", () => togglePopup(popupEditProfile));

// setting the cards container and template for card elements
const cardsContainer = document.querySelector(".photos-grid__list");
const cardTemplate = document.querySelector("#card-template").content;
const cards = [];
const cardDeleteButtons = [];
const cardLikeButtons = [];

// removing card
function removeCard() {
  cardDeleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function (evt) {
      const deleteTarget = evt.target;
      const cardToDelete = deleteTarget.closest(".photos-grid__card");
      cardToDelete.remove();
    });
  });
}

// like function
function like() {
  cardLikeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", function (evt) {
      const likeTarget = evt.target;
      likeTarget.classList.toggle("heart_active");
    });
  });
}

// adding new card
function getCard(cardInfo) {
  const cardElement = cardTemplate.querySelector(".photos-grid__card").cloneNode(true);
  cardElement.querySelector(".photos-grid__photo").src = cardInfo.link;
  cardElement.querySelector(".photos-grid__photo").alt = cardInfo.name;
  cardElement.querySelector(".photos-grid__location").textContent = cardInfo.name;

  const cardDeleteButton = cardElement.querySelector(".photos-grid__trash");
  cardDeleteButtons.push(cardDeleteButton);
  removeCard();

  const cardLikeButton = cardElement.querySelector(".heart");
  cardLikeButtons.push(cardLikeButton);
  like();

  cardsContainer.prepend(cardElement);
  cards.push(cardElement);
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
const initialCard = initialCards.map((card) => {
  initialCardItem = getCard(card);
  return initialCardItem;
});

// setting popup for adding place card
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const closeButtonAddCard = popupAddCard.querySelector(".popup__close-button");
const placeInput = formAddCard.querySelector(".popup__input_type_place");
const imgSrcInput = formAddCard.querySelector(".popup__input_type_img-src");

// event listener for add-card button
addButton.addEventListener("click", () => togglePopup(popupAddCard));

// converting input to card attributes
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCardInfo = {
    name: placeInput.value,
    link: imgSrcInput.value,
  };
  getCard(newCardInfo);
  popupAddCard.classList.toggle("popup_opened");
  formAddCard.reset();
}

formAddCard.addEventListener("submit", handleAddCardSubmit);
closeButtonAddCard.addEventListener("click", () => togglePopup(popupAddCard));
