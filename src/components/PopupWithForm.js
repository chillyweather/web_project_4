import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popupElement.querySelector('.popup__content');
    this.inputs = [...this._form.querySelectorAll('.popup__submit-text')];
  }

  _getInputValues = () => {
    const inputValues = {};
    this.inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    })
    console.log(inputValues);
    return inputValues;
  };

  setEventListeners = () => {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this._submitHandler(this._getInputValues());
      this.close();
    });
  };

  close = () => {
    this._form.reset();
    super.close();
  };

}
