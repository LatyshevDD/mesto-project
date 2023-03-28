// Card array
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
    const card = `
    <li class="elements__card">
      <img src="${cardLink}" alt="${cardName}" class="elements__image">
        <div class="elements__text">
          <h2 class="elements__title">${cardName}</h2>
          <button class="elements__like-button" type="button"></button>
        </div>
      </li>
    `;
    cardsContainer.insertAdjacentHTML('beforeend', card);
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
