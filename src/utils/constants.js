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
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch((err) => {
      console.log(`error: status code ${err}.`);
      errorFunction(`error: status code ${err}.`);
    });

export const popupErrorSelector = ".popup_type_error";
export const profileNameSelector = ".profile__name";
export const profileTitleSelector = ".profile__title";
export const profileAvatarSelector = ".profile__avatar";
export const nameInput = ".popup__input_type_name";
export const jobInput = ".popup__input_type_job";
export const avatarInput = "popup__input_type_avatar-src";
export const profileAvatarEdit = document.getElementById("profile-avatar-edit");
export const popupEditProfile = ".popup_type_edit-profile";
export const formEditProfile = ".popup__form_type_edit-profile";
export const editButton = document.querySelector(".profile__edit-button");
export const popupEditAvatar = ".popup_type_edit-avatar";
export const formEditAvatar = ".popup__form_type_edit-avatar";
export const avatarEditArea = document.querySelector(".profile__avatar-cover");
export const popupCard = ".picture-popup";
export const popupDeleteCardSelector = ".popup_type_delete-card";
export const popupAddCard = ".popup_type_add-card";
export const addCardButton = document.querySelector(".profile__add-button");
export const formAddCard = ".popup__form_type_add-card";
