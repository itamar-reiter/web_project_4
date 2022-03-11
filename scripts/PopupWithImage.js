import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, placeName, background) {
    super(popupSelector);
    this._placeNameContainer = this._popup.querySelector(".popup__place-name");
    this._placeName = placeName;
    this._backgroundContainer = this._popup.querySelector(".popup__background");
    this._background =
      `
    url(` +
      background +
      `)`;
  }
  open() {
    super.open();
    this._addPopupContent();
  }

  _addPopupContent() {
    this._placeNameContainer.textContent = this._placeName;
    this._backgroundContainer = this._background;
  }

  close(){
    super.close();
  };

  setEventListeners(){
    super.setEventListeners();
  }
}
