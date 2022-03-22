import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  getTask(task) {
    this._handleFormSubmit = task;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }
}
