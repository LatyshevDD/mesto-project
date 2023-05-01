import { toggleButtonState, profileEditButtonOpen, profileEditForm } from "./modal.js";

export function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.form__input-error_${inputElement.id}`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

export function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.form__input-error_${inputElement.id}`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

export function checkInputValidity(formElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

export function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
  // Дополнительная проверка валидации при открытии формы редактирования профиля
  profileEditButtonOpen.addEventListener('click', function() {
    const inputList = Array.from(profileEditForm.querySelectorAll(settings.inputSelector));
    for (let i = 0; i < inputList.length; i++) {
      checkInputValidity(profileEditForm, inputList[i], settings);
    }
  });
}

export function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

export function inactiveSubmitButtonState(submitButtonElement, settings) {
  submitButtonElement.classList.add(settings.inactiveButtonClass);
  submitButtonElement.disabled = true;
}


export function resetInputErrors(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input-text'));
  for (let i = 0; i < inputList.length; i++) {
    hideInputError(formElement, inputList[i], {inputErrorClass: 'form__input-text_type_error',
    errorClass: 'form__input-error_active'});
  }
}



