// Constants

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

// Profile
const profileSection = document.querySelector('.profile');
const profileEditButtonOpen = profileSection.querySelector('.profile__edit-button');
const profileEditButtonClose = document.querySelector('.popup__close-button');
const cardsAddCardPopup = cardsSection.querySelectorAll('.popup')[1];
const profileAddButtonOpen = profileSection.querySelector('.profile__add-button');
const profileAddButtonClose = cardsAddCardPopup.querySelector('.popup__close-button');


// Edit form
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelectorAll('.form__input-text')[0];
const jobInput = formElement.querySelectorAll('.form__input-text')[1];

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

// Open capture
const popupCapture = document.querySelector('.popup_capture');
const capture = popupCapture.querySelector('.capture');

// Close capture
const CaptureCloseButton = popupCapture.querySelector('.capture__close-button');

// Add card form
const addCardForm = cardsAddCardPopup.querySelector('.form');
const addCardnameInput = addCardForm.querySelectorAll('.form__input-text')[0];
const addCardlinkInput = addCardForm.querySelectorAll('.form__input-text')[1];






