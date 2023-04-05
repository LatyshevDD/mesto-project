// ----------- Constants --------------

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

// Cards section
const cardsSection = document.querySelector('.elements');
const cardsContainer = cardsSection.querySelector('.elements__cards');
const cardsAddCardPopup = cardsSection.querySelector('.popup_type_add-card');

// Profile section
const profileSection = document.querySelector('.profile');
const profileEditButtonOpen = profileSection.querySelector('.profile__edit-button');
const profileEditPopup = profileSection.querySelector('.popup_type_edit-profile');
const profileEditButtonClose = profileEditPopup.querySelector('.popup__close-button');
const profileAddButtonOpen = profileSection.querySelector('.profile__add-button');
const profileAddButtonClose = cardsAddCardPopup.querySelector('.popup__close-button');


// Edit form section
const formElement = profileEditPopup.querySelector('.form');
const nameInput = formElement.querySelector('.form__input-text_type_name');
const jobInput = formElement.querySelector('.form__input-text_type_profession');

const profileName = profileSection.querySelector('.profile__name');
const profileProfession = profileSection.querySelector('.profile__profession');

// Capture section
const popupCapture = document.querySelector('.popup_type_capture');
const capture = popupCapture.querySelector('.popup__capture');
const captureCloseButton = popupCapture.querySelector('.popup__close-button');
const captureImage = capture.querySelector('.popup__capture-image');
const captureTitle = capture.querySelector('.popup__capture-title');

// Add card form section
const addCardForm = cardsAddCardPopup.querySelector('.form');
const addCardnameInput = addCardForm.querySelector('.form__input-text_type_image-title');
const addCardlinkInput = addCardForm.querySelector('.form__input-text_type_image-link');


// --------- Open and close popups functions ----------

// Close popup function
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileEditButtonClose.addEventListener('click', () => {closePopup(profileEditPopup)});
profileAddButtonClose.addEventListener('click', () => {closePopup(cardsAddCardPopup)});
captureCloseButton.addEventListener('click', () => {closePopup(popupCapture)});


//Open popup function
function openPopup(popup) {
  popup.classList.add('popup_opened');
}



// ------------ Card functions --------------

// Like Card
function likeCard(evt) {
  const target = evt.target;
  target.classList.toggle('elements__like-button_active');
}

// Delete Card
  function deleteCard(evt) {
    const target = evt.target;
    target.closest('.elements__card').remove();
  }


  // ------------ Capture functions ---------------

// Open capture
function createCapture(evt) {
  const target = evt.target;
  if (target.classList.contains('elements__image')){
    captureImage.src = target.src;
    captureImage.alt = target.alt;
    captureTitle.textContent = target.alt;
  }
}

// ---------- Elements -------------

// Create cards section
function createCard (obj) {
  const cardName = obj.name;
  const cardLink = obj.link;
  const cardTemplate = document.querySelector('.cardTemplate').content;
  const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
  card.querySelector('.elements__image').src = cardLink;
  card.querySelector('.elements__image').alt = cardName;
  card.querySelector('.elements__title').textContent = cardName;
  card.querySelector('.elements__like-button').addEventListener('click', likeCard);
  card.querySelector('.elements__close-button').addEventListener('click', deleteCard);
  card.querySelector('.elements__image').addEventListener('click', createCapture);
  card.querySelector('.elements__image').addEventListener('click', () => {openPopup(popupCapture)});
  return card;
}

initialCards.forEach(function (item) {
  cardsContainer.prepend(createCard (item));
});


// Open popup create new card listener
profileAddButtonOpen.addEventListener('click', () => {
  addCardnameInput.value = '';
  addCardlinkInput.value = '';
  openPopup(cardsAddCardPopup);
});

// addNewCard
function addNewCard() {
  const name = addCardnameInput.value;
  const link = addCardlinkInput.value;
  const cardObject = {};
  cardObject.name = name;
  cardObject.link = link;
  cardsContainer.prepend(createCard(cardObject));
}

function clearInputsCardValues () {
  addCardnameInput.value = '';
  addCardlinkInput.value = '';
}

function addNewCardSubmitHandler (evt) {
  evt.preventDefault();
  addNewCard();
  clearInputsCardValues();
  closePopup(cardsAddCardPopup);
}

cardsAddCardPopup.addEventListener('submit', addNewCardSubmitHandler);


// ------------- Profile ----------------

//  Open popup edit profile listener
profileEditButtonOpen.addEventListener('click', () => {
  nameInput.value = 'Жак-Ив Кусто';
  jobInput.value = 'Исследователь океана';
  openPopup(profileEditPopup);
});


// Edit-form
function EditFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(profileEditPopup);
  }

formElement.addEventListener('submit', EditFormSubmitHandler);







