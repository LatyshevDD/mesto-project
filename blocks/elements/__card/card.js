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
