//--------- Imports  ---------------
import { getUserInformation, getInitialCards, postNewCard, changeUserInformation, likeCardToServer, getResponseData } from './api';

import '../pages/index.css';

import { profileEditSubmitButton, closePopup, escapeClosePopup, overlayClosePopup, openPopup, cardsAddSubmitButton, captureImage,
capture, popupCapture, captureTitle, cardsAddCardPopup, cardsAddButtonOpen, cardsAddButtonClose, profileSection,
profileEditButtonOpen, profileEditPopup, profileEditButtonClose, addCardForm, addCardnameInput, addCardlinkInput,
profileEditForm, nameInput, jobInput, profileName, profileProfession, captureCloseButton,
editFormSubmitHandler, toggleButtonState, createCapture, profileAvatar, setCloseButtonPopupListeners, editAvatarPopup, editAvatarSubmitButton,
editAvatarLinkImput, editAvatarForm, profileAvatarContainer, editUserAvatarSubmitHandler } from './modal.js';

import { cardsSection, cardsContainer, likeCardSubmitHandler, deleteCard, createCard, addNewCardSubmitHandler, disableDeleteCardButton } from './card.js';

import { hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, inactiveSubmitButtonState, resetInputErrors } from './validate.js';

// Инициализация проекта
Promise.all([
    getUserInformation(),
    getInitialCards()
])
.then((values) => {
    let userData = values[0];
    let cardsData = values[1];
  // Подгружаем информацию о пользователе
    profileName.textContent = userData.name;
    profileProfession.textContent = userData.about;
    profileAvatar.src = userData.avatar;

  // Формируем секцию с карточками
    cardsData.forEach(function (item) {
    cardsContainer.prepend(createCard (item, userData._id));
    });
})
  .catch((err) => {
      console.log(err);
  })


// --------- Close popups  ---------------
setCloseButtonPopupListeners();

// --------- Open popups  ---------------
export function clearInputsCardValues () {
  addCardnameInput.value = '';
  addCardlinkInput.value = '';
}

// Open popup create new card listener
cardsAddButtonOpen.addEventListener('click', () => {
  clearInputsCardValues();
  openPopup(cardsAddCardPopup);
  resetInputErrors(addCardForm);
  inactiveSubmitButtonState(cardsAddSubmitButton,{inactiveButtonClass: 'form__input-submit_disabled'});
});

// Open popup edit Avatar
profileAvatarContainer.addEventListener('click', () => {
  editAvatarLinkImput.value = '';
  openPopup(editAvatarPopup);
  resetInputErrors(editAvatarForm);
  inactiveSubmitButtonState(editAvatarSubmitButton,{inactiveButtonClass: 'form__input-submit_disabled'});
});

//  Open popup edit profile listener
profileEditButtonOpen.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(profileEditPopup);
  inactiveSubmitButtonState(profileEditSubmitButton,{inactiveButtonClass: 'form__input-submit_disabled'});
});


// ------------ Cards  --------------
// Add new card
addCardForm.addEventListener('submit', addNewCardSubmitHandler);



// ------------ Popups  --------------
profileEditForm.addEventListener('submit', editFormSubmitHandler);
editAvatarForm.addEventListener('submit', editUserAvatarSubmitHandler);

// --------- Form validation -------------
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__input-submit',
  inactiveButtonClass: 'form__input-submit_disabled',
  inputErrorClass: 'form__input-text_type_error',
  errorClass: 'form__input-error_active'
});
