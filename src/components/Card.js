export default class Card {
  constructor({ data, handleCardClick, likeApiRequest, dislikeApiRequest, deleteCardApiRequest, getCardInformApiRequest }, cardTeamplateSelector) {
    this._data = data;
    this._cardTeamplateSelector = cardTeamplateSelector;
    this._handleCardClick = handleCardClick;
    this._likeApiRequest = likeApiRequest;
    this._dislikeApiRequest = dislikeApiRequest;
    this._deleteCardApiRequest = deleteCardApiRequest;
    this._getCardInformApiRequest = getCardInformApiRequest;
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
    this._getCardInformApiRequest()
      .then(cardsInformation => {
        const cardObject= cardsInformation.find(card => {
          return card._id == obj._id;
        });
        const cardObjectLikes = cardObject.likes;

        //Закрашиваем лайк и отправляем на сервер
        if (!cardObjectLikes.some(item => {
         return item._id == userId;
        }))
          {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _deleteCard(cardObject) {
    this._deleteCardApiRequest(cardObject._id)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners(likeButton, image, deleteButton, obj, userId) {
    likeButton.addEventListener("click", () => {
      this._likeCardSubmitHandler(likeButton, obj, userId);
    })

    image.addEventListener("click", () => {
      this._handleCardClick(this._data.name, this._data.link);
    })

    deleteButton.addEventListener("click", () => {
      this._deleteCard(obj);
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
    const cardImage = this._element.querySelector('.elements__image');

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
    this._setEventListeners(cardLikeButton, cardImage, cardDeleteButton, this._data, userId);

    return this._element;
  }

}
