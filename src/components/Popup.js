export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._submitButton = this._popupElement.querySelector(
      '.popup__submit-button'
    );
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClick);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClick);
  }

  _handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      this.close();
    }
  };

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  setButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    this._popupElement
      .querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.close();
      });
  }
}
