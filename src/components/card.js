import { popupCapture, addCardnameInput, addCardlinkInput, cardsAddCardPopup, cardsAddSubmitButton } from "../utils/constants.js";

import { createCapture, openPopup, closePopup, profileName, profileProfession, setLoadingToSubmitButton, captureImage, captureTitle } from "./modal.js";

import { clearInputsCardValues } from "../pages/index.js";

import { getInitialCards, deleteCardFromServer, getUserInformation, postNewCard, likeCardToServer, disLikeCardFromServer, getResponseData } from "./Api.js";

export function likeCardSubmitHandler(likeButton, obj, userId) {
  const cardObject = obj;
  const cardObjectLikes = cardObject.likes;

  //Закрашиваем лайк и отправляем на сервер
  if (!cardObjectLikes.some(item => {
    return item._id == userId;
  })) {
    likeCardToServer(cardObject._id)
      .then(cardInfo => {
        likeButton.classList.add('elements__like-button_active');
        likeButton.closest('.elements__card').querySelector('.elements__like-counter').textContent = cardInfo.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });

  } else {
    disLikeCardFromServer(cardObject._id)
      .then(cardInfo => {
        likeButton.classList.remove('elements__like-button_active');
        likeButton.closest('.elements__card').querySelector('.elements__like-counter').textContent = cardInfo.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function deleteCard(newCard, cardId) {
  const card = newCard;
  deleteCardFromServer(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}


export function disableDeleteCardButton(userId, cardOwnerId, button) {
  if (userId != cardOwnerId) {
    button.classList.add('elements__close-button_disabled');
  }
}

export function createCard(obj, userId) {
  const cardName = obj.name;
  const cardLink = obj.link;
  const cardId = obj._id;
  const cardOwnerId = obj.owner._id;
  const cardTemplate = document.querySelector('.cardTemplate').content;
  const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  const cardDeleteButton = card.querySelector('.elements__close-button');
  const cardLikeButton = card.querySelector('.elements__like-button');
  const cardLikeCounter = card.querySelector('.elements__like-counter');
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  card.querySelector('.elements__title').textContent = cardName;


  card.querySelector('.elements__like-button').addEventListener('click', () => { likeCardSubmitHandler(cardLikeButton, obj, userId) });
  cardDeleteButton.addEventListener('click', () => { deleteCard(card, cardId) });
  cardImage.addEventListener('click', createCapture);
  cardImage.addEventListener('click', () => { openPopup(popupCapture) });

  disableDeleteCardButton(userId, cardOwnerId, cardDeleteButton);
  // Закрашиваем свои лайки
  if (obj.likes.some(item => {
    return item._id == userId;
  })) {
    cardLikeButton.classList.add('elements__like-button_active');
  }
  // Устанавливаем количество лайков
  cardLikeCounter.textContent = obj.likes.length;
  return card;
}

export function addNewCardSubmitHandler(evt) {
  evt.preventDefault();
  setLoadingToSubmitButton(cardsAddSubmitButton, "Создать", true);
  postNewCard(addCardnameInput.value, addCardlinkInput.value)
    .then(res => {
      cardsContainer.prepend(createCard(res, res.owner._id));
      closePopup(cardsAddCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoadingToSubmitButton(cardsAddSubmitButton, "Создать", false);
      clearInputsCardValues();
    })
}



// ========= ООП ===========

export default class Card {
  constructor({ data, handleButtonClick, likeApiRequest, dislikeApiRequest }, cardTeamplateSelector) {
    this._data = data;
    this._cardTeamplateSelector = cardTeamplateSelector;
    this._handleButtonClick = handleButtonClick;
    this._likeApiRequest = likeApiRequest;
    this._dislikeApiRequest = dislikeApiRequest;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardTeamplateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  _likeCardSubmitHandler(likeButton, obj, userId) {
    const cardObject = obj;
    const cardObjectLikes = cardObject.likes;

    //Закрашиваем лайк и отправляем на сервер
    if (!cardObjectLikes.some(item => {
      return item._id == userId;
    })) {
      this._likeApiRequest(cardObject._id)
        .then((cardInfo) => {
          likeButton.classList.add('elements__like-button_active');
          likeButton.closest('.elements__card').querySelector('.elements__like-counter').textContent = cardInfo.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });

    } else {
      this._dislikeApiRequest(cardObject._id)
        .then((cardInfo) => {
          likeButton.classList.remove('elements__like-button_active');
          likeButton.closest('.elements__card').querySelector('.elements__like-counter').textContent = cardInfo.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  _setEventListeners(likeButton, obj, userId) {
    likeButton.addEventListener("click", () => {
      this._likeCardSubmitHandler(likeButton, obj, userId);
    })

  }

  _disableDeleteCardButton(userId, cardOwnerId, button) {
    if (userId != cardOwnerId) {
      button.classList.add('elements__close-button_disabled');
    }
  }

  generateCard(userId) {
    this._element = this._getElement();

    const cardOwnerId = this._data.owner._id;
    const cardDeleteButton = this._element.querySelector('.elements__close-button');
    const cardLikeButton = this._element.querySelector('.elements__like-button');
    const cardLikeCounter = this._element.querySelector('.elements__like-counter');

    this._element.querySelector('.elements__image').src = this._data.link;
    this._element.querySelector('.elements__image').alt = this._data.name;
    this._element.querySelector('.elements__title').textContent = this._data.name;

    // Удаляем кнопку удаления карточки у чужих карточек
    this._disableDeleteCardButton(userId, cardOwnerId, cardDeleteButton);

    // Закрашиваем свои лайки
    if (this._data.likes.some(item => {
      return item._id == userId;
    })) {
      cardLikeButton.classList.add('elements__like-button_active');
    }

    // Устанавливаем количество лайков
    cardLikeCounter.textContent = this._data.likes.length;

    // Навешиваем слушатели
    this._setEventListeners(cardLikeButton, this._data, userId);

    return this._element;
  }
}
