class Card {
  constructor(data, elementSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;

    this._elementSelector = elementSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', (e) => this._toggleLikeButton(e.target));

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
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

  getId() {
    return this._id;
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
