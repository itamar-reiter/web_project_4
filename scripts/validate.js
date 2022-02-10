/* check if singal input is valid */
/* activate the error notes toggeling functions */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid){
    apllyErrorNotes(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    removeErrorNotes(formElement, inputElement);
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
const apllyErrorNotes = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__error-message_type_${inputElement.id}`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__error-message_active");
  errorElement.textContent = errorMessage;
}

/* removing error message and input errorAlert */
const removeErrorNotes = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__error-message_type_${inputElement.id}`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error-message_active");
}

/* toggle submit button state; style and funcionality */
const toggleSubmitButton = (formInputs, submitButton) => {
  if (hasInvalidInput(formInputs)){
    submitButton.classList.add("popup__submit-button_inactive");
    submitButton.disabled = true;
  }
  else {
    submitButton.classList.remove("popup__submit-button_inactive");
    submitButton.disabled = false;
  }
}

/* add input event listeners and restart button state */
const adjustEventListeners = (formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll(".popup__input")); /*make inputs array inside chosen formElement */
  const submitButton = formElement.querySelector(".popup__submit-button");
  toggleSubmitButton(formInputs, submitButton);
  formInputs.forEach((inputElement) => {  
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleSubmitButton(formInputs, submitButton);
    });
  });
}

/* enables the chosen form validtion */
const enableValidation = (formElement, handleFormSubmitFunction) => {
    formElement.addEventListener("submit", handleFormSubmitFunction);
    adjustEventListeners(formElement);
}