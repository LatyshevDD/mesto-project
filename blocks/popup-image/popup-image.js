// Open capture
const cards = document.querySelector('.elements__cards');
const popupImage = document.querySelector('.popup-image');

function openPopupImage(evt) {
  const target = evt.target;
  const image = popupImage.querySelector('.popup-image__image');
  const title = popupImage.querySelector('.popup-image__title');
  if (target.classList.contains('elements__image')){
    image.src = target.src;
    image.alt = target.alt;
    title.textContent = target.alt;
    popupImage.classList.add('popup-image_opened');
  }
}

// Close capture
const popupImageCloseButton = popupImage.querySelector('.popup-image__close-button');

function closePopupImage(){
  popupImage.classList.remove('popup-image_opened');
}

cards.addEventListener('click', openPopupImage);
popupImageCloseButton.addEventListener('click', closePopupImage);


