class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const { inputErrorClass, errorClass } = this._settings;

    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError = (inputElement) => {
    const { inputErrorClass, errorClass } = this._settings;

    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput = () =>
    this._inputList.some((inputElement) => !inputElement.validity.valid);

  _toggleButtonState = () => {
    const { inactiveButtonClass } = this._settings;

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.disabled = false;
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
    const { inputSelector, submitButtonSelector } = this._settings;

    this._buttonElement = this._formElement.querySelector(submitButtonSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}

export default FormValidator;
