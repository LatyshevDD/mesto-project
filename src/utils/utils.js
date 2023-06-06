import {api} from "../components/Api.js";

import Card from "../components/Card.js";

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

export function handleSubmit(request, popupInstance) {
  popupInstance.renderLoading(true);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

export function createCard(cardData, popupCaptureInstance, cardSectionInstance, userData, cardTeamplateSelector, insertOption) {
  const newCard = new Card({
    data: cardData,
    handleCardClick: () => {
      popupCaptureInstance.open(item)
    },
    likeApiRequest: (cardId) => { return api.likeCardToServer(cardId) },
    dislikeApiRequest: (cardId) => { return api.disLikeCardFromServer(cardId) },
    deleteCardApiRequest: (cardId) => { return api.deleteCardFromServer(cardId) },
    getCardInformApiRequest: () => { return api.getInitialCards() }
    }, cardTeamplateSelector);
    const cardElement = newCard.generateCard(userData);
    cardSectionInstance.addItem(cardElement, insertOption);
}


