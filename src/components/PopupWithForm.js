import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll('.form__input-text');
    this._form = this._popup.querySelector('.form');
    this._submitBtn = this._popup.querySelector('.form__input-submit');
    this._submitBtnText = this._submitBtn.value;
  }

  _getInputValues() {
    const formValue = {}
    Array.from(this._inputList).forEach(element => {
      formValue[element.name] = element.value
    });

    return formValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this._form.reset();
      this.close();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitBtn.value = loadingText;
    } else {
      this._submitBtn.value = this._submitBtnText;
    }
  }
}
