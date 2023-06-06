export default class UserInfo {
  constructor({ userNameEl, userAboutEl, userAvatarEl }) {
    this._userNameEl = userNameEl;
    this._userAboutEl = userAboutEl;
    this._userAvatarEl = userAvatarEl;
  }

  getUserInfo() {
    return {
      name: this._userNameEl.textContent,
      about: this._userAboutEl.textContent
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userNameEl.textContent = name;
    this._userAboutEl.textContent = about;
    this._userAvatarEl.src = avatar;
  }
}
