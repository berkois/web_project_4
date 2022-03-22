/* -------------------------------------------------------------------------- */
/*                               Card Generation                              */
/* -------------------------------------------------------------------------- */

export default class Card {
  constructor(data, user, template, handleCardClick, handleDeleteCard, handleLikeButton) {
    this._text = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._likesCount = data.likes.length;
    this._owner = data.owner._id;
    this._user = user;
    this._template = document.getElementById(template);
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
  }

  // cloning new card from template and adding the info from input
  _getCardData() {
    const cardElement = this._template.content.querySelector(".photos-grid__card").cloneNode(true);
    return cardElement;
  }

  // check if card is like when clicking on the like icon
  isCardLiked() {
    return this._likes.some((user) => user._id === this._user);
  }

  generateCard() {
    this._element = this._getCardData();
    this._cardPhoto = this._element.querySelector(".photos-grid__photo");
    this._cardCaption = this._element.querySelector(".photos-grid__location");
    this._likesCounter = this._element.querySelector(".photos-grid__like-counter");
    this._trashIcon = this._element.querySelector(".photos-grid__trash");
    this._likesCounter.textContent = this._likesCount;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._text;
    this._cardCaption.textContent = this._text;
    if (this._owner !== this._user) {
      this._trashIcon.classList.add("photos-grid__trash_disables");
    }
    if (this.isCardLiked()) {
      this._element.querySelector(".heart").classList.add("heart_active");
    }
    this._setEventListeners();
    return this._element;
  }

  // handle delete function
  deleteCard() {
    this._element.remove();
    // remove the link to the DOM element:
    this._element = null;
  }

  // add event listeners
  _setEventListeners() {
    this._element.querySelector(".heart").addEventListener("click", () => this._handleLikeButton(this._id));
    this._element.querySelector(".photos-grid__trash").addEventListener("click", () => this._handleDeleteCard(this._id));
    this._element.querySelector(".photos-grid__photo").addEventListener("click", this._handleCardClick);
  }

  // mark like icon and update like counter
  likeCard = (data) => {
    this._likes = data.likes;
    this._element.querySelector(".heart").classList.add("heart_active");
    this._likesCounter.textContent = data.likes.length;
  };

  // remove like icon and update like counter
  removeLike = (data) => {
    this._likes = data.likes;
    this._element.querySelector(".heart").classList.remove("heart_active");
    this._likesCounter.textContent = data.likes.length;
  };
}
