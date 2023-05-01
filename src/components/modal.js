import { cardsSection, cardsContainer } from "./card.js";

import { hasInvalidInput } from "./validate.js";

export const profileSection = document.querySelector('.profile');
export const profileEditButtonOpen = profileSection.querySelector('.profile__edit-button');
export const profileEditPopup = profileSection.querySelector('.popup_type_edit-profile');
export const profileEditButtonClose = profileEditPopup.querySelector('.popup__close-button');

export const popupCapture = document.querySelector('.popup_type_capture');
export const capture = popupCapture.querySelector('.popup__capture');
export const captureImage = capture.querySelector('.popup__capture-image');
export const captureTitle = capture.querySelector('.popup__capture-title');

export const cardsAddCardPopup = cardsSection.querySelector('.popup_type_add-card');
export const cardsAddButtonOpen = profileSection.querySelector('.profile__add-button');
export const cardsAddButtonClose = cardsAddCardPopup.querySelector('.popup__close-button');

export const addCardForm = cardsAddCardPopup.querySelector('.form');
export const addCardnameInput = addCardForm.querySelector('.form__input-text_type_image-title');
export const addCardlinkInput = addCardForm.querySelector('.form__input-text_type_image-link');
export const cardsAddSubmitButton = addCardForm.querySelector('.form__input-submit');


export const profileEditForm = profileEditPopup.querySelector('.form');
export const nameInput = profileEditForm.querySelector('.form__input-text_type_name');
export const jobInput = profileEditForm.querySelector('.form__input-text_type_profession');
export const profileEditSubmitButton = profileEditPopup.querySelector('.form__input-submit');

export const profileName = profileSection.querySelector('.profile__name');
export const profileProfession = profileSection.querySelector('.profile__profession');

export const captureCloseButton = popupCapture.querySelector('.popup__close-button');


export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', EscapeClosePopup);
  popup.removeEventListener('click', overlayClosePopup);
}

export function EscapeClosePopup(evt) {
  if (evt.key == "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
    closePopup(openedPopup);
    }
  }
}

export function overlayClosePopup(evt) {
  if (evt.target.closest('.popup__container')) {
    return;
  }
  closePopup(evt.target.closest('.popup'));
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', EscapeClosePopup);
  popup.addEventListener('click', overlayClosePopup);
}

export function editFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(profileEditPopup);
}


export function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

export function createCapture(evt) {
  const target = evt.target;
  if (target.classList.contains('elements__image')){
    captureImage.src = target.src;
    captureImage.alt = target.alt;
    captureTitle.textContent = target.alt;
  }
}
