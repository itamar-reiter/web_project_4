import cards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  setEventListeners,
  initFormValidating,
  initialRenderCard,
} from "./Utils.js";
initialRenderCard(cards, Card);
setEventListeners(Card);
initFormValidating(FormValidator);
