import Popup from "./Popup.js";
export default class PopupWithMessage extends Popup {
  getMessage(messageField, message) {
    this._messageField = this._popup.querySelector(messageField);
    this._messageField.textContent = message;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
    });
  }
}
