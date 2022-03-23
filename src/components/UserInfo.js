export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._nameElement = document.querySelector(userNameSelector);
    this._jobElement = document.querySelector(userJobSelector);
    this._avatarElement = document.querySelector(userAvatarSelector);
  }

  getUserData() {
    const userData = {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
    };
    return userData;
  }

  setUserData(newUserData) {
    this._nameElement.textContent = newUserData.name;
    this._jobElement.textContent = newUserData.about;
  }

  setUserAvatar(avatarUrl) {
    this._avatarElement.style.backgroundImage = `url(${avatarUrl})`;
  }
}
