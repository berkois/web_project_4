// default form selectors configuration, to be used by form-validator
export const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_state_error",
  errorClass: "popup__input-error_active",
};

export const customFetch = (url, headers, errorFunction) =>
  fetch(url, headers)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .catch((err) => {
      console.log(err);
      errorFunction(err);
    });
