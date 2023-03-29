// Cards array
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];


  // Create cards section
  const cardsSection = document.querySelector('.elements');
  const cardsContainer = cardsSection.querySelector('.elements__cards');


  function createCard (obj) {
    const cardName = obj.name;
    const cardLink = obj.link;
    const cardTemplate = document.querySelector('.cardTemplate').content;
    const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
    card.querySelector('.elements__image').src = cardLink;
    card.querySelector('.elements__image').alt = cardName;
    card.querySelector('.elements__title').textContent = cardName;

    cardsContainer.append(card);
  }

  initialCards.forEach(createCard);


// Like Card
  function likeCard(evt) {
    const target = evt.target;

    if (target.classList.contains('elements__like-button')){
      target.classList.toggle('elements__like-button_active');
    }
  }

  cardsContainer.addEventListener('click', likeCard);

  // Close Card
  function closeCard(evt) {
    const target = evt.target;

    if (target.classList.contains('elements__close-button')){
      target.closest('.elements__card').remove();
    }
  }

  cardsContainer.addEventListener('click', closeCard);
