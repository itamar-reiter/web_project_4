class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    //this._handleFormSubmit = handleFormSubmit;
  }

  /* removing error message and input errorAlert */
  _removeErrorNotes = (inputElement) => {
    this._errorElement = this._formElement.querySelector(
      `.popup__error-message_type_${inputElement.id}`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
  };

  _apllyErrorNotes(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(
      `.popup__error-message_type_${inputElement.id}`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = errorMessage;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._apllyErrorNotes(inputElement, inputElement.validationMessage);
    } else {
      this._removeErrorNotes(inputElement);
    }
  }

  /* check if there invalid input in chosen form */
  /* true if there is invalid input */

  _hasInvalidInput() {
    return this._formInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _adjustEventListeners() {
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleSubmitButton();
    this._formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      //this._handleFormSubmit();
      this._toggleSubmitButton();
    });
    this._adjustEventListeners();
  }
}

export default FormValidator;
