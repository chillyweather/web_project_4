import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector('.popup__content');
  }
  setAction(action) {
    this._submitHandler = action;
  }

  setEventListeners = () => {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitHandler();
      // this.close();
    });
  };
}

export default PopupWithSubmit;
