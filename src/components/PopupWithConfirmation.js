import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, executeConfirmation) {
    super(popupSelector);
    this._executeConfirmation = () => {
      executeConfirmation(this._card, this._cardData);
    };
    this._confirmButton = this.popup.querySelector(".popup__submit-button");
  }

  apllyCurrentCard(card, cardData) {
    this._card = card;
    this._cardData = cardData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this._executeConfirmation);
  }
}
