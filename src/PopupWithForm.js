import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitEvent) {
    super(popupSelector);
    this._handleSubmitEvent = handleSubmitEvent;
    this.formInputs = Array.from(
      this._popup.querySelectorAll(".popup__input")
      );
      this._inputData = {};
      this._form = this._popup.querySelector(".popup__form");
  }
  _getInputValue() {
    this.formInputs.forEach((inputElement) => {
      this._inputData[inputElement.id] = inputElement.value;
      console.log(`_getInputValue - inputElement.value: ${inputElement.value} `);
    });
  }
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValue();
      this._handleSubmitEvent();
    });
  }

  open(){
    super.open();
  }

  close(){
    super.close();
    this._form.reset();
  }
}
