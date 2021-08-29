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

// popup functions

function openPopup(modalName) {
  formAddElement.reset();
  modalName.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

function togglePopup(modalName) {
  modalName.classList.toggle('popup_opened');
}

function submitProfileData(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  togglePopup(popupEditProfile);
}

/// /////////////////////
// Initial cards creation
/// /////////////////////

const popupImage = document.querySelector('.popup__image-preview');
const popupImageCaption = document.querySelector('.popup__image-caption')
// create card
function createCard(name, link) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__image').src = link;

  const cardLikeButton = newElement.querySelector('.element__like-button');
  const cardDeleteButton = newElement.querySelector('.element__trash-button');
  const cardImage = newElement.querySelector('.element__image');

  cardLikeButton.addEventListener('click', (e) => {
    const like = e.target;
    like.classList.toggle('element__like-button_state_active');
  });

  cardDeleteButton.addEventListener('click', () => {
    const card = cardDeleteButton.closest('.element');
    card.remove();
  });

  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImageCaption.textContent = name;
    togglePopup(popupPreview);
  });

  return newElement;
}

function submitElementData(e) {
  e.preventDefault();
  elementsContainer.append(createCard(cardNameInput.value, cardLinkInput.value));
  togglePopup(popupAddElement);
}
// iterate through array and append card
initialCards.forEach((item) => elementsContainer.append(createCard(item.name, item.link)));

/// ///////////////
// event listeners
/// ///////////////

// edit profile
profileEditButton.addEventListener('click', () => openPopup(popupEditProfile));
// add element card
addElementButton.addEventListener('click', () => openPopup(popupAddElement));

// image preview card
// addElementButton.addEventListener('click', () => openPopup(popupAddElement));

// submit forms
formEditProfile.addEventListener('submit', submitProfileData);
formAddElement.addEventListener('submit', submitElementData);

// close popups
popupEditProfileCloseButton.addEventListener('click', () => togglePopup(popupEditProfile));
popupAddElementCloseButton.addEventListener('click', () => togglePopup(popupAddElement));

previewPopupCloseButton.addEventListener('click', () => togglePopup(popupPreview));
