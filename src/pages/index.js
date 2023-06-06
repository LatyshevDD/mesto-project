
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
  cardsAddButtonOpen
} from "../utils/constants.js";

import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import Card from '../components/Card';

import {
  handleSubmit,
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
      return api.changeUserInformation(data.name, data.about).then((userData) => {
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
        userInfo.setUserInfo(res)
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

function createCard(cardData) {
  const newCard = new Card({
    data: cardData,
    handleCardClick: () => {
      popupCapture.open({ name: cardData.name, link: cardData.link })
    },
    likeApiRequest: (cardId) => { return api.likeCardToServer(cardId) },
    dislikeApiRequest: (cardId) => { return api.disLikeCardFromServer(cardId) },
    deleteCardApiRequest: (cardId) => { return api.deleteCardFromServer(cardId) },
    getCardInformApiRequest: () => { return api.getInitialCards() },
    userId: userId,
  }, cardTeamplateSelector);

  return newCard.generateCard(userId);
}

let cardSection = {};
let userId = null;

Promise.all([
  api.getUserInformation(),
  api.getInitialCards()
])
  .then((values) => {
    const userData = values[0];
    const cardsData = values[1];

    userId = userData._id;

    // Формируем секцию с карточками
    cardSection = new Section({
      items: cardsData,
      renderer: (item) => {
        cardSection.addItem(createCard(item), 'append');
      }

    }, cardsContainerSelector);

    cardSection.renderItems();

    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  })

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleSubmitForm: (data) => {
    function makeRequest() {
      return api.postNewCard(data.title, data.link).then((res) => {
        cardSection.addItem(createCard(res), 'prepend');
      });
    }
    handleSubmit(makeRequest, popupAddNewCard);
  }
});

popupAddNewCard.setEventListeners();

//Слушатели

profileEditButtonOpen.addEventListener('click', () => {
  profileFormValidation.resetValidation();
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  popupFormProfile.open();
})

profileAvatarContainer.addEventListener('click', () => {
  avatarFormValidation.resetValidation();
  popupFormAvatar.open();
});

cardsAddButtonOpen.addEventListener('click', () => {
  addCardFormValidation.resetValidation();
  popupAddNewCard.open();
});
