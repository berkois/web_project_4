export default class UserInfo {
  constructor(userNameSelector, userJobSelector, formNameInput, formJobInput) {
    this._nameElement = document.querySelector(userNameSelector);
    this._jobElement = document.querySelector(userJobSelector);
    this._formNameInput = document.querySelector(formNameInput);
    this._formJobInput = document.querySelector(formJobInput);
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
    return userData;
  }

  setUserInfo(newUserData) {
    this._formNameInput.value = newUserData.name;
    this._formJobInput.value = newUserData.job;
    this._nameElement.textContent = newUserData.name;
    this._jobElement.textContent = newUserData.job;
  }
}
