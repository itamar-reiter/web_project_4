import "./index.css";
import cards from "../utils/cards.js";
import Card from "../classess/Card.js";
import FormValidator from "../classess/FormValidator.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../classess/PopupWithImage.js";
import PopupWithForm from "../classess/PopupWithForm.js";
import UserInfo from "../classess/UserInfo.js";
import Section from "../classess/Section.js";

//instance for userInfo
const userInfo = new UserInfo(".profile__name", ".profile__about-me");

/* //instance for Card
const card = new Card */

//instance for Section
//const cardSection = new Section({items: },".grid-elements");

//instance for profileForm
const popupProfileForm = new PopupWithForm(".popup_type_edit-profile", (inputValue) => {
  userInfo.setUserInfo(
    inputValue.name,
    inputValue.aboutMe
  );
  popupProfileForm.close();
});
popupProfileForm.setEventListeners();

//instance for cardForm
const popupCardForm = new PopupWithForm(".popup_type_add-photo", (inputValue) => {
  const cardSection = new Section(
    {
      items: [inputValue],
      renderer: (item) => {
        const newCard = new Card(
          item.link,
          item.name,
          "#cardTemplate",
          createPopupImage
        );
        cardSection.setItem(newCard.generateCard());
      },
    },
    ".grid-elements"
  );
  cardSection.renderItems();
  popupCardForm.close();
});
popupCardForm.setEventListeners();

//instance for getUserInfo dlivered to profileForm inputs
function addUserInfo() {
  const userData = Object.values(
    userInfo.getUserInfo(
      constants.profileName.textContent,
      constants.profileAboutMe.textContent
    )
  );
  popupProfileForm.setInputValues(userData);
}

function createPopupImage(name, link) {
  const newPopupImage = new PopupWithImage(
    ".popup_type_image",
    name,
    link
  );
  newPopupImage.open();
  newPopupImage.setEventListeners();
}

//instance for initialize form validating
function initFormValidating(formElement) {
  new FormValidator(
    constants.formValidatorData,
    formElement
  ).enableValidation();
}

//instance for defining initial cards
const initialCards = new Section(
  {
    items: cards,
    renderer: (item) => {
      const renderedCard = new Card(
        item.link,
        item.name,
        "#cardTemplate",
        createPopupImage
      );
      initialCards.setItem(renderedCard.generateCard());
    },
  },
  ".grid-elements"
);

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
initialCards.renderItems();
setEventListeners();
initFormValidating(popupProfileForm.popup);
initFormValidating(popupCardForm.popup);
