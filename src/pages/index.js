import "./index.css";
//import cards from "../utils/cards.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
        popupProfileImageForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
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
        userInfo.setUserInfo(res.name, res.about);
        popupProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfileForm.apllySubmittingText(false, "save");
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
        cardSection.renderItems([res]);
        popupCardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
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
    getApi,
    userInfo.getUserId()
  );
  cardSection.setItem(renderedCard.generateCard());
}, ".grid-elements");

//instance for popupImage
const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

//instance for confirmation popup
const popupConfirmation = new PopupWithConfirmation(
  ".popup_type_confirmation",
  (currentCard, cardData) => {
    getApi
      .deleteCard(cardData._id)
      .then(() => {
        currentCard.remove();
        currentCard = null;
        popupConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

popupConfirmation.setEventListeners();

//instance for getUserInfo dlivered to profileForm inputs
function addUserInfo() {
  const userData = userInfo.getUserInfo();
  popupProfileForm.setInputValues(userData);
}

function createPopupImage(title, link) {
  popupImage.open(title, link);
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
Promise.all([getApi.getUserInfo(), getApi.getInitialCards()])
  .then(([info, cards]) => {
    userInfo.setUserInfo(info.name, info.about);
    userInfo.setUserImage(info.avatar);
    userInfo.setUserId(info._id);
    console.log(cards);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

setEventListeners();
initFormValidating(popupProfileImageForm.popup);
initFormValidating(popupProfileForm.popup);
initFormValidating(popupCardForm.popup);
