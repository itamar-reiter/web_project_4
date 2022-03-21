import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitEvent) {
    super(popupSelector);
    this._handleSubmitEvent = handleSubmitEvent;
    this._formInputs = Array.from(
      this._popup.querySelectorAll(".popup__input")
      );
      this._inputData = {};
  }
  _getInputValue() {
    console.log("_getInputValue");
    this._formInputs.forEach((inputElement) => {
      this._inputData[inputElement.id] = inputElement.value;
    });
    console.log(this._inputData);
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
    this._popup.reset();
  }
}
