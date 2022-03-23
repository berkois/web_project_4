import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, actionsForSubmit) {
    super(popupSelector);
    this._actionsForSubmit = actionsForSubmit;
  }

  _getInputValues() {
    const formValues = {};
    const inputs = this._popup.querySelectorAll(".popup__input");
    inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = evt.target.querySelector(".popup__save-button");
    submitButton.textContent = "Saving...";
    this._actionsForSubmit(this._getInputValues(), submitButton);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
