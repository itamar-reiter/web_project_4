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

  setInputValues(inputData) {
    inputData.forEach((element, i) => {
      this.formInputs[i].value = element;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", this._submitHandler);
  }
  _submitHandler = (evt) => {
    evt.preventDefault();
    this._handleSubmitEvent(this._getInputValue());
  };

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
