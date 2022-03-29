import "./index.css";
import cards from "../utils/cards.js";
import Card from "../classess/Card.js";
import FormValidator from "../classess/FormValidator.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../classess/PopupWithImage.js";
import PopupWithForm from "../classess/PopupWithForm.js";
import UserInfo from "../classess/UserInfo.js";
import Section from "../classess/Section.js";

//instance for profileForm
const popupProfileForm = new PopupWithForm(
  ".popup_type_edit-profile",
  (inputValue) => {
    userInfo.setUserInfo(inputValue.name, inputValue.aboutMe);
    popupProfileForm.close();
  }
);
popupProfileForm.setEventListeners();

//instance for cardForm
const popupCardForm = new PopupWithForm(
  ".popup_type_add-photo",
  (inputValue) => {
    cardSection.renderItems([inputValue]);
    popupCardForm.close();
  }
);
popupCardForm.setEventListeners();

//instance for popupImage
const popupImage = new PopupWithImage(".popup_type_image");

//instance for Section
const cardSection = new Section((item) => {
  const renderedCard = new Card(
    item.link,
    item.title,
    "#cardTemplate",
    createPopupImage
  );
  cardSection.setItem(renderedCard.generateCard());
}, ".grid-elements");

//instance for getUserInfo dlivered to profileForm inputs
function addUserInfo() {
  const userData = userInfo.getUserInfo();
  //console.log(userData);
  popupProfileForm.setInputValues(userData);
}

//instance for userInfo
const userInfo = new UserInfo(".profile__name", ".profile__about-me");

function createPopupImage(title, link) {
  popupImage.open(title, link);
  popupImage.setEventListeners();
}

//instance for initialize form validating
function initFormValidating(formElement) {
  new FormValidator(
    constants.formValidatorData,
    formElement
  ).enableValidation();
}

//setting eventListeners for buttons on the page
function setEventListeners() {
  //edit button event listeners
  constants.editButton.addEventListener("click", () => {
    addUserInfo();
    popupProfileForm.open();
  });

  //add button event listeners
  constants.addButton.addEventListener("click", () => {
    popupCardForm.open();
  });
}

//set initialCards
cardSection.renderItems(cards);
setEventListeners();
initFormValidating(popupProfileForm.popup);
initFormValidating(popupCardForm.popup);
