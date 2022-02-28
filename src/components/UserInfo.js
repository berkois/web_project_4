export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    this._user = {};
    this._user.name = this._name;
    this._user.job = this._job;
    return this._user;
  }

  setUserInfo(nameContainer, jobContainer) {
    nameContainer.textContent = this.getUserInfo().name;
    jobContainer.textContent = this.getUserInfo().job;
  }
}
