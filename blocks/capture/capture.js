// Open capture

function openCapture(evt) {
  const target = evt.target;
  const image = capture.querySelector('.capture__image');
  const title = capture.querySelector('.capture__title');
  if (target.classList.contains('elements__image')){
    image.src = target.src;
    image.alt = target.alt;
    title.textContent = target.alt;
    popupCapture.classList.add('popup_opened');
  }
}

cardsContainer.addEventListener('click', openCapture);


// Close capture
function closeCapture(){
  popupCapture.classList.remove('popup_opened');
}

CaptureCloseButton.addEventListener('click', closeCapture);
