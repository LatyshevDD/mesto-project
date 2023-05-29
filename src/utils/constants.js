//Card
export const cardsSection = document.querySelector('.elements');
export const cardsContainer = cardsSection.querySelector('.elements__cards');

export const cardsContainerSelector = ".elements__cards";
export const cardTeamplateSelector = ".cardTemplate";

// Modals
export const profileSection = document.querySelector('.profile');
export const profileEditButtonOpen = profileSection.querySelector('.profile__edit-button');
export const profileEditPopup = profileSection.querySelector('.popup_type_edit-profile');
export const profileEditButtonClose = profileEditPopup.querySelector('.popup__close-button');

export const popupCapture = document.querySelector('.popup_type_capture');
export const capture = popupCapture.querySelector('.popup__capture');
export const captureImage = capture.querySelector('.popup__capture-image');
export const captureTitle = capture.querySelector('.popup__capture-title');

export const cardsAddCardPopup = cardsSection.querySelector('.popup_type_add-card');
export const cardsAddButtonOpen = profileSection.querySelector('.profile__add-button');
export const cardsAddButtonClose = cardsAddCardPopup.querySelector('.popup__close-button');

export const addCardForm = cardsAddCardPopup.querySelector('.form');
export const addCardnameInput = addCardForm.querySelector('.form__input-text_type_image-title');
export const addCardlinkInput = addCardForm.querySelector('.form__input-text_type_image-link');
export const cardsAddSubmitButton = addCardForm.querySelector('.form__input-submit');


export const profileEditForm = profileEditPopup.querySelector('.form');
export const nameInput = profileEditForm.querySelector('.form__input-text_type_name');
export const jobInput = profileEditForm.querySelector('.form__input-text_type_profession');
export const profileEditSubmitButton = profileEditPopup.querySelector('.form__input-submit');

export const profileName = profileSection.querySelector('.profile__name');
export const profileProfession = profileSection.querySelector('.profile__profession');
export const profileAvatarContainer = profileSection.querySelector('.profile__avatar-container');
export const profileAvatar = profileSection.querySelector('.profile__avatar');

export const captureCloseButton = popupCapture.querySelector('.popup__close-button');

export const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
export const editAvatarForm = editAvatarPopup.querySelector('.form');
export const editAvatarSubmitButton = editAvatarPopup.querySelector('.form__input-submit');
export const editAvatarLinkImput = editAvatarPopup.querySelector('.form__input-text_type_image-link');
