import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, executeConfirmation) {
    super(popupSelector);
    this._executeConfirmation = executeConfirmation;
  }

  setEventListeners(card) {
    super.setEventListeners();
    this.popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._executeConfirmation(card);
    });
  }
}
