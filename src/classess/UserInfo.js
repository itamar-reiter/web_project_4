export default class UserInfo {
  constructor(
    nameContainerSelector,
    jobContainerSelector,
    userImageContainerSelector
  ) {
    this._nameContainer = document.querySelector(nameContainerSelector);
    this._jobContainer = document.querySelector(jobContainerSelector);
    this._userImageContainer = document.querySelector(
      userImageContainerSelector
    );
  }

  setUserImage = (resJson) => {
      this._userImageContainer.style.backgroundImage =
        `
      url(` +
        resJson +
        `)`;
  };

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
