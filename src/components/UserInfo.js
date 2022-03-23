export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector, formNameInput, formJobInput, formAvatarInput) {
    this._nameElement = document.querySelector(userNameSelector);
    this._jobElement = document.querySelector(userJobSelector);
    this._avatarElement = document.querySelector(userAvatarSelector);
    this._formNameInput = document.querySelector(formNameInput);
    this._formJobInput = document.querySelector(formJobInput);
    this._formAvatarInput = document.querySelector(formAvatarInput);
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
    };
    return userData;
  }

  setUserInfo(newUserData) {
    this._formNameInput.value = newUserData.name;
    this._formJobInput.value = newUserData.about;
    this._nameElement.textContent = newUserData.name;
    this._jobElement.textContent = newUserData.about;
  }

  setUserAvatar(avatarUrl) {
    this._avatarElement.style.backgroundImage = `url(${avatarUrl})`;
  }
}
