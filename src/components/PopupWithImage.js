import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, captionSelector }) {
    super(popupSelector);
    this._imageEl = document.querySelector(imageSelector);
    this._captionEl = document.querySelector(captionSelector);
  }

  open({ name, link }) {
    super.open();
    this._captionEl.textContent = name;
    this._imageEl.src = link;
    this._imageEl.alt = name;
  }
}
