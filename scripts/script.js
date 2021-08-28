// initial element cards
const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
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
const popupEditProfileCloseButton = document.querySelector('.popup__close-button_type_profile');
const popupAddElementCloseButton = document.querySelector('.popup__close-button_type_add-element');

// form inputs
const nameInput = document.querySelector('.popup__submit-text_content_name');
const jobInput = document.querySelector('.popup__submit-text_content_about');

// text in profile
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const form = document.querySelector('.popup__content');

// popup functions

function openEditProfilePopup() {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
}

function submitData(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup();
}

/// /////////////////////
// Initial cards creation
/// /////////////////////

const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements__container');

// create card
function createCard(name, link) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__image').src = link;
  return newElement;
}
// iterate through array and append card
initialCards.forEach((item) => elementsContainer.append(createCard(item.name, item.link)));

/// ///////////////
// event listeners
/// ///////////////

// edit profile
profileEditButton.addEventListener('click', openEditProfilePopup);
// add element card
// addElementButton.addEventListener('click', openPopup);

form.addEventListener('submit', submitData);
popupEditProfileCloseButton.addEventListener('click', closePopup);
