import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupImageCaption) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupImageCaption = popupImageCaption;
  }
  open({ link, name }) {
    this._popupImageCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = `Picture of ${name}`;
    super.open();
  }

}