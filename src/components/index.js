//--------- Imports  ---------------
import { getUserInformation, getInitialCards, postNewCard, changeUserInformation, likeCardToServer } from './api';

import '../pages/index.css';

import { profileEditSubmitButton, closePopup, EscapeClosePopup, overlayClosePopup, openPopup, cardsAddSubmitButton, captureImage,
capture, popupCapture, captureTitle, cardsAddCardPopup, cardsAddButtonOpen, cardsAddButtonClose, profileSection,
profileEditButtonOpen, profileEditPopup, profileEditButtonClose, addCardForm, addCardnameInput, addCardlinkInput,
profileEditForm, nameInput, jobInput, profileName, profileProfession, captureCloseButton,
editFormSubmitHandler, toggleButtonState, createCapture, profileAvatar } from './modal.js';

import { cardsSection, cardsContainer, likeCardSubmitHandler, deleteCard, createCard, addNewCardSubmitHandler, disableDeleteCardButton } from './card.js';

import { hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, inactiveSubmitButtonState, resetInputErrors } from './validate.js';

// --------- Profile  ---------------
export function getProfileInfoFromServer() {
  getUserInformation()
    .then(data => {
      profileName.textContent = data.name;
      profileProfession.textContent = data.about;
      profileAvatar.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
}

getProfileInfoFromServer();

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
getUserInformation()
.then(data => {
  return data;
})
.then(userData => {
  getInitialCards()
    .then(cardsData => {

    // Формируем секцию с карточками
    cardsData.forEach(function (item) {
      cardsContainer.prepend(createCard (item, userData._id));
    });
    return cardsData;
    })
    .then(cardsData => {
    const cardsArray = Array.from(cardsContainer.children);
    cardsArray.reverse();

    // Закрашиваем свои лайки
    cardsData.forEach((item, index) => {
      if (item.likes.some(item => {
        return item.name == userData.name && item.about == userData.about;
      })) {
        cardsArray[index].querySelector('.elements__like-button').classList.add('elements__like-button_active');
      }
    });
    // Устанавливаем количество лайков
    cardsData.forEach((item, index) => {
      cardsArray[index].querySelector('.elements__like-counter').textContent = item.likes.length;
    });

})
  .catch((err) => {
      console.log(err);
  })
})
.catch((err) => {
  console.log(err);
})


// Add new card
addCardForm.addEventListener('submit', addNewCardSubmitHandler);



// ------------ Popups  --------------
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
