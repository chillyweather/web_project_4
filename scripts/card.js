//#region popup functionality (probably temporary)

//I guess, i'm doing something wrong, but when I move all these functions
// to index.js I always get an error "cannot access Card before initialization"
// on createCard function.
// and I don't know how to initialize class before functions...

export const popupPreview = document.querySelector('.popup_type_preview');

const popupImage = document.querySelector('.popup__image-preview');
const popupImageCaption = document.querySelector('.popup__image-caption');

const handleOverlayClick = (e) => {
  // eslint-disable-next-line no-use-before-define
  isOverlayClicked(e, closePopup);
};

const handleEscUp = (e) => {
  // eslint-disable-next-line no-use-before-define
  isEscEvent(e, closePopup);
};

// Set Escape handler
export const isEscEvent = (e, action) => {
  if (e.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    action(activePopup);
  }
};

export function openPopup(modalElement) {
  modalElement.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp);
  document.addEventListener('click', handleOverlayClick);
}

export function closePopup(modalElement) {
  modalElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp);
  document.removeEventListener('click', handleOverlayClick);
}

export const isOverlayClicked = (e, action) => {
  if (e.target.classList.contains('popup_opened')) {
    action(e.target);
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
    this._element.querySelector('.element__like-button').addEventListener('click', (e) => this._toggleLikeButton(e.target));

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
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
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
