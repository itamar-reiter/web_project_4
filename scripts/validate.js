/* check if singal input is valid */
/* activate the error notes toggeling functions */
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid){
    apllyErrorNotes(formElement, inputElement, inputElement.validationMessage, settings);
  }
  else {
    removeErrorNotes(formElement, inputElement, settings);
  }
}

/* check if there invalid input in chosen form */
/* true if there is invalid input */
const hasInvalidInput = (formInputs) => { 
  return formInputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

/* applying error message and input errorAlert */
const apllyErrorNotes = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.popup__error-message_type_${inputElement.id}`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = errorMessage;
}

/* removing error message and input errorAlert */
const removeErrorNotes = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.popup__error-message_type_${inputElement.id}`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
}

/* toggle submit button state; style and funcionality */
const toggleSubmitButton = (formInputs, submitButton, settings) => {
  if (hasInvalidInput(formInputs)){
    submitButton.classList.add(settings.inactiveButtonClass);
    submitButton.disabled = true;
  }
  else {
    submitButton.classList.remove(settings.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

/* add input event listeners and restart button state */
const adjustEventListeners = (formElement, settings) => {
  const formInputs = Array.from(formElement.querySelectorAll(settings.inputSelector)); /*make inputs array inside chosen formElement */
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  toggleSubmitButton(formInputs, submitButton, settings);
  formInputs.forEach((inputElement) => {  
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleSubmitButton(formInputs, submitButton, settings);
    });
  });
}

/* enables the chosen form validtion */
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  console.log(settings);
  formList.forEach(formElement => {
    formElement.addEventListener("submit", evt => {
      evt.preventDefault();
    });
    adjustEventListeners(formElement, settings);
  })
}
  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error-message_active"
  }); 
