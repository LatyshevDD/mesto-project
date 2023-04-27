
// --------- Close popups  ---------------

// Close popups functions
import { closePopup } from "./modal.js";
import { EscapeClosePopup } from "./modal.js";
import { overlayClosePopup } from "./modal.js";


profileEditButtonClose.addEventListener('click', () => {closePopup(profileEditPopup)});
cardsAddButtonClose.addEventListener('click', () => {closePopup(cardsAddCardPopup)});
captureCloseButton.addEventListener('click', () => {closePopup(popupCapture)});



// --------- Open popups  ---------------

import { openPopup } from "./modal.js";

// Open popup create new card listener
cardsAddButtonOpen.addEventListener('click', () => {
  addCardnameInput.value = '';
  addCardlinkInput.value = '';
  openPopup(cardsAddCardPopup);
});

//  Open popup edit profile listener
profileEditButtonOpen.addEventListener('click', () => {
  openPopup(profileEditPopup);
});


// ------------ Cards  --------------

// Cards constants
import { cardsSection } from "./card.js";
import { cardsContainer } from "./card.js";
import { initialCards } from "./card.js";

// Cards functions
import { likeCard } from "./card.js";
import { deleteCard } from "./card.js";
import { createCapture } from "./modal.js";
import { createCard } from "./card.js";
import { addNewCard } from "./card.js";
import { addNewCardSubmitHandler } from "./card.js";

// Creat cards section
initialCards.forEach(function (item) {
  cardsContainer.prepend(createCard (item));
});

// Add new card
addCardForm.addEventListener('submit', addNewCardSubmitHandler);



// ------------ Popups  --------------

// Popups constants
import { captureImage } from "./modal.js";;
import { capture } from "./modal.js";;
import { popupCapture } from "./modal.js";;
import { captureTitle } from "./modal.js";;
import { cardsAddCardPopup } from "./modal.js";
import { cardsAddButtonOpen } from "./modal.js";
import { cardsAddButtonClose } from "./modal.js";
import { profileSection } from "./modal.js";
import { profileEditButtonOpen } from "./modal.js";
import { profileEditPopup } from "./modal.js";
import { profileEditButtonClose } from "./modal.js";
import { addCardForm } from "./modal.js";
import { addCardnameInput } from "./modal.js";
import { addCardlinkInput } from "./modal.js";
import { formElement } from "./modal.js";
import { nameInput } from "./modal.js";
import { jobInput } from "./modal.js";
import { profileName } from "./modal.js";
import { profileProfession } from "./modal.js";
import { captureCloseButton } from "./modal.js";


// Popups functions
import { clearInputsCardValues } from "./modal.js";
import { editFormSubmitHandler } from "./modal.js";

nameInput.value = 'Жак-Ив Кусто';
jobInput.value = 'Исследователь океана';


formElement.addEventListener('submit', editFormSubmitHandler);


// --------- Form validation -------------

// Form validation functions
import { showInputError } from "./validate.js";
import { hideInputError } from "./validate.js";
import { checkInputValidity } from "./validate.js";
import { setEventListeners } from "./validate.js";
import { enableValidation } from "./validate.js";
import { hasInvalidInput } from "./validate.js";
import { toggleButtonState } from "./modal.js";

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input-text',
  submitButtonSelector: '.form__input-submit',
  inactiveButtonClass: 'form__input-submit_disabled',
  inputErrorClass: 'form__input-text_type_error',
  errorClass: 'form__input-error_active'
});



