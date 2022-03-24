import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitEvent) {
    super(popupSelector);
    this._handleSubmitEvent = handleSubmitEvent;
    this.formInputs = Array.from(this.popup.querySelectorAll(".popup__input"));
    this._form = this.popup.querySelector(".popup__form");
  }
  _getInputValue() {
    const inputData = {};
    this.formInputs.forEach((inputElement) => {
      inputData[inputElement.id] = inputElement.value;
    });
    return inputData;
  }
  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", this._submitHandler);
  }
  _submitHandler = (evt) => {
    evt.preventDefault();
    this._handleSubmitEvent();
  };

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
