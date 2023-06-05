export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._overlayClosePopup = this._overlayClosePopup.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._overlayClosePopup);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._overlayClosePopup);
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }

  _overlayClosePopup(evt) {
    if (evt.target.closest('.popup__container')) {
      return;
    }
    this.close();
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', (evt) => {
      this.close();
    });
  }
}
