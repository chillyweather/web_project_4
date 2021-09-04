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

function openPopup(modalElement) {
  modalElement.classList.add('popup_opened');
}

function closePopup(modalElement) {
  modalElement.classList.remove('popup_opened');
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

/// /////////////////////
// Initial cards creation
/// /////////////////////

const popupImage = document.querySelector('.popup__image-preview');
const popupImageCaption = document.querySelector('.popup__image-caption');

// create card
function createCard(card) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = newElement.querySelector('.element__image');

  newElement.querySelector('.element__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `Picture of ${card.name}`;

  const cardLikeButton = newElement.querySelector('.element__like-button');
  const cardDeleteButton = newElement.querySelector('.element__trash-button');

  cardLikeButton.addEventListener('click', (e) => toggleLikeButton(e.target));

  cardDeleteButton.addEventListener('click', () => {
    const cardElement = cardDeleteButton.closest('.element');
    cardElement.remove();
    // cardElement = null;
  });

  cardImage.addEventListener('click', () => {
    popupImage.src = card.link;
    popupImage.alt = `Picture of ${card.name}`;
    popupImageCaption.textContent = card.name;
    openPopup(popupPreview);
  });

  return newElement;
}

// submit form data
function submitProfileData(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function submitElementData(e) {
  e.preventDefault();
  const newCard = {};
  newCard.name = cardNameInput.value;
  newCard.link = cardLinkInput.value;
  elementsContainer.prepend(createCard(newCard));
  closePopup(popupAddElement);
}

// iterate through array and append card
initialCards.forEach((item) => elementsContainer.append(createCard(item)));

/// ///////////////
// event listeners
/// ///////////////

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
