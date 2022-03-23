import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, config, actionsForSubmit) {
    super(popupSelector);
    this._inputs = this._popup.querySelectorAll(config.inputSelector);
    this._button = this._popup.querySelector(config.submitButtonSelector);
    this._actionsForSubmit = actionsForSubmit;
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _renderLoading() {
    this._button.textContent = "Saving...";
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._renderLoading();
    this._actionsForSubmit(this._getInputValues(), this._button);
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
