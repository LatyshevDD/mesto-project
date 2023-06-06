
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
  inactiveSubmitButtonState,
  handleSubmit,
  createCard
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
      function makeRequest() {
        return api.changeUserInformation(data.name, data.profession).then((userData) => {
        userInfo.setUserInfo(userData)
        });
      }
      handleSubmit(makeRequest, popupFormProfile);
  }
})

popupFormProfile.setEventListeners();

const popupFormAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleSubmitForm: (data) => {
    function makeRequest() {
      return api.changeUserAvatar(data.link).then((res) => {
      userInfo.setUserAvatar(res)
      });
    }
    handleSubmit(makeRequest, popupFormAvatar);
  }
}
)

popupFormAvatar.setEventListeners();

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

let cardSection = {};

Promise.all([
  api.getUserInformation(),
  api.getInitialCards()
])
  .then((values) => {
    let userData = values[0];
    let cardsData = values[1];

    // Формируем секцию с карточками
      cardSection = new Section({
      items: cardsData,
      renderer: (item) => {
        createCard(item, popupCapture, cardSection, userData._id, cardTeamplateSelector, 'append');
      }

    }, cardsContainerSelector);

    cardSection.renderItems();

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .catch((err) => {
    console.log(err);
  })

  const popupAddNewCard = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleSubmitForm: (data) => {
      function makeRequest() {
        return api.postNewCard(data.title, data.link).then((res) => {
          createCard(res, popupCapture, cardSection, res.owner._id, cardTeamplateSelector, "prepend");
        });
      }
      handleSubmit(makeRequest, popupAddNewCard);
    }
  });

  popupAddNewCard.setEventListeners();

//Слушатели

profileEditButtonOpen.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
  profileFormValidation.resetValidation();
  popupFormProfile.open();
})

profileAvatarContainer.addEventListener('click', () => {
  editAvatarLinkInput.value = '';
  avatarFormValidation.resetValidation();
  popupFormAvatar.open();
});

cardsAddButtonOpen.addEventListener('click', () => {
  addCardnameInput.value = '';
  addCardlinkInput.value = '';
  addCardFormValidation.resetValidation();
  popupAddNewCard.open();
});
