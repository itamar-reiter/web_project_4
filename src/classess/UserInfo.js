export default class UserInfo {
  constructor(nameContainerSelector, jobContainerSelector) {
    this._nameContainer = document.querySelector(nameContainerSelector);
    this._jobContainer = document.querySelector(jobContainerSelector);
  }

  getUserInfo = (name, job) => {
    const userInfo = { name, job };
    return userInfo;
  };

  setUserInfo(name, job) {
    this._nameContainer.textContent = name;
    this._jobContainer.textContent = job;
  }
}
