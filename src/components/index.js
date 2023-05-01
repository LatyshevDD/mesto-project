//--------- Imports  ---------------
import '../pages/index.css';

import { profileEditSubmitButton, closePopup, EscapeClosePopup, overlayClosePopup, openPopup, cardsAddSubmitButton, captureImage,
capture, popupCapture, captureTitle, cardsAddCardPopup, cardsAddButtonOpen, cardsAddButtonClose, profileSection,
profileEditButtonOpen, profileEditPopup, profileEditButtonClose, addCardForm, addCardnameInput, addCardlinkInput,
profileEditForm, nameInput, jobInput, profileName, profileProfession, captureCloseButton,
editFormSubmitHandler, toggleButtonState, createCapture } from './modal.js';

import { cardsSection, cardsContainer, initialCards, likeCard, deleteCard, createCard, addNewCardSubmitHandler } from './card.js';

import { hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, inactiveSubmitButtonState, resetInputErrors } from './validate.js';


// --------- Close popups  ---------------
profileEditButtonClose.addEventListener('click', () => {closePopup(profileEditPopup)});
cardsAddButtonClose.addEventListener('click', () => {closePopup(cardsAddCardPopup)});
captureCloseButton.addEventListener('click', () => {closePopup(popupCapture)});



// --------- Open popups  ---------------
export function clearInputsCardValues () {
  addCardnameInput.value = '';
  addCardlinkInput.value = '';
}

// Open popup create new card listener
cardsAddButtonOpen.addEventListener('click', () => {
  addCardnameInput.value = '';
  addCardlinkInput.value = '';
  openPopup(cardsAddCardPopup);
  resetInputErrors(addCardForm);
  inactiveSubmitButtonState(cardsAddSubmitButton,{inactiveButtonClass: 'form__input-submit_disabled'});
});

//  Open popup edit profile listener
profileEditButtonOpen.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(profileEditPopup);
  inactiveSubmitButtonState(profileEditSubmitButton,{inactiveButtonClass: 'form__input-submit_disabled'});
});


// ------------ Cards  --------------
// Creat cards section
initialCards.forEach(function (item) {
  cardsContainer.prepend(createCard (item));
});

// Add new card function
export function addNewCard() {
  const name = addCardnameInput.value;
  const link = addCardlinkInput.value;
  const cardObject = {};
  cardObject.name = name;
  cardObject.link = link;
  cardsContainer.prepend(createCard(cardObject));
}

// Add new card
addCardForm.addEventListener('submit', addNewCardSubmitHandler);



// ------------ Popups  --------------
nameInput.value = 'Жак-Ив Кусто';
jobInput.value = 'Исследователь океана';


profileEditForm.addEventListener('submit', editFormSubmitHandler);


// --------- Form validation -------------
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__input-submit',
  inactiveButtonClass: 'form__input-submit_disabled',
  inputErrorClass: 'form__input-text_type_error',
  errorClass: 'form__input-error_active'
});



