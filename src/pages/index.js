
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
  handleSubmit
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

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleSubmitForm: (data) => {
    popupAddNewCard.renderLoading(true);
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
              deleteCardApiRequest: (cardId) => { return api.deleteCardFromServer(cardId) },
              getCardInformApiRequest: () => { return api.getInitialCards() }
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
        popupAddNewCard.renderLoading(false);
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
          likeApiRequest: (cardId) => { return api.likeCardToServer(cardId) },
          dislikeApiRequest: (cardId) => { return api.disLikeCardFromServer(cardId) },
          deleteCardApiRequest: (cardId) => { return api.deleteCardFromServer(cardId) },
          getCardInformApiRequest: () => { return api.getInitialCards() }
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
