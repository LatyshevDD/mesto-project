import { openPopup, closePopup, popupCapture, createCapture, cardsAddCardPopup, addCardnameInput, addCardlinkInput,cardsAddSubmitButton, profileName, profileProfession, setLoadingToSubmitButton, captureImage, captureTitle } from "./modal.js";

import { clearInputsCardValues } from "./index.js";

export const cardsSection = document.querySelector('.elements');
export const cardsContainer = cardsSection.querySelector('.elements__cards');

import { getInitialCards, deleteCardFromServer, getUserInformation, postNewCard, likeCardToServer, disLikeCardFromServer, getResponseData } from "./api.js";

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
  if(userId != cardOwnerId) {
    button.classList.add('elements__close-button_disabled');
  }
}

export function createCard (obj, userId) {
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
      card.querySelector('.elements__like-button').addEventListener('click', () => {likeCardSubmitHandler(cardLikeButton, obj, userId)});
      cardDeleteButton.addEventListener('click', () => {deleteCard(card, cardId)});
      cardImage.addEventListener('click', createCapture);
      cardImage.addEventListener('click', () => {openPopup(popupCapture)});
      disableDeleteCardButton(userId, cardOwnerId, cardDeleteButton);
  // Закрашиваем свои лайки
      if (obj.likes.some(item => {
        return item._id ==  userId;
      })) {
        cardLikeButton.classList.add('elements__like-button_active');
      }
 // Устанавливаем количество лайков
      cardLikeCounter.textContent = obj.likes.length;
      return card;
}

export function addNewCardSubmitHandler (evt) {
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
