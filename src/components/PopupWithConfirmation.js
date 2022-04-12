import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, executeConfirmation) {
    super(popupSelector);
    this._executeConfirmation = executeConfirmation;
    this._confirmButton = this.popup.querySelector(".popup__submit-button");
  }

  setEventListeners(card, cardData) {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._executeConfirmation(card, cardData);
    });
  }
}
