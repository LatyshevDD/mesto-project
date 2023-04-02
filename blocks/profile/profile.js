//  Open popup edit profile
function openPopupEditProfile() {
  profileEditPopup.classList.add('popup_opened');
}

profileEditButtonOpen.addEventListener('click', openPopupEditProfile);

// Close popup edit profile
function closePopupEditProfile() {
  profileEditPopup.classList.remove('popup_opened');
}

profileEditButtonClose.addEventListener('click', closePopupEditProfile);

// Open popup create new card
function openPopupCreateCard() {
  cardsAddCardPopup.classList.add('popup_opened');
}

profileAddButtonOpen.addEventListener('click', openPopupCreateCard);

// Close popup create new card
function closePopupCreateCard() {
  cardsAddCardPopup.classList.remove('popup_opened');
}

profileAddButtonClose.addEventListener('click', closePopupCreateCard);


// Edit-form
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopupEditProfile();
  }

formElement.addEventListener('submit', formSubmitHandler);




