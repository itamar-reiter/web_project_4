export default class UserInfo {
  constructor(nameContainerSelector, jobContainerSelector) {
    this._nameContainer = document.querySelector(nameContainerSelector);
    this._jobContainer = document.querySelector(jobContainerSelector);
  }

  getUserInfo = () => {
    return {
      name: this._nameContainer.textContent,
      aboutMe: this._jobContainer.textContent,
    };
  };

  setUserInfo(name, job) {
    this._nameContainer.textContent = name;
    this._jobContainer.textContent = job;
  }
}
