//form config
export const settings = {
  inputSelector: '.popup__submit-text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_inactive',
  inputErrorClass: 'popup__submit-text_type_error',
  errorClass: 'popup__submit-text-error_type_active',
};

//form elements
export const editForm = document.querySelector(
  '.popup__content_type_edit-profile'
);
export const addCardForm = document.querySelector(
  '.popup__content_type_add-element'
);
export const avatarForm = document.querySelector(
  '.popup__content_type_profile-avatar'
);

//default profile data
export const nameInput = document.querySelector(
  '.popup__submit-text_content_name'
);
export const jobInput = document.querySelector(
  '.popup__submit-text_content_about'
);

//initial cards container
export const cardsContainer = '.elements__container';

//image popup picture and caption
export const popupPreview = document.querySelector('.popup_type_preview');
export const popupImage = document.querySelector('.popup__image-preview');
export const popupImageCaption = document.querySelector(
  '.popup__image-caption'
);

//popup submit button
export const popupSubmitButton = document.querySelector(
  '.popup__submit-button'
);

// open popup buttons
export const profileEditButton = document.querySelector(
  '.profile__edit-button'
);
export const addElementButton = document.querySelector('.profile__add-button');
export const editProfilePictureButton = document.querySelector(
  '.profile__avatar-edit-button'
);
export const userProfilePicture = document.querySelector('.profile__avatar');

export const deleteButton = document.querySelector('.element__trash-button');
// export const likesCounter = document.querySelector('.element__like-counter');
