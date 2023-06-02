export function setLoadingToSubmitButton(button, standartStatus, isLoading) {
  if (isLoading) {
    button.value = "Сохранение...";
  } else {
    button.value = standartStatus;
  }
}

export function inactiveSubmitButtonState(submitButtonElement, settings) {
  submitButtonElement.classList.add(settings.inactiveButtonClass);
  submitButtonElement.disabled = true;
}

export function resetInputErrors(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input-text'));

  inputList.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.form__input-error_${inputElement.id}`);
    inputElement.classList.remove('form__input-text_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  })
}


