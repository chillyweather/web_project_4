import Popup from './Popup.js';
import { popupImage, popupImageCaption } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  open({ link, name }) {
    popupImageCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = `Picture of ${name}`;
    super.open();
    this.setEventListeners();
  }

}