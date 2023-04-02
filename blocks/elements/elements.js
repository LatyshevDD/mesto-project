// Create cards section
  function createCard (obj) {
    const cardName = obj.name;
    const cardLink = obj.link;
    const cardTemplate = document.querySelector('.cardTemplate').content;
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    card.querySelector('.elements__image').src = cardLink;
    card.querySelector('.elements__image').alt = cardName;
    card.querySelector('.elements__title').textContent = cardName;

    cardsContainer.prepend(card);
  }

  initialCards.forEach(createCard);

  // addNewCard
  class NewCardObject {
    constructor(name, link) {
      this.name = name;
      this.link = link;
    }
  }

  function addNewCard() {
    const name = addCardnameInput.value;
    const link = addCardlinkInput.value;
    const cardObject = new NewCardObject (name, link);
    initialCards.push(cardObject);
    createCard (cardObject);
  }

  function addNewCardSubmitHandler (evt) {
    evt.preventDefault();
    addNewCard();
    closePopupCreateCard();
  }

  cardsAddCardPopup.addEventListener('submit', addNewCardSubmitHandler);

