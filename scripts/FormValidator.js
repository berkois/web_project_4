/* -------------------------------------------------------------------------- */
/*                               Form validation                              */
/* -------------------------------------------------------------------------- */

export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  enableValidation() {
    this._form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  // add the ability to reset the validation between sessions
  resetValidation() {
    this._inputList = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._inputList.forEach((inputElement) => {
      inputElement.value = "";
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  }

  // prompting error message with its style per form and input field
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // removing the error message
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  // checking the validity of specific input
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // checking the validity of entire form
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // toggling the submit button active of inactive, to be used based on form validity
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // a function to add event listener for every for input field in the page
  _setEventListeners() {
    // setting an array of all input fields of a given form
    this._inputList = [...this._form.querySelectorAll(this._config.inputSelector)];

    // declaring the submit button of a given form
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    // setting the initial state of the submit button (will be set to inactive)
    this._toggleButtonState();

    // setting event listener for every input field to test validity and respond accordingly
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}
