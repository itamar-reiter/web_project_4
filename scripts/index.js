import cards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopupImage, setEventListeners, placesContainer } from "./Utils.js";
const formValidatorData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-message_active",
};
setEventListeners(FormValidator, formValidatorData, Card);

cards.forEach((card) => {
  placesContainer.append(new Card(card.link, card.name, "#cardTemplate", openPopupImage).generateCard());
});





