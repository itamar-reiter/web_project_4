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

//instance for userInfo
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about-me",
  ".user-image"
);

//instance for userImage form
const popupProfileImageForm = new PopupWithForm(
  ".popup_type_change-image",
  (inputValue) => {
    popupProfileImageForm.apllySubmittingText(true, "save");
    getApi
      .updateProfilePicture(inputValue.imageUrl)
      .then((res) => {
        userInfo.setUserImage(res.avatar);
      })
      .finally(() => {
        popupProfileImageForm.close();
        popupProfileImageForm.apllySubmittingText(false, "save");
      });
  }
);
popupProfileImageForm.setEventListeners();

//instance for profileForm
const popupProfileForm = new PopupWithForm(
  ".popup_type_edit-profile",
  (inputValue) => {
    popupProfileForm.apllySubmittingText(true, "save");
    getApi
      .saveProfileData(inputValue.name, inputValue.aboutMe)
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo(res.name, res.about);
      })
      .finally(() => {
        popupProfileForm.apllySubmittingText(false, "save");
        popupProfileForm.close();
      });
  }
);
popupProfileForm.setEventListeners();

//instance for cardForm
const popupCardForm = new PopupWithForm(
  ".popup_type_add-photo",
  (inputValue) => {
    popupCardForm.apllySubmittingText(true, "Create");
    getApi
      .saveNewCard(inputValue)
      .then((res) => {
        console.log(res);
        cardSection.renderItems([res]);
      })
      .finally(() => {
        popupCardForm.close();
        popupCardForm.apllySubmittingText(false, "Create");
      });
  }
);
popupCardForm.setEventListeners();

//instance for Section
const cardSection = new Section((item) => {
  const renderedCard = new Card(
    item,
    "#cardTemplate",
    createPopupImage,
    popupConfirmation,
    getApi
  );
  cardSection.setItem(renderedCard.generateCard());
}, ".grid-elements");

//instance for popupImage
const popupImage = new PopupWithImage(".popup_type_image");

//instance for confirmation popup
const popupConfirmation = new PopupWithConfirmation(
  ".popup_type_confirmation",
  (card, cardData) => {
    console.log("popupConfirmation has submited");
    getApi.deleteCard(cardData._id);
    card.remove();
    card = null;
    popupConfirmation.close();
  }
);

//instance for getUserInfo dlivered to profileForm inputs
function addUserInfo() {
  const userData = userInfo.getUserInfo();
  popupProfileForm.setInputValues(userData);
}

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
  //profile-image event listeners
  constants.userImage.addEventListener("click", () => {
    popupProfileImageForm.open();
  });
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

//set user info and image from the server
getApi.getUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  userInfo.setUserImage(res.avatar);
});

//set initialCards from the server
getApi.getInitialCards().then((cards) => {
  console.log(cards);
  cardSection.renderItems(cards);
});

setEventListeners();
initFormValidating(popupProfileImageForm.popup);
initFormValidating(popupProfileForm.popup);
initFormValidating(popupCardForm.popup);
