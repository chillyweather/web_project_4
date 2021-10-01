
import FormValidator from '../components/FormValidator.js';
import Card from './Card.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import {
  settings,
  initialCards,
  cardsContainer,
  profileName,
  profileAbout,
  profileEditButton,
  addElementButton,
  popupPreview
} from '../utils/constants.js';

// import { createCard } from './Card.js';

const editForm = document.querySelector('.popup__content_type_edit-profile');
const addCardForm = document.querySelector('.popup__content_type_add-element');

//form validation
const editFormValidator = new FormValidator(settings, editForm);
const addElementFormValidator = new FormValidator(settings, addCardForm);

//create card instance
function createCard(data, templateElement) {
  const newCard = new Card(data, templateElement).getView();
  newCard.querySelector('.element__image').addEventListener('click', () => {
    newPopupWithImage.open(data);
  });
  return newCard;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    console.log(item);
    const cardElement = createCard(item, '#element-template');
    cardList.addItem(cardElement);
  }
}, cardsContainer);

const newPopupWithImage = new PopupWithImage('.popup_type_preview')
//*------------------------------------------------------------


const editProfileModal = new PopupWithForm('.popup_type_profile', (data) => {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;

})

profileEditButton.addEventListener('click', () => {
  editProfileModal.open();
});
//* -----------------------------------------------------------

const addElementModal = new PopupWithForm('.popup_type_add-element', (data) => {
  const newCard = createCard(data, '#element-template');
  console.log(newCard);
  cardList.addItem(newCard);
})



addElementButton.addEventListener('click', () => addElementModal.open());
//* -----------------------------------------------------------

editProfileModal.setEventListeners();
addElementModal.setEventListeners();


//* ------------------------------------------------------------

export const elementsContainer = document.querySelector('.elements__container');



editFormValidator.enableValidation();
addElementFormValidator.enableValidation();



// popups
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddElement = document.querySelector('.popup_type_add-element');

// close popup buttons
// const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button_type_profile');
// const popupAddElementCloseButton = popupAddElement.querySelector('.popup__close-button_type_add-element');
// const previewPopupCloseButton = popupPreview.querySelector('.popup__close-button_type_preview');

// form inputs
const nameInput = document.querySelector('.popup__submit-text_content_name');
const jobInput = document.querySelector('.popup__submit-text_content_about');
const cardNameInput = document.querySelector('.popup__submit-text_content_place');
const cardLinkInput = document.querySelector('.popup__submit-text_content_link');



// forms
const formEditProfile = popupEditProfile.querySelector('.popup__content');
const formAddElement = popupAddElement.querySelector('.popup__content');

// const elementTemplate = document.querySelector('#element-template').content;


// load info for specific forms
// function openEditProfileForm(modalElement) {
//   openPopup(modalElement);
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileAbout.textContent;
//   editFormValidator.resetValidation();
// }

function openAddElementForm(modalElement) {
  openPopup(modalElement);
  formAddElement.reset();
  addElementFormValidator.resetValidation();
}


// function submitProfileData(e) {
//   e.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileAbout.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// }

function submitElementData(e) {
  e.preventDefault();
  elementsContainer.prepend(createCard({ name: cardNameInput.value, link: cardLinkInput.value }, '#element-template'));
  closePopup(popupAddElement);
}

// *event listeners

// profileEditButton.addEventListener('click', () => editProfileModal.open());
// profileEditButton.addEventListener('click', () => openEditProfileForm(popupEditProfile));
// add element card

// submit forms
// formEditProfile.addEventListener('submit', submitProfileData);
// formAddElement.addEventListener('submit', submitElementData);

// close popups
// popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
// popupAddElementCloseButton.addEventListener('click', () => closePopup(popupAddElement));


// previewPopupCloseButton.addEventListener('click', () => closePopup(popupPreview));
//* --------------------------------------------------------//
cardList.renderItems()