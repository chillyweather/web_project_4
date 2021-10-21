import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import {
  settings,
  popupImage,
  popupImageCaption,
  popupSubmitButton,
  cardsContainer,
  profileEditButton,
  userProfilePicture,
  editProfilePictureButton,
  addElementButton,
  editForm,
  addCardForm,
  avatarForm,
  // likesCounter,
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
const addAvatarFormValidator = new FormValidator(settings, avatarForm);

const confirmModal = new PopupWithSubmit('.popup_type_confirm-delete');

//UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar',
});

let userId;

Promise.all([api.getCardList(), api.getUserInfo()]).then(
  ([cardData, userData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userProfilePicture.style.backgroundImage = `url(${userData.avatar})`;

    let likesCount;
    userId = userData._id;

    function createCard(data, templateElement) {
      const newCard = new Card(
        data,
        templateElement,
        () => {
          newPopupWithImage.open(data);
        },
        //handle delete
        (id) => {
          confirmModal.open();

          confirmModal.setAction(() => {
            api.deleteCard(id);
            newCard.remove();
            confirmModal.close();
          });
        },
        userId,
        //handle likes
        (cardId) => {
          const likesCounter = newCard.querySelector('.element__like-counter');

          if (data.likes.some((item) => item._id === userId)) {
            api.dislikeCard(cardId);
          } else {
            api.likeCard(cardId);
          }

          newCard
            .querySelector('.element__like-button')
            .classList.toggle('element__like-button_state_active');
        }
      ).getView();

      return newCard;
    }
    //Edit profile button event listener
    profileEditButton.addEventListener('click', () => {
      const profileData = userInfo.getUserInfo();
      nameInput.value = profileData.userName;
      jobInput.value = profileData.userJob;
      editFormValidator.resetValidation();
      editProfileModal.open();
    });

    //Edit profile popup instance
    const editProfileModal = new PopupWithForm(
      '.popup_type_profile',
      (data) => {
        editProfileModal.setButtonText('Saving...');
        userInfo.setUserInfo(data.name, data.about);
        api
          .updateUserInfo(data.name, data.about)
          .then(() => {
            editProfileModal.setButtonText('Save');
            editProfileModal.close();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );

    //Edit profile picture button listener
    editProfilePictureButton.addEventListener('click', (e) => {
      e.preventDefault();
      addAvatarFormValidator.resetValidation();
      editAvatarModal.open();
    });

    //Edit profile picture popup instance
    const editAvatarModal = new PopupWithForm(
      '.popup_type_profile-avatar',
      (avatarLink) => {
        editAvatarModal.setButtonText('Saving...');
        api
          .updateProfilePicture(avatarLink['avatar-link'])
          .then((res) => {
            userProfilePicture.style.backgroundImage = `url(${res.avatar})`;
          })
          .finally(() => {
            editAvatarModal.setButtonText('Save');
            editAvatarModal.close();
          });
      }
    );

    const cardList = new Section(
      {
        items: cardData,
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

    const addElementModal = new PopupWithForm(
      '.popup_type_add-element',
      (data) => {
        addElementModal.setButtonText('Saving...');
        api
          .addCard(data)
          .then((cardData) => {
            const newCard = createCard(cardData, '#element-template');
            cardList.addItem(newCard);
          })
          .finally(() => {
            addElementModal.setButtonText('Create');
            addElementModal.close();
          });
      }
    );
    //set event listeners
    addElementModal.setEventListeners();
    cardList.renderItems();
    editProfileModal.setEventListeners();
    editAvatarModal.setEventListeners();
  }
);

//Image popup instance
const newPopupWithImage = new PopupWithImage(
  '.popup_type_preview',
  popupImage,
  popupImageCaption
);

newPopupWithImage.setEventListeners();
confirmModal.setEventListeners();

editFormValidator.enableValidation();
addElementFormValidator.enableValidation();
addAvatarFormValidator.enableValidation();
