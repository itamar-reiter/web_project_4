import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._placeNameContainer = this.popup.querySelector(".popup__place-name");
    this._backgroundContainer = this.popup.querySelector(".popup__background");
  }
  open(title, link) {
    super.open();
    this._placeNameContainer.textContent = title;
    this._backgroundContainer.style.backgroundImage =
      `
    url(` +
      link +
      `)`;
  }
}
