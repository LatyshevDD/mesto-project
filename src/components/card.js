import { openPopup, closePopup, popupCapture, createCapture, cardsAddCardPopup, addCardnameInput, addCardlinkInput } from "./modal.js";

import { addNewCard, clearInputsCardValues } from "./index.js";

export const cardsSection = document.querySelector('.elements');
export const cardsContainer = cardsSection.querySelector('.elements__cards');

import { getInitialCards, deleteCardFromServer } from "./api.js";

export function likeCard(evt) {
  const target = evt.target;
  target.classList.toggle('elements__like-button_active');
}

export function deleteCard(evt) {
  const target = evt.target;
  const card = target.closest('.elements__card');
  card.remove();
  deleteCardFromServer(card.dataset.cardId);
}


export function createCard (obj) {
  const cardName = obj.name;
  const cardLink = obj.link;
  const cardId = obj._id;
  const cardTemplate = document.querySelector('.cardTemplate').content;
  const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  card.dataset.cardId = cardId;
  card.querySelector('.elements__title').textContent = cardName;
  card.querySelector('.elements__like-button').addEventListener('click', likeCard);
  card.querySelector('.elements__close-button').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', function() {
    createCapture;
    openPopup(popupCapture);
  });
  return card;
}

export function addNewCardSubmitHandler (evt) {
  evt.preventDefault();
  addNewCard();
  clearInputsCardValues();
  closePopup(cardsAddCardPopup);
}
