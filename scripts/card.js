//#region TEMP duplicate of popup functionality / I see no other way for now...
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
const previewPopupCloseButton = popupPreview.querySelector('.popup__close-button_type_preview')

const handleOverlayClick = (e) => {
  // eslint-disable-next-line no-use-before-define
  isOverlayClicked(e, closePopup);
};

const handleEscUp = (e) => {
  // eslint-disable-next-line no-use-before-define
  isEscEvent(e, closePopup);
};

function openPopup(modalElement) {
  modalElement.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
  document.addEventListener('click', handleOverlayClick);
}

function closePopup(modalElement) {
  modalElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp);
  document.removeEventListener('click', handleOverlayClick);
}

// Set Escape handler
const isOverlayClicked = (e, action) => {
  const activePopup = document.querySelector('.popup_opened');

  if (e.target === activePopup) {
    action(activePopup);
  }
};
//#endregion

class Card {
  constructor(data, elementSelector) {
    this._name = data.name;
    this._link = data.link;

    this._elementSelector = elementSelector;
  }

  _setEventListeners() {
    //todo -- separate callbacks?
    this._element.querySelector('.element__like-button').addEventListener('click', (e) => this._toggleLikeButton(e.target));

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      const cardElement = this._element.querySelector('.element__trash-button').closest('.element');
      cardElement.remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      const popupImage = document.querySelector('.popup__image-preview');
      const popupImageCaption = document.querySelector('.popup__image-caption');
      popupImage.src = this._link;
      popupImage.alt = `Picture of ${this._name}`;
      popupImageCaption.textContent = this._name;
      openPopup(popupPreview);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._elementSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  _toggleLikeButton(button) {
    button.classList.toggle('element__like-button_state_active');
  }

  getView() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
