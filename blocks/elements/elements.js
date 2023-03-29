// Cards array
const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/cards/card-image_karaychaevsk.jpg'
  },
  {
    name: 'Гора эльбрус',
    link: './images/cards/card-image_elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/cards/card-image_donbai.jpg'
  },
  {
    name: 'Гора эльбрус',
    link: './images/cards/card-image_elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/cards/card-image_donbai.jpg'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/cards/card-image_karaychaevsk.jpg'
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
