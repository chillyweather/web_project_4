/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
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

// TODO Popup and Escape listeners

// Set Escape handler
const isEscEvent = (e, action) => {
  const activePopup = document.querySelector('.popup_opened');

  if (e.key === 'Escape') {
    action(activePopup);
  }
};

const handleEscUp = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-use-before-define
  isEscEvent(e, closePopup);
};

// popup functions
function openPopup(modalElement) {
  modalElement.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
}

function closePopup(modalElement) {
  modalElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp);
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

// iterate through array and append card
initialCards.forEach((item) => elementsContainer.append(createCard(item)));

// submit form data //? replace with function?
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

// *form validation

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add('popup__submit-text_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__submit-text-error_type_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove('popup__submit-text_type_error');
//   errorElement.classList.remove('popup__submit-text-error_type_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add('popup__submit-button_type_inactive');
//     buttonElement.disabled = true;
//     // ? linter doesn't like it, but how else can i make button
//     // ? really disabled? not just look like...
//   } else {
//     buttonElement.classList.remove('popup__submit-button_type_inactive');
//     buttonElement.disabled = false;
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__submit-text'));

//   const buttonElement = formElement.querySelector('.popup__submit-button');

//   toggleButtonState(inputList, buttonElement);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__content'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (e) => {
//     });

//     setEventListeners(formElement);
//   });
// };

// enableValidation();

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
