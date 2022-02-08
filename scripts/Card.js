import { openPopup } from "./utils.js";

export class Card {
  constructor(text, link, template) {
    this._text = text;
    this._link = link;
    this._template = template;
  }

  // cloning new card from template and adding the info from input
  _getCardData() {
    const cardElement = document.querySelector(this._template).content.querySelector(".photos-grid__card").cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getCardData();
    this._setEventListeners();
    this._element.querySelector(".photos-grid__photo").src = this._link;
    this._element.querySelector(".photos-grid__photo").alt = this._text;
    this._element.querySelector(".photos-grid__location").textContent = this._text;
    return this._element;
  }

  // add event listeners
  _setEventListeners() {
    this._element.querySelector(".heart").addEventListener("click", () => this._hundleLikeButton());
    this._element.querySelector(".photos-grid__trash").addEventListener("click", () => this._hundleDeleteButton());
    this._element.querySelector(".photos-grid__photo").addEventListener("click", () => this._handlePopupPicture());
  }

  // handle delete function
  _hundleDeleteButton() {
    this._element.remove();
  }

  // handle like function
  _hundleLikeButton() {
    this._element.querySelector(".heart").classList.toggle("heart_active");
  }

  // handle popup picture modal function
  _handlePopupPicture() {
    const popupCard = document.querySelector(".picture-popup");
    const popupCardPicture = popupCard.querySelector(".picture-popup__popup-image");
    const popupCardText = popupCard.querySelector(".picture-popup__popup-text");
    popupCardPicture.src = this._link;
    popupCardPicture.alt = this._text;
    popupCardText.textContent = this._text;
    openPopup(popupCard);
  }
}
