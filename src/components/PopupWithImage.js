import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, source, caption) {
    super(popupSelector);
    this._source = source;
    this._caption = caption;
  }
  open(newPopupImage) {
    super.open();
    this._source = newPopupImage.link;
    this._caption = newPopupImage.name;
    this._popupImage = this._popup.querySelector(".picture-popup__popup-image");
    this._popupCaption = this._popup.querySelector(".picture-popup__popup-text");
    this._popupImage.src = this._source;
    this._popupImage.alt = this._caption;
    this._popupCaption.textContent = this._caption;
  }
}
