/* -------------------------------------------------------------------------- */
/*                               Form validation                              */
/* -------------------------------------------------------------------------- */

// prompting error message with its style per form and input field
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_state_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// removing the error message
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_state_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

// checking the validity of specific input
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// checking the validity of entire form
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// toggling the submit button active of inactive, to be used based on form validity
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__save-button_inactive");
    buttonElement.disabled = false;
  }
};

// a function to add event listener for every for input field in the page
const setEventListeners = (formElement) => {
  // setting an array of all input fields of a given form
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  // declaring the submit button of a given form
  const buttonElement = formElement.querySelector(".popup__save-button");

  // setting the initial state of the submit button (will be set to inactive)
  toggleButtonState(inputList, buttonElement);

  // setting event listener for every input field to test validity and respond accordingly
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
