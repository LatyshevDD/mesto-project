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
const cardsAddCardPopup = cardsSection.querySelectorAll('.popup')[1];

// Profile
const profileSection = document.querySelector('.profile');
const profileEditButtonOpen = profileSection.querySelector('.profile__edit-button');
const profileEditPopup = profileSection.querySelector('.popup');
const profileEditButtonClose = profileEditPopup.querySelector('.popup__close-button');
const profileAddButtonOpen = profileSection.querySelector('.profile__add-button');
const profileAddButtonClose = cardsAddCardPopup.querySelector('.popup__close-button');


// Edit form
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelectorAll('.form__input-text')[0];
const jobInput = formElement.querySelectorAll('.form__input-text')[1];

const profileName = profileSection.querySelector('.profile__name');
const profileProfession = profileSection.querySelector('.profile__profession');

// Capture
const popupCapture = document.querySelector('.popup_capture');
const capture = popupCapture.querySelector('.capture');
const CaptureCloseButton = popupCapture.querySelector('.popup__close-button');

// Add card form
const addCardForm = cardsAddCardPopup.querySelector('.form');
const addCardnameInput = addCardForm.querySelectorAll('.form__input-text')[0];
const addCardlinkInput = addCardForm.querySelectorAll('.form__input-text')[1];






