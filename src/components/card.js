import { openPopup, closePopup, popupCapture, createCapture, cardsAddCardPopup, addCardnameInput, addCardlinkInput, profileName, profileProfession } from "./modal.js";

import { clearInputsCardValues } from "./index.js";

export const cardsSection = document.querySelector('.elements');
export const cardsContainer = cardsSection.querySelector('.elements__cards');

import { getInitialCards, deleteCardFromServer, getUserInformation, postNewCard, likeCardToServer, disLikeCardFromServer } from "./api.js";

export function likeCardSubmitHandler(evt) {
  const target = evt.target;
  const card = target.closest('.elements__card');
  const cardId = card.dataset.cardId;
  getInitialCards()
    .then(data => {
      let cardObject = data.find(item => {
        return item._id == cardId;
      });
      let cardObjectLikes = cardObject.likes;
      getUserInformation()
        .then(userData => {
          if (!cardObjectLikes.some(item => {
            return item.name == userData.name && item.about == userData.about;
          })) {
            likeCardToServer(cardObject._id);
            target.classList.add('elements__like-button_active');
          } else {
            disLikeCardFromServer(cardObject._id);
            target.classList.remove('elements__like-button_active');
          }
        })
        .catch((err) => {
          console.log(err);
          })
    })
    .catch((err) => {
      console.log(err);
      });
}

export function deleteCard(evt) {
  const target = evt.target;
  const card = target.closest('.elements__card');
  deleteCardFromServer(card.dataset.cardId)
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
      cardImage.src = cardLink;
      cardImage.alt = cardName;
      card.dataset.cardId = cardId;
      card.querySelector('.elements__title').textContent = cardName;
      card.querySelector('.elements__like-button').addEventListener('click', likeCardSubmitHandler);
      cardDeleteButton.addEventListener('click', deleteCard);
      cardImage.addEventListener('click', function() {
        createCapture;
        openPopup(popupCapture);
      });
      disableDeleteCardButton(userId, cardOwnerId, cardDeleteButton);
      return card;
}

export function addNewCardSubmitHandler (evt) {
  evt.preventDefault();
  getUserInformation()
    .then(user => {
    return user._id;
    })
    .then(id => {
      postNewCard(addCardnameInput.value, addCardlinkInput.value)
      .then(res => {
        cardsContainer.prepend(createCard(res, id));
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
    console.log(err);
    })
    .finally(() => {
      clearInputsCardValues();
      closePopup(cardsAddCardPopup);
    })
}
