//form config
export const settings = {
  inputSelector: '.popup__submit-text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_inactive',
  inputErrorClass: 'popup__submit-text_type_error',
  errorClass: 'popup__submit-text-error_type_active',
};

//initial card elements
export const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://images.unsplash.com/photo-1583207804784-198ba4353030?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
];

//form elements
export const editForm = document.querySelector('.popup__content_type_edit-profile');
export const addCardForm = document.querySelector('.popup__content_type_add-element');

//default profile data
export const nameInput = document.querySelector('.popup__submit-text_content_name');
export const jobInput = document.querySelector('.popup__submit-text_content_about');

//initial cards container
export const cardsContainer = '.elements__container';

//image popup picture and caption
export const popupPreview = document.querySelector('.popup_type_preview');
export const popupImage = document.querySelector('.popup__image-preview');
export const popupImageCaption = document.querySelector('.popup__image-caption');


// open popup buttons
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addElementButton = document.querySelector('.profile__add-button');


// text in profile
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');




// export const isEscEvent = (e, action) => {
//   if (e.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     action(activePopup);
//   }
// };