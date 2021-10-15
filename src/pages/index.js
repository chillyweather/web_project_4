import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import {
  settings,
  popupImage,
  popupImageCaption,
  cardsContainer,
  profileEditButton,
  addElementButton,
  editForm,
  addCardForm,
  nameInput,
  jobInput,
} from '../utils/constants.js';

//Api
const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12/',
  authToken: 'a0741150-1ecd-4e0a-82be-ba6cc5789e2b',
});
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

// api.removeCard('616862053c2ad300126e5014').then(res => console.log(res));

//UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__about',
});

api.getUserInfo().then(userData => {
  userInfo.setUserInfo(userData.name, userData.about)


  //Edit profile button event listener
  profileEditButton.addEventListener('click', () => {
    const profileData = userInfo.getUserInfo();
    nameInput.value = profileData.userName;
    jobInput.value = profileData.userJob;
    editFormValidator.resetValidation();
    editProfileModal.open();
  });

  //Edit profile popup instance
  const editProfileModal = new PopupWithForm('.popup_type_profile', (data) => {
    userInfo.setUserInfo(data.name, data.about);
    api.updateUserInfo(data.name, data.about);
  });

  editProfileModal.setEventListeners();
});


//Add card to page
api.getCardList().then((data) => {
  const cardList = new Section(
    {
      items: data,
      renderer: (item) => {
        const cardElement = createCard(item, '#element-template');
        cardList.addItem(cardElement);
      },
    },
    cardsContainer
  );

  addElementButton.addEventListener('click', () => {
    addElementFormValidator.resetValidation();
    addElementModal.open();
  });

  const addElementModal = new PopupWithForm('.popup_type_add-element', (data) => {
    api.addCard(data).then(cardData => {
      const newCard = createCard(cardData, '#element-template');
      cardList.addItem(newCard);
    });
  });

  addElementModal.setEventListeners();

  cardList.renderItems();

});

//Image popup instance
const newPopupWithImage = new PopupWithImage(
  '.popup_type_preview',
  popupImage,
  popupImageCaption
);


//Add element popup instance



//Add element button event listener


//Event listeners for external classes


newPopupWithImage.setEventListeners();

editFormValidator.enableValidation();
addElementFormValidator.enableValidation();

// cardList.renderItems();
