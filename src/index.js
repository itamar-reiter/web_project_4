import "./pages/index.css";
import cards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import * as constants from "./utils/constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

//create instances for both forms

const popupProfileForm = new PopupWithForm(".popup_type_edit-profile", () => {
  const newUserInfo = new UserInfo(
    popupProfileForm._inputData.name,
    popupProfileForm._inputData.aboutMe
  );
  newUserInfo.setUserInfo();
  popupProfileForm.close();
});

const popupCardForm = new PopupWithForm(".popup_type_add-photo", () => {
  const cardSection = new Section(
    {
      items: Array.from(popupCardForm._inputData),
      renderer: (item) => {
        console.log("renderer of popupCardForm Section");
        const newCard = new Card(
          item.imageLink,
          item.title,
          "#cardTemplate",
          new PopupWithImage(".popup_type_image", item.title, item.imageLink)
        );
        newCard.generateCard();
        cardSection.setItem(newCard);
      },
    },
    ".grid-elements"
  );
  cardSection.renderItems();
  popupCardForm.close();
});

/* function handleCardFormSubmit() {
    constants.placesContainer.prepend(
      createCard(constants.imageLinkInput.value, constants.titleInput.value)
    );
    closePopup(constants.popupAddPhoto);
    constants.popupFormAddPhoto.reset();
  } */

/* function createCard(cardImage, cardName) {
  const newCard = new Card(
    cardImage,
    cardName,
    "#cardTemplate",
    new PopupWithImage(".popup_type_image", cardName, cardImage)
  );
  return newCard.generateCard();
} */

//exported functions//

function setEventListeners() {
  //edit button event listeners
  constants.editButton.addEventListener("click", () => {
    const FormUserInfo = new UserInfo(
      constants.profileName.textContent,
      constants.profileAboutMe.textContent
    );
    FormUserInfo.getUserInfo().forEach((element, i) => {
      popupProfileForm.formInputs[i].value = element;
    });
    popupProfileForm.open();
    popupProfileForm.setEventListeners();
  });

  //add button event listeners
  constants.addButton.addEventListener("click", () => {
    popupCardForm.open();
    popupCardForm.setEventListeners();
  });
}

function initFormValidating(formElement, formSubmitFunction) {
  new FormValidator(
    constants.formValidatorData,
    formElement,
    formSubmitFunction
  ).enableValidation();
}

const initialCards = new Section(
  {
    items: cards,
    renderer: (item) => {
      const renderedCard = new Card(
        item.link,
        item.name,
        "#cardTemplate",
        new PopupWithImage(".popup_type_image", item.name, item.link)
      ).generateCard();
      initialCards.setItem(renderedCard);
    },
  },
  ".grid-elements"
);
//instance of Section for initialCards
initialCards.renderItems();
setEventListeners();
initFormValidating(constants.popupFormEditProfile, handleProfileFormSubmit);
initFormValidating(constants.popupFormAddPhoto, handleCardFormSubmit);
