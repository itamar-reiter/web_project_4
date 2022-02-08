/* check if singal input is valid */
/* true if valid */
const checkInputValidity = (popupForm, inputElement) => {
  if (!inputElement.validity.valid){
    apllyErrorNotes(popupForm, inputElement, inputElement.validationMeassage);
  }
  else {
    removeErrorNotes(popupForm, inputElement);
  }
}

/* check if there invalid input in chosen form */
/* true if there is invalid input */
const hasInvalidInput = (inputList) => { 
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}


const apllyErrorNotes = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.popup__error-message_type_${inputElement.id}`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
}
const removeErrorNotes = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__error-message_type_${inputElement.id}`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}
const toggleSubmitButton = (inputList, submitButton) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)){
    submitButton.classList.add("popup__submit-button_inactive");
  }
  else {
    submitButton.classList.remove("popup__submit-button_inactive");
  }
}

const adjustEventListeners = (formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll(".popup__input")); /*make inputs array inside chosen formElement */
  const submitButton = formElement.querySelector(".popup__submit-button");
  toggleSubmitButton(formInputs, submitButton);
  formInputs.forEach((inputElement) => {   /*  for all inputs, add event listeners */
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleSubmitButton(formInputs, submitButton);
      /* check validity */
      /* if true, remove error notes */
      /* if false, add error notes */
    });
  });
}


const enableValidation = (handleFormSubmitFunction) => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach(formElement => {
    formElement.addEventListener("submit", handleFormSubmitFunction);
    adjustEventListeners(formElement);
  });
}
/* enableValidation(handleProfileFormSubmit(evt));
enableValidation(handleCardFormSubmit(evt)); */

