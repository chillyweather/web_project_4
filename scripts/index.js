
import Card from './card.js';
import FormValidator from './FormValidator.js';

//form config
const settings = {
  inputSelector: '.popup__submit-text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_inactive',
  inputErrorClass: 'popup__submit-text_type_error',
  errorClass: 'popup__submit-text-error_type_active',
};




const editForm = document.querySelector('.popup__content_type_edit-profile');
const addCardForm = document.querySelector('.popup__content_type_add-element');

const editFormValidator = new FormValidator(settings, editForm);
const addElementFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addElementFormValidator.enableValidation();



// initial element cards
const initialCards = [
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

// open popup buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const addElementButton = document.querySelector('.profile__add-button');

// popups
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupPreview = document.querySelector('.popup_type_preview');

// close popup buttons
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button_type_profile');
const popupAddElementCloseButton = popupAddElement.querySelector('.popup__close-button_type_add-element');
const previewPopupCloseButton = popupPreview.querySelector('.popup__close-button_type_preview');

// form inputs
const nameInput = document.querySelector('.popup__submit-text_content_name');
const jobInput = document.querySelector('.popup__submit-text_content_about');
const cardNameInput = document.querySelector('.popup__submit-text_content_place');
const cardLinkInput = document.querySelector('.popup__submit-text_content_link');

// text in profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

// forms
const formEditProfile = popupEditProfile.querySelector('.popup__content');
const formAddElement = popupAddElement.querySelector('.popup__content');

const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements__container');

// Set Escape handler
const isOverlayClicked = (e, action) => {
  const activePopup = document.querySelector('.popup_opened');

  if (e.target === activePopup) {
    action(activePopup);
  }
};

// Close by click on overlay
const handleOverlayClick = (e) => {
  // eslint-disable-next-line no-use-before-define
  isOverlayClicked(e, closePopup);
};

// Set Escape handler
const isEscEvent = (e, action) => {
  const activePopup = document.querySelector('.popup_opened');

  if (e.key === 'Escape') {
    action(activePopup);
  }
};

const handleEscUp = (e) => {
  // eslint-disable-next-line no-use-before-define
  isEscEvent(e, closePopup);
};

// popup functions
function openPopup(modalElement) {
  modalElement.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
  document.addEventListener('click', handleOverlayClick);
}

function closePopup(modalElement) {
  modalElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp);
  document.removeEventListener('click', handleOverlayClick);
}

// load info for specific forms
function openForm(modalElement) {
  openPopup(modalElement);
  if (modalElement === popupEditProfile) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
  } else {
    formAddElement.reset();
  }
}

function toggleLikeButton(button) {
  button.classList.toggle('element__like-button_state_active');
}
// *Initial cards creation

initialCards.forEach((item) => {
  const newCard = new Card(item, '#element-template');
  console.log(newCard.getView());
  elementsContainer.append(newCard.getView());
})

function submitProfileData(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function submitElementData(e) {
  e.preventDefault();
  const newCard = new Card({ name: cardNameInput.value, link: cardLinkInput.value }, '#element-template');
  elementsContainer.prepend(newCard.getView());
  closePopup(popupAddElement);
}

// *event listeners

// edit profile
profileEditButton.addEventListener('click', () => openForm(popupEditProfile));
// add element card
addElementButton.addEventListener('click', () => openForm(popupAddElement));

// submit forms
formEditProfile.addEventListener('submit', submitProfileData);
formAddElement.addEventListener('submit', submitElementData);

// close popups
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddElementCloseButton.addEventListener('click', () => closePopup(popupAddElement));
previewPopupCloseButton.addEventListener('click', () => closePopup(popupPreview));
