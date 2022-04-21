import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, executeSubmitEvent) {
    super(popupSelector);
    this._executeSubmitEvent = executeSubmitEvent;
    this.formInputs = Array.from(this.popup.querySelectorAll(".popup__input"));
    this._form = this.popup.querySelector(".popup__form");
    this._submitButton = this.popup.querySelector(".popup__submit-button")
  }
  
  _getInputValues() {
    const inputData = {};
    this.formInputs.forEach((inputElement) => {
      inputData[inputElement.name] = inputElement.value;
    });
    return inputData;
  }

  setInputValues(inputData) {
    this.formInputs.forEach((input) => {
      input.value = inputData[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", this._handleSubmit);
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._executeSubmitEvent(this._getInputValues());
  };

  apllySubmittingText = (isLoading, defaultText) => {
    if (isLoading) {
      this._submitButton.textContent =
        "Saving...";
    } else {
      this._submitButton.textContent =
        defaultText;
    }
  };

  close() {
    super.close();
    this._form.reset();
  }
}
