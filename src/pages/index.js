import "./index.css";
//import cards from "../utils/cards.js";
 import Api from "../classess/Api.js";
import Card from "../classess/Card.js";
import FormValidator from "../classess/FormValidator.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../classess/PopupWithImage.js";
import PopupWithForm from "../classess/PopupWithForm.js";
import UserInfo from "../classess/UserInfo.js";
import Section from "../classess/Section.js";
import PopupWithConfirmation from "../classess/PopupWithConfirmation.js";

//instance for api
const getApi = new Api(constants.apiData);

//instance for profileForm
const popupProfileForm = new PopupWithForm(
  ".popup_type_edit-profile",
  (inputValue) => {
    userInfo.setUserInfo(inputValue.name, inputValue.aboutMe);
    getApi.saveProfileData(inputValue.name, inputValue.aboutMe);
    popupProfileForm.close();
  }
);
popupProfileForm.setEventListeners();

//instance for cardForm
const popupCardForm = new PopupWithForm(
  ".popup_type_add-photo",
  (inputValue) => {
    cardSection.renderItems([inputValue]);
    getApi.saveNewCard(inputValue);
    popupCardForm.close();
  }
);
popupCardForm.setEventListeners();

//instance for popupImage
const popupImage = new PopupWithImage(".popup_type_image");

//instance for confirmation popup
const popupConfirmation = new PopupWithConfirmation(".popup_type_confirmation", (card) => {
  //delete the card from the server
  //delete the card from the page
  //close the popup
  console.log("popupConfirmation has submited");
  card.remove();
  card = null;
  popupConfirmation.close();
});

//instance for Section
const cardSection = new Section((item) => {
  const renderedCard = new Card(
    item.link,
    item.name,
    "#cardTemplate",
    createPopupImage,
    popupConfirmation
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
//set user info and user image from the server
getApi.getUserInfo().then((res) => {
  console.log(res);
  userInfo.setUserInfo(res.name, res.about);
})
//set initialCards from the server
getApi.getInitialCards().then((cards) => {
console.log(cards);
cardSection.renderItems(cards);
})

setEventListeners();
initFormValidating(popupProfileForm.popup);
initFormValidating(popupCardForm.popup);
