export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.querySelector(this._selector).classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.querySelector(this._selector).addEventListener('click', (evt) => {this._overlayClosePopup(evt)});
  }

  close() {
    document.querySelector(this._selector).classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.querySelector(this._selector).removeEventListener('click', (evt) => {this._overlayClosePopup(evt)});
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
