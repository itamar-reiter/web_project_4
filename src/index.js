import "./pages/index.css";
import cards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as constants from "./utils/constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

//instance for profileForm
const popupProfileForm = new PopupWithForm(".popup_type_edit-profile", () => {
  console.log(
    `before set user info ${popupProfileForm._inputData.name} - ${popupProfileForm._inputData.aboutMe}`
  );
  const newUserInfo = new UserInfo(
    popupProfileForm._inputData.name,
    popupProfileForm._inputData.aboutMe
  );
  newUserInfo.setUserInfo();
  console.log(
    `after set user info ${popupProfileForm._inputData.name} - ${popupProfileForm._inputData.aboutMe}`
  );
  popupProfileForm.close();
});

//instance for cardForm
const popupCardForm = new PopupWithForm(".popup_type_add-photo", () => {
  const cardSection = new Section(
    {
      items: [popupCardForm._inputData],
      renderer: (item) => {
        console.log("renderer of popupCardForm Section");
        const newCard = new Card(
          item.imageLink,
          item.title,
          "#cardTemplate",
          new PopupWithImage(".popup_type_image", item.title, item.imageLink)
        );
        cardSection.setItem(newCard.generateCard());
      },
    },
    ".grid-elements"
  );
  cardSection.renderItems();
  popupCardForm.close();
});

//instance for getUserInfo dlivered to profileForm inputs
function addUserInfo() {
  const formUserInfo = new UserInfo(
    constants.profileName.textContent,
    constants.profileAboutMe.textContent
  );
  formUserInfo.getUserInfo().forEach((element, i) => {
    console.log(
      `before value update - ${popupProfileForm.formInputs[i].value}`
    );
    popupProfileForm.formInputs[i].value = element;
    console.log(`after value update - ${popupProfileForm.formInputs[i].value}`);
  });
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
        new PopupWithImage(".popup_type_image", item.name, item.link)
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
    popupProfileForm.setEventListeners();
  });

  //add button event listeners
  constants.addButton.addEventListener("click", () => {
    popupCardForm.open();
    popupCardForm.setEventListeners();
  });
}

//set initialCards
initialCards.renderItems();
setEventListeners();
initFormValidating(popupProfileForm.popup);
initFormValidating(popupCardForm.popup);
