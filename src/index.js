import "./pages/index.css";

import FormValidator from './components/FormValidator.js';
import UserInfo from './components/UserInfo.js';
import Card from './components/Card.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import {
  settings,
  initialCards,
  cardsContainer,
  profileName,
  profileAbout,
  profileEditButton,
  addElementButton,
  editForm,
  addCardForm,
  nameInput,
  jobInput,
} from './utils/constants.js';

//form validation
const editFormValidator = new FormValidator(settings, editForm);
const addElementFormValidator = new FormValidator(settings, addCardForm);

//create card instance
function createCard(data, templateElement) {
  const newCard = new Card(data, templateElement, () => {
    newPopupWithImage.open(data);
  }).getView();
  return newCard;
}

//UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__about',
});

//Add card to page
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, '#element-template');
      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);

//Image popup instance
const newPopupWithImage = new PopupWithImage('.popup_type_preview');
//Edit profile popup instance
const editProfileModal = new PopupWithForm('.popup_type_profile', (data) => {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
});
//Add element popup instance
const addElementModal = new PopupWithForm('.popup_type_add-element', (data) => {
  const newCard = createCard(data, '#element-template');
  cardList.addItem(newCard);
});

//Edit profile button event listener
profileEditButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.userName;
  jobInput.value = profileData.userJob;
  editProfileModal.open();
});
//Add element button event listener
addElementButton.addEventListener('click', () => addElementModal.open());

//Event listeners for external classes
editProfileModal.setEventListeners();
addElementModal.setEventListeners();
newPopupWithImage.setEventListeners();

editFormValidator.enableValidation();
addElementFormValidator.enableValidation();

cardList.renderItems();
