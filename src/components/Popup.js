export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  open() {
    document.querySelector(this._selector).classList.add('popup_opened');
    document.addEventListener('keydown', () => {
      this._handleEscClose(evt);
    });
    document.querySelector(this._selector).addEventListener('click', () => {
      this._overlayClosePopup(evt);
    });
  }

  close() {
    document.querySelector(this._selector).classList.remove('popup_opened');
    document.removeEventListener('keydown', () => {
      this._handleEscClose(evt);
    });
    document.querySelector(this._selector).removeEventListener('click', () => {
      this._overlayClosePopup(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this._close();
      }
    }
  _overlayClosePopup(evt) {
    if (evt.target.closest('.popup__container')) {
      return;
    }
    this._close();
  }


  setEventListeners() {
    const popup = document.querySelector(this._selector);
    const closeButton = popup.querySelectorAll('.popup__close-button');
    closeButton.addEventListener('click', () => {
      this._close();
    });
  }
}
