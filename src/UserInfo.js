import {profileName, profileAboutMe} from "./utils/constants.js"
export default class UserInfo{
  constructor(name, job){
    this._name = name;
    this._job = job;
  }

  getUserInfo(){
    const userData = [this._name, this._job];
    return userData;
  }

  setUserInfo(){
    profileName.textContent = this._name;
    profileAboutMe.textContent = this._job;
  }

}