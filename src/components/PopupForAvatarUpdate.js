import Popup from './Popup.js';

class PopupForAvatarUpdate extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector('.popup__content');
    this._input = this._form.querySelector('.popup__submit-text');
  }

  setEventListeners = () => {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitHandler(this._input.value);
      // this.close();
    });
    super.setEventListeners();
  };
}

export default PopupForAvatarUpdate;
