//--------- Imports  ---------------
//import { getUserInformation, getInitialCards, postNewCard, changeUserInformation, likeCardToServer, getResponseData } from '../components/Api';



// import {
//   profileEditSubmitButton, closePopup, escapeClosePopup, overlayClosePopup, cardsAddSubmitButton, captureImage,
//   capture, /*popupCapture,*/ captureTitle, cardsAddCardPopup, cardsAddButtonOpen, cardsAddButtonClose, profileSection,
//   profileEditButtonOpen, profileEditPopup, profileEditButtonClose, addCardForm, addCardnameInput, addCardlinkInput,
//   /*profileEditForm,*/ nameInput, jobInput, /*profileName, profileProfession,*/ captureCloseButton, toggleButtonState, createCapture, /*profileAvatar,*/ editAvatarPopup, editAvatarSubmitButton,
//   editAvatarLinkInput, editAvatarForm, profileAvatarContainer
// } from '../utils/constants.js';

//import { setCloseButtonPopupListeners, /*openPopup*/ editFormSubmitHandler, editUserAvatarSubmitHandler } from "../components/modal.js";

//import { cardsSection, cardsContainer, likeCardSubmitHandler, deleteCard, createCard, addNewCardSubmitHandler, disableDeleteCardButton } from '../components/Card.js';

//import { hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, inactiveSubmitButtonState, resetInputErrors } from '../components/validate.js';


// Инициализация проекта
/*
Promise.all([
  getUserInformation(),
  getInitialCards()
])
  .then((values) => {
    let userData = values[0];
    let cardsData = values[1];
    // Подгружаем информацию о пользователе
    // profileName.textContent = userData.name;
    // profileProfession.textContent = userData.about;
    // profileAvatar.src = userData.avatar;

    // Формируем секцию с карточками. +++Закоментил, т.к. реализовал функционал через классы
    // cardsData.forEach(function (item) {
    // cardsContainer.prepend(createCard (item, userData._id));
    // });
  })
  .catch((err) => {
    console.log(err);
  })
*/

// --------- Close popups  ---------------
// setCloseButtonPopupListeners();

// --------- Open popups  ---------------
// export function clearInputsCardValues() {
//   addCardnameInput.value = '';
//   addCardlinkInput.value = '';
// }

// Open popup create new card listener
// cardsAddButtonOpen.addEventListener('click', () => {
//   clearInputsCardValues();
//   openPopup(cardsAddCardPopup);
//   resetInputErrors(addCardForm);
//   inactiveSubmitButtonState(cardsAddSubmitButton, { inactiveButtonClass: 'form__input-submit_disabled' });
// });

// Open popup edit Avatar
// profileAvatarContainer.addEventListener('click', () => {
//   editAvatarLinkInput.value = '';
//   openPopup(editAvatarPopup);
//   resetInputErrors(editAvatarForm);
//   inactiveSubmitButtonState(editAvatarSubmitButton, { inactiveButtonClass: 'form__input-submit_disabled' });
// });

//  Open popup edit profile listener
// profileEditButtonOpen.addEventListener('click', () => {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileProfession.textContent;
//   openPopup(profileEditPopup);
//   inactiveSubmitButtonState(profileEditSubmitButton, { inactiveButtonClass: 'form__input-submit_disabled' });
// });


// ------------ Cards  --------------
// Add new card
// addCardForm.addEventListener('submit', addNewCardSubmitHandler);



// ------------ Popups  --------------
//profileEditForm.addEventListener('submit', editFormSubmitHandler);
//editAvatarForm.addEventListener('submit', editUserAvatarSubmitHandler);

// --------- Form validation -------------
// enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__input-text',
//   submitButtonSelector: '.form__input-submit',
//   inactiveButtonClass: 'form__input-submit_disabled',
//   inputErrorClass: 'form__input-text_type_error',
//   errorClass: 'form__input-error_active'
// });


// ======= ООП ========

import '../index.css';

import {
  cardsContainerSelector,
  cardTeamplateSelector,
  profileName,
  profileProfession,
  profileAvatar,
  config,
  profileEditForm,
  editAvatarForm,
  addCardForm,
  profileEditButtonOpen,
  profileAvatarContainer,
  cardsAddButtonOpen,
  nameInput,
  jobInput,
  editAvatarLinkInput,
  addCardnameInput,
  addCardlinkInput,
  editAvatarSubmitButton,
  profileEditSubmitButton,
  cardsAddSubmitButton
} from "../utils/constants.js";

//import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card";
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';

import {
  setLoadingToSubmitButton,
  resetInputErrors,
  inactiveSubmitButtonState
} from "../utils/utils.js";

import FormValidator from '../components/FormValidator';

import { api } from '../components/Api'

const userInfo = new UserInfo({
  userNameEl: profileName,
  userAboutEl: profileProfession,
  userAvatarEl: profileAvatar
});

const popupFormProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleSubmitForm: (data) => {
    setLoadingToSubmitButton(profileEditSubmitButton, "Сохранить", true);
    api.changeUserInformation(data.name, data.profession)
      .then(res => {
        userInfo.setUserInfo(res)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(_ => {
        setLoadingToSubmitButton(profileEditSubmitButton, "Сохранить", false);
      })
  }
})

popupFormProfile.setEventListeners();

const popupFormAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleSubmitForm: (data) => {
    setLoadingToSubmitButton(editAvatarSubmitButton, "Сохранить", true);
    api.changeUserAvatar(data.link)
      .then(res => {
        userInfo.setUserAvatar(res)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(_ => {
        setLoadingToSubmitButton(editAvatarSubmitButton, "Сохранить", false);
      })
  }
}
)

popupFormAvatar.setEventListeners();

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleSubmitForm: (data) => {
    setLoadingToSubmitButton(cardsAddSubmitButton, "Создать", true);
    api.postNewCard(data.title, data.link)
      .then(res => {
        const cardSection = new Section({
          items: [res],
          renderer: (item) => {
            const newCard = new Card({
              data: item,
              handleCardClick: () => {
                popupCapture.open(item)
              },
              likeApiRequest: (cardId) => { return api.likeCardToServer(cardId) },
              dislikeApiRequest: (cardId) => { return api.disLikeCardFromServer(cardId) },
              deleteCardApiRequest: (cardId) => { return api.deleteCardFromServer(cardId) }
            }, cardTeamplateSelector);
            const cardElement = newCard.generateCard(item.owner._id);

            cardSection.addItem(cardElement, 'prepend');
          }
        }, cardsContainerSelector);

        cardSection.renderItems();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(_ => {
        setLoadingToSubmitButton(cardsAddSubmitButton, "Создать", false);
      })
  }
});

popupAddNewCard.setEventListeners();

const popupCapture = new PopupWithImage({
  popupSelector: '.popup_type_capture',
  imageSelector: '.popup__capture-image',
  captionSelector: '.popup__capture-title'
})

popupCapture.setEventListeners();

const profileFormValidation = new FormValidator(config, profileEditForm);
profileFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(config, editAvatarForm);
avatarFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(config, addCardForm)
addCardFormValidation.enableValidation();

Promise.all([
  api.getUserInformation(),
  api.getInitialCards()
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
          handleCardClick: () => {
            popupCapture.open(item)
          },
          likeApiRequest: (cardId) => { return newApi.likeCardToServer(cardId) },
          dislikeApiRequest: (cardId) => { return newApi.disLikeCardFromServer(cardId) },
          deleteCardApiRequest: (cardId) => { return newApi.deleteCardFromServer(cardId) },
          getCardInformApiRequest: () => { return newApi.getInitialCards() }
        }, cardTeamplateSelector);
        const cardElement = newCard.generateCard(userData._id);

        cardSection.addItem(cardElement, 'append');
      }
    }, cardsContainerSelector);

    cardSection.renderItems();

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .catch((err) => {
    console.log(err);
  })

//Слушатели

profileEditButtonOpen.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
  popupFormProfile.open();
  inactiveSubmitButtonState(profileEditSubmitButton, { inactiveButtonClass: 'form__input-submit_disabled' });

  const inputList = Array.from(profileEditForm.querySelectorAll(config.inputSelector));
  inputList.forEach(item => {
    profileFormValidation._checkInputValidity(item);
  })

})

profileAvatarContainer.addEventListener('click', () => {
  editAvatarLinkInput.value = '';
  popupFormAvatar.open();
  resetInputErrors(editAvatarForm);
  inactiveSubmitButtonState(editAvatarSubmitButton, { inactiveButtonClass: 'form__input-submit_disabled' });
});

cardsAddButtonOpen.addEventListener('click', () => {
  addCardnameInput.value = '';
  addCardlinkInput.value = '';
  popupAddNewCard.open();
  resetInputErrors(addCardForm);
  inactiveSubmitButtonState(cardsAddSubmitButton, { inactiveButtonClass: 'form__input-submit_disabled' });
});
