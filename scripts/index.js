
import Card from './Card.js';
import Section from '../components/Section.js';
import {
  settings,
  initialCards,
  cardsContainer
} from '../utils/constants.js';

import { openPopup, closePopup, popupPreview } from './Card.js';
import FormValidator from './FormValidator.js';

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, '#element-template').getView();
    cardList.addItem(cardElement);
  }
}, cardsContainer);

//* ------------------------------------------------------------//
//! *Initial cards creation

function createCard(data, templateElement) {
  const newCard = new Card(data, templateElement).getView();
  return newCard;
}

// initialCards.forEach((item) => {
//   elementsContainer.append(createCard(item, '#element-template'));
// })
export const elementsContainer = document.querySelector('.elements__container');
//!

const editForm = document.querySelector('.popup__content_type_edit-profile');
const addCardForm = document.querySelector('.popup__content_type_add-element');

//form validation
const editFormValidator = new FormValidator(settings, editForm);
const addElementFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addElementFormValidator.enableValidation();

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


// load info for specific forms
function openEditProfileForm(modalElement) {
  openPopup(modalElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  editFormValidator.resetValidation();
}

function openAddElementForm(modalElement) {
  openPopup(modalElement);
  formAddElement.reset();
  addElementFormValidator.resetValidation();
}


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
//* --------------------------------------------------------//
cardList.renderItems()