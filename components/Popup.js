export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClick);
  }

  closePopup() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClick);
  }

  _handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      this.closePopup(e.target);
    }
  };

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.closePopup(e);
    }
  };

  setEventListeners = () => {
    this._popupElement.querySelector('.popup__close-button').addEventListener(
      'click', () => {
        this.closePopup();
      }
    )
  }

}