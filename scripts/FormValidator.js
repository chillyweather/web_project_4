class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const { inputErrorClass, errorClass } = this.settings;

    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError = (inputElement) => {
    const { inputErrorClass, errorClass } = this.settings;

    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput = () => this._inputList.some((inputElement) => !inputElement.validity.valid);


  _toggleButtonState = () => {
    const { inactiveButtonClass } = this.settings;
    const buttonElement = this._formElement.querySelector(submitButtonSelector);

    if (this._hasInvalidInput()) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    const { inputSelector } = this._settings;

    this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));


    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this._setEventListeners(formElement);

  }
}

export default FormValidator;

// const settings = {
//   // formSelector: '.popup__content',
//   inputSelector: '.popup__submit-text',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_type_inactive',
//   inputErrorClass: 'popup__submit-text_type_error',
//   errorClass: 'popup__submit-text-error_type_active',
// };

// const editForm = document.querySelector('.popup__content');
// const addCardForm = document.querySelector('.popup__content');

// const editFormValidator = new FormValidator(settings, formElement);
// const addElementFormValidator = new FormValidator(settings, formElement);