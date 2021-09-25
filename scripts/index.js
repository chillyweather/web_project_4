
import Card from './Card.js';
import { openPopup, closePopup, popupPreview } from './Card.js';
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

// load info for specific forms
function openEditProfileForm(modalElement) {
  openPopup(modalElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  editFormValidator.resetValidation(formEditProfile);
}

function openAddElementForm(modalElement) {
  openPopup(modalElement);
  formAddElement.reset();
  addElementFormValidator.resetValidation(formAddElement);
}

// *Initial cards creation

function createCard(data, templateElement) {
  const newCard = new Card(data, templateElement).getView();
  return newCard;
}

initialCards.forEach((item) => {
  elementsContainer.append(createCard(item, '#element-template'));
})

function submitProfileData(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function submitElementData(e) {
  e.preventDefault();
  elementsContainer.prepend(createCard({ name: cardNameInput.value, link: cardLinkInput.value }, '#element-template'));
  closePopup(popupAddElement);
}

// *event listeners

// edit profile
profileEditButton.addEventListener('click', () => openEditProfileForm(popupEditProfile));
// add element card
addElementButton.addEventListener('click', () => openAddElementForm(popupAddElement));

// submit forms
formEditProfile.addEventListener('submit', submitProfileData);
formAddElement.addEventListener('submit', submitElementData);

// close popups
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddElementCloseButton.addEventListener('click', () => closePopup(popupAddElement));
previewPopupCloseButton.addEventListener('click', () => closePopup(popupPreview));
