import { cardsSection, cardsContainer } from "./Card.js";

import { hasInvalidInput } from "./validate.js";

import { changeUserInformation, changeUserAvatar } from "./Api.js";


// export function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', escapeClosePopup);
//   popup.removeEventListener('click', overlayClosePopup);
// }

// export function escapeClosePopup(evt) {
//   if (evt.key == "Escape") {
//     const openedPopup = document.querySelector('.popup_opened');
//     if (openedPopup) {
//     closePopup(openedPopup);
//     }
//   }
// }

// export function overlayClosePopup(evt) {
//   if (evt.target.closest('.popup__container')) {
//     return;
//   }
//   closePopup(evt.target.closest('.popup'));
// }

// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', escapeClosePopup);
//   popup.addEventListener('click', overlayClosePopup);
// }

export function editFormSubmitHandler (evt) {
  evt.preventDefault();
  setLoadingToSubmitButton(profileEditSubmitButton, "Сохранить", true);
  changeUserInformation(nameInput.value, jobInput.value)
  .then((data) => {
      profileName.textContent = data.name;
      profileProfession.textContent = data.about;
      closePopup(profileEditPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setLoadingToSubmitButton(profileEditSubmitButton, "Сохранить", false);
  })
}

export function editUserAvatarSubmitHandler (evt) {
  evt.preventDefault();
  const link = editAvatarLinkImput.value;
  setLoadingToSubmitButton(editAvatarSubmitButton, "Сохранить", true);
  changeUserAvatar(link)
  .then((data) => {
    profileAvatar.src = data.avatar;
    closePopup(editAvatarPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setLoadingToSubmitButton(editAvatarSubmitButton, "Сохранить", false);
  })
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

export function setCloseButtonPopupListeners() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  const closeButtonList = Array.from(document.querySelectorAll('.popup__close-button'));
  closeButtonList.forEach((item, index) => {
    item.addEventListener('click', () => {closePopup(popupList[index])});
  })
}

// export function setLoadingToSubmitButton(button, standartStatus, isLoading) {
//   if(isLoading) {
//     button.value = "Сохранение...";
//   } else {
//     button.value = standartStatus;
//   }
// }


