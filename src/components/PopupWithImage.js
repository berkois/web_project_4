import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, source, caption) {
    super(popupSelector);
    this._source = source;
    this._caption = caption;
  }
  open() {
    this._popup.querySelector(".picture-popup__popup-image").src = this._source;
    this._popup.querySelector(".picture-popup__popup-image").alt = this._caption;
    this._popup.querySelector(".picture-popup__popup-text").textContent = this._caption;
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
}
