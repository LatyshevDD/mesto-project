//--------- Imports  ---------------
import { getUserInformation, getInitialCards, postNewCard, changeUserInformation, likeCardToServer, getResponseData } from '../components/Api';

import '../index.css';

import { profileEditSubmitButton, closePopup, escapeClosePopup, overlayClosePopup, openPopup, cardsAddSubmitButton, captureImage,
capture, popupCapture, captureTitle, cardsAddCardPopup, cardsAddButtonOpen, cardsAddButtonClose, profileSection,
profileEditButtonOpen, profileEditPopup, profileEditButtonClose, addCardForm, addCardnameInput, addCardlinkInput,
profileEditForm, nameInput, jobInput, profileName, profileProfession, captureCloseButton,
editFormSubmitHandler, toggleButtonState, createCapture, profileAvatar, setCloseButtonPopupListeners, editAvatarPopup, editAvatarSubmitButton,
editAvatarLinkImput, editAvatarForm, profileAvatarContainer, editUserAvatarSubmitHandler } from '../components/modal.js';

import { cardsSection, cardsContainer, likeCardSubmitHandler, deleteCard, createCard, addNewCardSubmitHandler, disableDeleteCardButton } from '../components/Card.js';

import { hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, inactiveSubmitButtonState, resetInputErrors } from '../components/validate.js';



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

  // Формируем секцию с карточками. +++Закоментил, т.к. реализовал функционал через классы
    // cardsData.forEach(function (item) {
    // cardsContainer.prepend(createCard (item, userData._id));
    // });
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


// ======= ООП ========


import {cardsContainerSelector, cardTeamplateSelector} from "../utils/constants.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card";


const newApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '902e7d86-3306-44b1-a025-c502f89e3c4a',
    'Content-Type': 'application/json'
  }
});



Promise.all([
  newApi.getUserInformation(),
  newApi.getInitialCards()
])
.then((values) => {
  let userData = values[0];
  let cardsData = values[1];

  // Формируем секцию с карточками
  const cardSection = new Section({
    items: cardsData,
    renderer: (item) => {
      const newCard = new Card({
        data: item,
        handleButtonClick: () => {},
        likeApiRequest: (cardId) => {return newApi.likeCardToServer(cardId)},
        dislikeApiRequest: (cardId) => {return newApi.disLikeCardFromServer(cardId)}
      }, cardTeamplateSelector);
      const cardElement = newCard.generateCard(userData._id);
      const likeButton = cardElement.querySelector(".elements__like-button");


      cardSection.addItem(cardElement);
  }}, cardsContainerSelector);

  cardSection.renderItems();


})
.catch((err) => {
  console.log(err);
})
