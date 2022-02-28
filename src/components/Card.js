/* -------------------------------------------------------------------------- */
/*                               Card Generation                              */
/* -------------------------------------------------------------------------- */

export default class Card {
  constructor(text, link, template, handleCardClick) {
    this._text = text;
    this._link = link;
    this._template = document.getElementById(template);
    this._handleCardClick = handleCardClick;
  }

  // cloning new card from template and adding the info from input
  _getCardData() {
    const cardElement = this._template.content.querySelector(".photos-grid__card").cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getCardData();
    this._setEventListeners();
    this._cardPhoto = this._element.querySelector(".photos-grid__photo");
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._text;
    this._element.querySelector(".photos-grid__location").textContent = this._text;
    return this._element;
  }

  // add event listeners
  _setEventListeners() {
    this._element.querySelector(".heart").addEventListener("click", this._handleLikeButton);
    this._element.querySelector(".photos-grid__trash").addEventListener("click", this._handleDeleteButton);
    this._element.querySelector(".photos-grid__photo").addEventListener("click", this._handleCardClick);
  }

  // handle delete function
  _handleDeleteButton = () => {
    this._element.remove();
    // remove the link to the DOM element:
    this._element = null;
  };

  // handle like function
  _handleLikeButton = () => {
    this._element.querySelector(".heart").classList.toggle("heart_active");
  };
}
