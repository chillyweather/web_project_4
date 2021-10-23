class Card {
  constructor(
    data,
    elementSelector,
    handleCardClick,
    handleDeleteCard,
    userId,
    handleLikeIcon
  ) {
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;

    this._handleDeleteCard = handleDeleteCard;
    this._elementSelector = elementSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeIcon = handleLikeIcon;
  }

  _setEventListeners() {
    this._likesCounter = this._element.querySelector('.element__like-counter');
    this._element
      .querySelector('.element__like-button')
      .addEventListener('click', () => {
        this._handleLikeIcon(this._id);
      });

    this._element
      .querySelector('.element__trash-button')
      .addEventListener('click', () => {
        this._handleDeleteCard(this._id);
      });

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._handleCardClick();
      });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._elementSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  _isLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }

  getId() {
    return this._id;
  }

  // updateLikes(likesLength) {
  //   const likesCounter = this._element.querySelector('.element__like-counter');
  //   const likeIcon = this._element.querySelector('.element__like-button');
  //   likesCounter.textContent = likesLength;
  //   likeIcon.classList.remove('element__like-button_state_active');
  // }

  getView() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent =
      this._likes.length;

    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__trash-button').style.display =
        'none';
    }

    if (this._isLiked()) {
      this._element
        .querySelector('.element__like-button')
        .classList.toggle('element__like-button_state_active');
    }
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
