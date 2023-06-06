export default class Card {
  constructor({ data, handleCardClick, likeApiRequest, dislikeApiRequest, deleteCardApiRequest, getCardInformApiRequest, userId }, cardTeamplateSelector) {
    this._data = data;
    this._cardTeamplateSelector = cardTeamplateSelector;
    this._handleCardClick = handleCardClick;
    this._likeApiRequest = likeApiRequest;
    this._dislikeApiRequest = dislikeApiRequest;
    this._deleteCardApiRequest = deleteCardApiRequest;
    this._getCardInformApiRequest = getCardInformApiRequest;
    this._userId = userId;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardTeamplateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  _likeCardSubmitHandler() {
    this._getCardInformApiRequest()
      .then(cardsInformation => {
        this._cardObject = cardsInformation.find(card => {
          return card._id == this._data._id;
        });
        this._cardObjectLikes = this._cardObject.likes;

        //Закрашиваем лайк и отправляем на сервер
        if (!this._cardObjectLikes.some(item => {
          return item._id == this._userId;
        })) {
          this._likeApiRequest(this._cardObject._id)
            .then((cardInfo) => {
              this._cardLikeButton.classList.add('elements__like-button_active');
              this._cardLikeCounter.textContent = cardInfo.likes.length;
            })
            .catch((err) => {
              console.log(err);
            });

        } else {
          this._dislikeApiRequest(this._cardObject._id)
            .then((cardInfo) => {
              this._cardLikeButton.classList.remove('elements__like-button_active');
              this._cardLikeCounter.textContent = cardInfo.likes.length;
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

  _deleteCard() {
    this._deleteCardApiRequest(this._data._id)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._likeCardSubmitHandler();
    })

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data.name, this._data.link);
    })

    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    })

  }

  _disableDeleteCardButton() {
    if (this._userId != this._cardOwnerId) {
      this._cardDeleteButton.classList.add('elements__close-button_disabled');
    }
  }

  generateCard() {
    this._element = this._getElement();
    this._cardLikeButton = this._element.querySelector('.elements__like-button');
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardDeleteButton = this._element.querySelector('.elements__close-button');
    this._cardOwnerId = this._data.owner._id;
    this._cardLikeCounter = this._element.querySelector('.elements__like-counter');

    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._element.querySelector('.elements__title').textContent = this._data.name;

    // Удаляем кнопку удаления карточки у чужих карточек
    this._disableDeleteCardButton();

    // Закрашиваем свои лайки
    if (this._data.likes.some(item => {
      return item._id == this._userId;
    })) {
      this._cardLikeButton.classList.add('elements__like-button_active');
    }

    // Устанавливаем количество лайков
    this._cardLikeCounter.textContent = this._data.likes.length;

    // Навешиваем слушатели
    this._setEventListeners();

    return this._element;
  }

}
