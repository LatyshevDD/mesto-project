// Popup open
function openPopup() {
  document.querySelector('.popup').classList.add('popup_opened');
}

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', openPopup);


// Popup close
function closePopup() {
  document.querySelector('.popup').classList.remove('popup_opened');
}

const profileCloseButton = document.querySelector('.popup__close-button');
profileCloseButton.addEventListener('click', closePopup);


// Edit-form
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelectorAll('.form__input-text')[0];
const jobInput = formElement.querySelectorAll('.form__input-text')[1];

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup();
  }

formElement.addEventListener('submit', formSubmitHandler);




