export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    // this._userAvatar = document.querySelector(userAvatarSelector);
    // console.log(this._userAvatar.backgroundImage);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userJob: this._userJobElement.textContent,
    };
  }

  setUserInfo(userName, userJob, userAvatar) {
    this._userNameElement.textContent = userName;
    this._userJobElement.textContent = userJob;
    // this._userAvatar.style.backgroundImage = `url(${userAvatar})`;
  }
}
