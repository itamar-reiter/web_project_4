class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
  }

  /* removing error message and input errorAlert */
  _removeErrorNotes = (formElement, inputElement) => {
    this._errorElement = formElement.querySelector(
      `.popup__error-message_type_${inputElement.id}`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
  };

  _apllyErrorNotes(formElement, inputElement, errorMessage) {
    this._errorElement = formElement.querySelector(
      `.popup__error-message_type_${inputElement.id}`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = errorMessage;
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._apllyErrorNotes(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._removeErrorNotes(formElement, inputElement);
    }
  }

  /* check if there invalid input in chosen form */
  /* true if there is invalid input */

  _hasInvalidInput(formInputs) {
    return formInputs.some((inputElement) => {
      console.log(!inputElement.validity.valid);
      return !inputElement.validity.valid;
    });
  }

  _toggleSubmitButton(formInputs, submitButton) {
    if (this._hasInvalidInput(formInputs)) {
      console.log("has invaild input");
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      console.log("no invalid input");
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _adjustEventListeners(formElement) {
    this._formInputs = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
    this._toggleSubmitButton(this._formInputs, this._submitButton);
    this._formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleSubmitButton(this._formInputs, this._submitButton);
      });
    });
  }

  enableValidation() {
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._adjustEventListeners(this._formElement);
  }
}

export default FormValidator;
